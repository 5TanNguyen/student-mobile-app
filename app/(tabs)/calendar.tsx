import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  FlatList,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useFocusEffect } from "@react-navigation/native";
// import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../constants/config";
import styles from "@/styles/calendar";
import language from "../../constants/language";

// Thiết lập LocaleConfig cho tiếng Anh
LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  today: "Today",
};

LocaleConfig.defaultLocale = "en";

// Dữ liệu sự kiện
interface EventData {
  [tkb_ngay: string]: {
    ctdt_hoc_phan_ten_tieng_viet: string;
    ctdt_hoc_phan_ten_tieng_anh: string;
    nv_can_bo_ho: string;
    nv_can_bo_ten: string;
    qttb_phong_ten: string;
    tkb_ngay: string;
    tkb_tiet_gio_vao: string;
    tkb_ghi_chu: string;
  };
}

interface subjectItem {
  ctdt_hoc_phan_id: string;
  ctdt_hoc_phan_ten_tieng_anh: string;
  ctdt_hoc_phan_ten_tieng_viet: string;
  dkhp_dang_ky_nam_hoc: number;
  dkhp_dang_ky_hoc_ky: number;
}

const App = () => {
  const [selected, setSelected] = useState<string>(""); // Ngày được chọn
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Trạng thái modal
  const [eventInfo, setEventInfo] = useState<{
    ctdt_hoc_phan_ten_tieng_viet: string;
    ctdt_hoc_phan_ten_tieng_anh: string;
    nv_can_bo_ho: string;
    nv_can_bo_ten: string;
    qttb_phong_ten: string;
    tkb_ngay: string;
    tkb_tiet_gio_vao: string;
    tkb_ghi_chu: string;
  }>({
    ctdt_hoc_phan_ten_tieng_viet: "",
    ctdt_hoc_phan_ten_tieng_anh: "",
    nv_can_bo_ho: "",
    nv_can_bo_ten: "",
    qttb_phong_ten: "",
    tkb_ngay: "",
    tkb_tiet_gio_vao: "",
    tkb_ghi_chu: "",
  });
  const fadeAnim = useRef(new Animated.Value(0)).current; // Khởi tạo giá trị hoạt hình cho fade
  const [eventData, setEventData] = useState<EventData>({});
  const [subject, setSubject] = useState<subjectItem[]>([]);
  const colors = ["#FFCCCC", "#CCFFCC", "#CCCCFF", "#FFFFCC", "#CCFFFF"]; // Mảng màu
  const [lang, setLang] = useState(true);

  const tkblistLopHocPhanId: string[] = [];
  const listLopHocPhan: subjectItem[] = [];

  const onDayPress = (day: { dateString: string }) => {
    const key = day.dateString;

    if (key in eventData) {
      setEventInfo(eventData[key]);
      setModalVisible(true);
    } else {
      setSelected(key);
    }
  };

  const markedDates = Object.keys(eventData).reduce(
    (acc: any, date: string) => {
      acc[date] = { marked: true, dotColor: "red" };
      return acc;
    },
    {}
  );

  // Thêm thông tin cho ngày đã chọn
  markedDates[selected] = {
    selected: true,
    disableTouchEvent: true,
    selectedDotColor: "orange",
  };

  const translate = (stringTranslate: string) => {
    for (const key in language) {
      if (key == stringTranslate) {
        if (lang) {
          return language[key as keyof typeof language].split("__")[0];
        } else {
          return language[key as keyof typeof language].split("__")[1];
        }
      }
    }

    return null;
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setInterval(async () => {
            const storedLang = await AsyncStorage.getItem("lang");
            if (storedLang === "true") {
              setLang(true);
            } else {
              setLang(false);
            }
          }, 500);

          const storedToken = await AsyncStorage.getItem("token");
          if (!storedToken) {
            setSubject([]);
            setEventData({});

            // Toast.show({
            //   type: "error",
            //   text1: "ERROR",
            //   text2: "Please login to see calendar!",
            // });
          } else {
            const response = await axios.get(
              `${config.API_URL}sinhvien/lichhoc/Lichhoc`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "DHNCT-API-KEY": "@cntt@dhnct@",
                  "DHNCT-Authorization": storedToken,
                },
              }
            );

            if (response.data && response.data.data) {
              setEventData(response.data.calendar);
              // console.log(response.data.calendar);

              response.data.data.forEach((item: any) => {
                if (!tkblistLopHocPhanId.includes(item.tkb_lop_hoc_phan_id)) {
                  listLopHocPhan.push({
                    ctdt_hoc_phan_id: item.ctdt_hoc_phan_id,
                    ctdt_hoc_phan_ten_tieng_anh:
                      item.ctdt_hoc_phan_ten_tieng_anh,
                    ctdt_hoc_phan_ten_tieng_viet:
                      item.ctdt_hoc_phan_ten_tieng_viet,
                    dkhp_dang_ky_nam_hoc: item.dkhp_dang_ky_nam_hoc,
                    dkhp_dang_ky_hoc_ky: item.dkhp_dang_ky_hoc_ky,
                  });

                  tkblistLopHocPhanId.push(item.tkb_lop_hoc_phan_id);
                }
              });
              setSubject(listLopHocPhan);
            } else {
              // Toast.show({
              //   type: "error",
              //   text1: "ERROR",
              //   text2: "Failed to fetch data!",
              // });
            }
          }
        } catch (error) {
          // Toast.show({
          //   type: "error",
          //   text1: "ERROR",
          //   text2: "Network or server error occurred!",
          // });
        }
      };

      fetchData();

      if (modalVisible) {
        // Hiệu ứng fadeIn khi modal mở
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        // Hiệu ứng fadeOut khi modal đóng
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }

      // Cleanup nếu cần khi tab không còn được focus
      return () => {
        // console.log("Cleanup when tab is unfocused");
      };
    }, [modalVisible]) // Gọi lại mỗi khi modalVisible thay đổi
  );

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>{translate("schedule")}</Text>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
            textDisabledColor: "#dd99ee",
          }}
          onDayPress={onDayPress}
          markedDates={markedDates}
        />

        <View style={styles.todoContainer}>
          <Text style={styles.todoTitle}>{translate("subjectsList")}</Text>
          <FlatList
            data={subject}
            scrollEnabled={false}
            keyExtractor={(item) => item.ctdt_hoc_phan_id.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.subjectItem}>
                <View
                  style={[
                    styles.circleColor,
                    {
                      backgroundColor: colors[index % colors.length], // Đặt màu nền
                    },
                  ]}
                >
                  <Text style={styles.indexText}></Text>
                </View>
                <Text style={styles.subjectText}>
                  {lang
                    ? item.ctdt_hoc_phan_ten_tieng_anh
                      ? item.ctdt_hoc_phan_ten_tieng_anh
                      : item.ctdt_hoc_phan_ten_tieng_viet
                    : item.ctdt_hoc_phan_ten_tieng_viet}
                </Text>
              </View>
            )}
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <Text style={styles.headerText}>
                  {translate("courseInformation")}
                </Text>
              </View>

              <View style={styles.content}>
                <View style={styles.row}>
                  <Text style={styles.label}>
                    📚 {translate("courseName")}:
                  </Text>
                  <Text style={styles.value}>
                    {lang
                      ? eventInfo.ctdt_hoc_phan_ten_tieng_anh
                        ? eventInfo.ctdt_hoc_phan_ten_tieng_anh
                        : eventInfo.ctdt_hoc_phan_ten_tieng_viet
                      : eventInfo.ctdt_hoc_phan_ten_tieng_viet}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>🎤 {translate("lecturer")}:</Text>
                  <Text style={styles.value}>
                    {eventInfo.nv_can_bo_ho} {eventInfo.nv_can_bo_ten}
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>📍 {translate("room")}:</Text>
                  <Text style={styles.value}>{eventInfo.qttb_phong_ten}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>📅 {translate("classDate")}:</Text>
                  <Text style={styles.value}>{eventInfo.tkb_ngay}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>⏰ {translate("classTime")}:</Text>
                  <Text style={styles.value}>{eventInfo.tkb_tiet_gio_vao}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.label}>📝 {translate("notes")}:</Text>
                  <Text style={styles.value}>{eventInfo.tkb_ghi_chu}</Text>
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#4b7bec",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                  >
                    {translate("close")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* <Toast /> */}
      </View>
    </ScrollView>
  );
};

export default App;
