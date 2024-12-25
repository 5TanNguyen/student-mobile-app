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
import Toast from "react-native-toast-message";
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

  // Kiểm tra token khi tab được focus
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const storedToken = await AsyncStorage.getItem("token");
          if (!storedToken) {
            setCourse([]);

            Toast.show({
              type: "error",
              text1: "ERROR",
              text2: "Please login to see grades!",
            });
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
            } else {
              Toast.show({
                type: "error",
                text1: "ERROR",
                text2: "Failed to fetch data!",
              });
            }
          }
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "ERROR",
            text2: "Network or server error occurred!",
          });
        }
      };

      fetchData();

      // Cleanup khi tab không còn được focus
      return () => {
        // console.log("Cleanup when tab is unfocused");
      };
    }, []) // Không cần phụ thuộc vào state, chỉ cần check token khi tab focus
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
        <Text style={styles.welcomeText}>👋 Xin chào, Neha!</Text>
        <Text style={styles.dateText}>Thứ 3, 26/11/2024</Text>
      </View>
      <View style={styles.noticeBox}>
        <Text style={styles.noticeText}>Bạn không có lịch học hôm nay!</Text>
        <Text style={styles.noticeSubText}>
          Hãy nghỉ ngơi giữ gìn sức khỏe cho những ngày học tiếp theo. Đừng quên
          thực hiện các bài tập và các yêu cầu của giảng viên nhé!
        </Text>
        <TouchableOpacity
          style={styles.noticeButton}
          onPress={() => navigation.navigate("calendar")}
        >
          <Text style={styles.noticeButtonText}>Xem lịch học</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Học phần học kỳ này</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("academic_planning")}
        >
          <Text style={styles.sectionLink}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={course}
        renderItem={renderSubject}
        keyExtractor={(item) => item.ctdt_hoc_phan_id}
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
