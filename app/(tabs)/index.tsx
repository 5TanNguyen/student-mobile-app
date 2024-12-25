import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "calendar" | "academic_planning" | "notifications"
>;
interface Course {
  ctdt_hoc_phan_id: string;
  ctdt_hoc_phan_ten_tieng_anh: string;
  ctdt_hoc_phan_ten_tieng_viet: string;
  nv_can_bo_ho: string;
  nv_can_bo_ten: string;
  tkb_ngay: string;
  qttb_phong_ten: string;
}

function DashboardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [course, setCourse] = useState<Course[]>([]);
  const [scheduleState, setScheduleState] = useState(false);

  const getCurrentDate = () => {
    const months = [
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
    ];

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = currentDate.getDate();
    const day = currentDate.getDay();

    return (
      `${daysOfWeek[day - 1]} - ` + months[month] + " " + date + ", " + year
    );
  };

  // Kiểm tra token khi tab được focus
  useFocusEffect(
    useCallback(() => {
      if (typeof window !== "undefined") {
        const fetchData = async () => {
          try {
            const storedToken = await AsyncStorage.getItem("token");
            if (!storedToken) {
              setCourse([]);

              // Toast.show({
              //   type: "error",
              //   text1: "ERROR",
              //   text2: "Please login to see grades!",
              // });
            } else {
              const response = await axios.get(
                `http://10.10.4.43/studentsdnc-api/api/v1/sinhvien/sinhvien/showdashboard`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    "DHNCT-API-KEY": "@cntt@dhnct@",
                    "DHNCT-Authorization": storedToken,
                  },
                }
              );

              if (response.data && response.data.data) {
                // console.log(response.data.data.tkb_lop_hoc_phan);
                setCourse(response.data.data.tkb_lop_hoc_phan);

                response.data.data.tkb_lop_hoc_phan.forEach((item: any) => {
                  const currentDate = new Date();
                  const year = currentDate.getFullYear();
                  const month = currentDate.getMonth() + 1;
                  const day = currentDate.getDate();

                  if (item.tkb_ngay == year + "-" + month + "-" + day) {
                    setScheduleState(true);
                    // console.log("Có lịch học!");
                    return;
                  }
                });

                if (!scheduleState) {
                  // console.log("Không có lịch học");
                }
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
      }

      return () => {
        // console.log("Cleanup when tab is unfocused");
      };
    }, [])
  );

  const renderSubject = ({ item }: { item: Course }) => (
    <View style={[styles.subjectBox, { backgroundColor: "white" }]}>
      <Text style={styles.subjectName}>
        {item.ctdt_hoc_phan_ten_tieng_anh
          ? item.ctdt_hoc_phan_ten_tieng_anh
          : item.ctdt_hoc_phan_ten_tieng_viet}
      </Text>
      <Text style={styles.subjectDetails}>
        👨‍🏫 {item.nv_can_bo_ho} {item.nv_can_bo_ten}
      </Text>
      <Text style={styles.subjectDetails}>🕒 {item.tkb_ngay}</Text>
      <Text style={styles.subjectDetails}>📍 {item.qttb_phong_ten}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeText}>👋 Hi!</Text>
        <Text style={styles.dateText}>{getCurrentDate()}</Text>
      </View>
      <View style={styles.noticeBox}>
        {scheduleState ? (
          <>
            <Text style={styles.noticeText}>
              Today, you have a class scheduled!
            </Text>
            <Text style={styles.noticeSubText}>
              Be prepared and arrange your time to arrive at class on time.
              Don't forget to bring all the necessary materials and study tools.
              Start your day with enthusiasm for learning and positive energy!
            </Text>
            <TouchableOpacity
              style={styles.noticeButton}
              onPress={() => navigation.navigate("calendar")}
            >
              <Text style={styles.noticeButtonText}>Check your schedule</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.noticeText}>
              You don't have any classes today!
            </Text>
            <Text style={styles.noticeSubText}>
              Take a rest and take care of your health for the upcoming study
              days. Don't forget to complete your homework or any assignments
              from your instructors!
            </Text>
          </>
        )}
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Courses This Semester</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("academic_planning")}
        >
          <Text style={styles.sectionLink}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={course}
        renderItem={renderSubject}
        keyExtractor={(item) => item.ctdt_hoc_phan_id}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

export default function App() {
  return <DashboardScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    elevation: 2,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 15,
    height: 60,
  },
  iconButton: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    marginHorizontal: 10,
    padding: 8,
    borderRadius: 5,
  },
  welcomeBox: {
    padding: 20,
    backgroundColor: "#fff",
    elevation: 2,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dateText: {
    color: "#666",
  },
  noticeBox: {
    backgroundColor: "#e3f2fd",
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },
  noticeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noticeSubText: {
    color: "#666",
    marginBottom: 10,
  },
  noticeButton: {
    backgroundColor: "#2f95dc",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  noticeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionLink: {
    color: "#2f95dc",
    fontWeight: "bold",
  },
  subjectBox: {
    padding: 15,
    margin: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subjectDetails: {
    marginTop: 5,
    color: "#555",
  },
});
