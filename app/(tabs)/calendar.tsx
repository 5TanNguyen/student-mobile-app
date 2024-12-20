import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    axios
      .get(`http://10.10.4.43/CodeIgniter-3.1.13/api/getAllTodoCalendar`)
      .then((response) => {
        // setEventData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching student info:", error);
      });

    axios
      .get(
        `http://10.10.4.43/studentsdnc-api/api/v1/sinhvien/lichhoc/Lichhoc`,
        {
          headers: {
            "Content-Type": "application/json",
            "DHNCT-API-KEY": "@cntt@dhnct@",
            "DHNCT-Authorization":
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJxbF9uZ3VvaV9kdW5nX2lkIjoiNTAwIiwicWxfbmd1b2lfZHVuZ19ob190ZW4iOiJOZ3V5XHUxZWM1biBWXHUwMTAzbiBQaG9uZyIsInFsX25ndW9pX2R1bmdfZW1haWwiOiJ0ZXN0MDNAZ21haWwuY29tIiwicWxfbmd1b2lfZHVuZ19hdmF0YXIiOiJ1cGxvYWRzXC9zdHVkZW50c1wvMTk4MTkxMTAwMDNcLzE5ODE5MTEwMDAzXzY3NDUyZTFmZTM1NmIuanBnIiwicWxfbmd1b2lfZHVuZ190b2tlbiI6bnVsbCwicWxfbmd1b2lfZHVuZ19sb2FpIjoiMSIsInFsX25ndW9pX2R1bmdfbmdheV90YW8iOiIyMDI0LTEwLTIyIDE1OjA5OjE3IiwicWxfbmd1b2lfZHVuZ19uZ2F5X2NhcF9uaGF0IjoiMjAyNC0xMi0wNCAxNjoxNjoyMSIsImFjdGl2ZV9mbGFnIjoiMSIsImNyZWF0ZWRfYXQiOiIyMDI0LTEwLTIyIDE1OjA5OjE3IiwidXBkYXRlZF9hdCI6IjIwMjQtMTItMDQgMTY6MTY6MjEiLCJxbF9uZ3VvaV9kdW5nX2lzX2FkbWluIjpudWxsLCJxbF9uZ3VvaV9kdW5nX2hvIjoiSFx1MWVlNyIsInFsX25ndW9pX2R1bmdfdGVuIjoiVFx1MDBlZHUiLCJzdGFydF90aW1lIjoxNzM0NTc1MzI0Ljc2ODkxNn0.GGgdo98oF6dSEr7qDROVDYUwe15gxGQeGlC9TSeBm1w",
          },
        }
      )
      .then((response) => {
        setSubject(response.data.data);
        setEventData(response.data.calendar);
        // console.log("Load lịch học sinh viên");
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student info:", error);
      });

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
  }, [modalVisible]);

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    borderWidth: 1,
    borderColor: "gray",
    height: "50%", // Chiếm 50% chiều cao màn hình
  },
  todoContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
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
});

export default App;
