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
import config from "../../constants/config";
import styles from "../../styles/index";

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

const tkblistHocPhanId: string[] = [];
const listHocPhan: Course[] = [];
const colors = ["#FFCCCC", "#CCFFCC", "#CCCCFF", "#FFFFCC", "#CCFFFF"]; // Mảng màu

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
                `${config.API_URL}sinhvien/sinhvien/showdashboard`,
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
                response.data.data.tkb_lop_hoc_phan.forEach((item: any) => {
                  if (!tkblistHocPhanId.includes(item.tkb_lop_hoc_phan_id)) {
                    listHocPhan.push({
                      ctdt_hoc_phan_id: item.ctdt_hoc_phan_id,
                      ctdt_hoc_phan_ten_tieng_anh:
                        item.ctdt_hoc_phan_ten_tieng_anh,
                      ctdt_hoc_phan_ten_tieng_viet:
                        item.ctdt_hoc_phan_ten_tieng_viet,
                      nv_can_bo_ho: item.nv_can_bo_ho,
                      nv_can_bo_ten: item.nv_can_bo_ten,
                      tkb_ngay: item.tkb_ngay,
                      qttb_phong_ten: item.qttb_phong_ten,
                    });

                    tkblistHocPhanId.push(item.tkb_lop_hoc_phan_id);
                  }
                });
                setCourse(listHocPhan);

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

  const renderSubject = ({ item, index }: { item: Course; index: number }) => (
    <View
      style={[
        styles.subjectBox,
        { backgroundColor: colors[index % colors.length] },
      ]}
    >
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
