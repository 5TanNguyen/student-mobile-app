import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  FlatList,
  Animated,
  TextInput,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useFocusEffect } from "@react-navigation/native";
// import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../constants/config";
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
    nv_can_bo_ho: string;
    nv_can_bo_ten: string;
    qttb_phong_ten: string;
    tkb_ngay: string;
    tkb_tiet_gio_vao: string;
    tkb_ghi_chu: string;
  }>({
    ctdt_hoc_phan_ten_tieng_viet: "",
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

  const tkbLopHocPhanId: string[] = [];
  const tkblistLopHocPhanId: string[] = [];
  const lopHocPhan: EventData = {};
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

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
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

            console.log(response.data);

            if (response.data && response.data.data) {
              setEventData(response.data.calendar);

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
    <View style={styles.container}>
      <Text style={styles.title}>Schedule</Text>
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
        <Text style={styles.todoTitle}>Subject's List</Text>
        <FlatList
          data={subject}
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
                {item.ctdt_hoc_phan_ten_tieng_viet}
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
              <Text style={styles.headerText}>Course Information</Text>
            </View>

            <View style={styles.content}>
              <View style={styles.row}>
                <Text style={styles.label}>📚 Course Name:</Text>
                <Text style={styles.value}>
                  {eventInfo.ctdt_hoc_phan_ten_tieng_viet}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>🎤 Lecturer:</Text>
                <Text style={styles.value}>
                  {eventInfo.nv_can_bo_ho} {eventInfo.nv_can_bo_ten}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>📍 Room:</Text>
                <Text style={styles.value}>{eventInfo.qttb_phong_ten}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>📅 Class Date:</Text>
                <Text style={styles.value}>{eventInfo.tkb_ngay}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>⏰ Class Time:</Text>
                <Text style={styles.value}>{eventInfo.tkb_tiet_gio_vao}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>📝 Notes:</Text>
                <Text style={styles.value}>{eventInfo.tkb_ghi_chu}</Text>
              </View>

              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      {/* <Toast /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  calendar: {
    borderWidth: 1, // Độ dày viền
    borderColor: "#cccccc", // Màu viền
    borderRadius: 10, // Bo góc
    shadowColor: "#000", // Màu đổ bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng (ngang, dọc)
    shadowOpacity: 0.25, // Độ mờ bóng
    shadowRadius: 3.84, // Bán kính bóng
    elevation: 5, // Độ nổi (chỉ dành cho Android)
    backgroundColor: "#ffffff", // Nền cho calendar
    margin: 10, // Khoảng cách từ calendar đến các phần tử khác
  },
  todoContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    top: 20,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subjectItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    // shadowColor: "#000", // Màu của bóng
    // shadowOffset: { width: 0, height: 4 }, // Độ lệch của bóng (ngang, dọc)
    // shadowOpacity: 1, // Độ trong suốt của bóng
    // shadowRadius: 4, // Bán kính của bóng
    // elevation: 1, // Đổ bóng trên Android
    borderWidth: 1, // Độ trong suốt của bóng
    borderRadius: 15, // Tạo hình tròn
    borderStyle: "solid",
  },
  subjectText: {
    fontSize: 16,
    color: "#333", // Màu chữ
  },

  indexText: {
    fontSize: 16,
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    width: "40%", // Chiều rộng của label
  },
  value: {
    fontSize: 16,
    width: "60%", // Chiều rộng của value
    textAlign: "right", // Căn phải cho value
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#888",
  },
  content: {
    marginTop: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    elevation: 5,
    width: "80%", // Chiều rộng của modal
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalDescription: {
    marginVertical: 15,
    textAlign: "center",
  },
  circleColor: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10, // Khoảng cách giữa vòng tròn và tên môn học
    // shadowOpacity: 1, // Độ trong suốt của bóng
    // shadowRadius: 4, // Bán kính của bóng
    borderWidth: 1, // Độ trong suốt của bóng
    borderRadius: 15, // Tạo hình tròn
    borderStyle: "solid",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default App;
