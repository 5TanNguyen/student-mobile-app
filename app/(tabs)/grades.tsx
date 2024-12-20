import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
} from "react-native";

// Kiểu dữ liệu cho một khóa học
interface Course {
  diem_diem_hoc_phan_id: string;
  ctdt_hoc_phan_ten_tieng_viet: string;
  ctdt_hoc_phan_so_tin_chi: number;
  diem_hoc_phan_diem_chu: string;
  diem_hoc_phan_he_4: number;
}

interface Record {
  diem_hoc_phan_nam_hoc: string;
  diem_hoc_phan_hoc_ky: string;
  diem_bang_diem: {
    [key: string]: Course;
  };
}

// Kiểu dữ liệu cho dữ liệu khóa học
// type CourseData = Record<string, Course[]>;

// Dữ liệu mẫu
// const courseData: CourseData = {
//   "2024-1": [
//     {
//       id: "1",
//       name: "Giải tích 1",
//       credits: 3,
//       status: "Tích lũy",
//       grade: 8.5,
//     },
//     {
//       id: "2",
//       name: "Lập trình cơ sở",
//       credits: 3,
//       status: "Tích lũy",
//       grade: 9.0,
//     },
//     {
//       id: "3",
//       name: "Vật lý đại cương",
//       credits: 4,
//       status: "Chưa tích lũy",
//       grade: 7.0,
//     },
//   ],
//   "2024-2": [
//     {
//       id: "4",
//       name: "Giải tích 2",
//       credits: 3,
//       status: "Chưa tích lũy",
//       grade: 7.5,
//     },
//     {
//       id: "5",
//       name: "Cấu trúc dữ liệu",
//       credits: 3,
//       status: "Tích lũy",
//       grade: 8.0,
//     },
//     {
//       id: "6",
//       name: "Lý thuyết đồ thị",
//       credits: 3,
//       status: "Chưa tích lũy",
//       grade: 6.5,
//     },
//   ],
//   "2025-1": [
//     {
//       id: "7",
//       name: "Hệ điều hành",
//       credits: 3,
//       status: "Tích lũy",
//       grade: 8.0,
//     },
//     {
//       id: "8",
//       name: "Cơ sở dữ liệu",
//       credits: 3,
//       status: "Chưa tích lũy",
//       grade: 9.0,
//     },
//     {
//       id: "9",
//       name: "Mạng máy tính",
//       credits: 4,
//       status: "Tích lũy",
//       grade: 7.5,
//     },
//   ],
// };

const App: React.FC = () => {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<Record[]>([]);

  useEffect(() => {
    axios
      .get(`http://10.10.4.43/studentsdnc-api/api/v1/sinhvien/diem/Diemso`, {
        headers: {
          "Content-Type": "application/json",
          "DHNCT-API-KEY": "@cntt@dhnct@",
          "DHNCT-Authorization":
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJxbF9uZ3VvaV9kdW5nX2lkIjoiNTAwIiwicWxfbmd1b2lfZHVuZ19ob190ZW4iOiJOZ3V5XHUxZWM1biBWXHUwMTAzbiBQaG9uZyIsInFsX25ndW9pX2R1bmdfZW1haWwiOiJ0ZXN0MDNAZ21haWwuY29tIiwicWxfbmd1b2lfZHVuZ19hdmF0YXIiOiJ1cGxvYWRzXC9zdHVkZW50c1wvMTk4MTkxMTAwMDNcLzE5ODE5MTEwMDAzXzY3NDUyZTFmZTM1NmIuanBnIiwicWxfbmd1b2lfZHVuZ190b2tlbiI6bnVsbCwicWxfbmd1b2lfZHVuZ19sb2FpIjoiMSIsInFsX25ndW9pX2R1bmdfbmdheV90YW8iOiIyMDI0LTEwLTIyIDE1OjA5OjE3IiwicWxfbmd1b2lfZHVuZ19uZ2F5X2NhcF9uaGF0IjoiMjAyNC0xMi0wNCAxNjoxNjoyMSIsImFjdGl2ZV9mbGFnIjoiMSIsImNyZWF0ZWRfYXQiOiIyMDI0LTEwLTIyIDE1OjA5OjE3IiwidXBkYXRlZF9hdCI6IjIwMjQtMTItMDQgMTY6MTY6MjEiLCJxbF9uZ3VvaV9kdW5nX2lzX2FkbWluIjpudWxsLCJxbF9uZ3VvaV9kdW5nX2hvIjoiSFx1MWVlNyIsInFsX25ndW9pX2R1bmdfdGVuIjoiVFx1MDBlZHUiLCJzdGFydF90aW1lIjoxNzM0NTc1MzI0Ljc2ODkxNn0.GGgdo98oF6dSEr7qDROVDYUwe15gxGQeGlC9TSeBm1w",
        },
      })
      .then((response) => {
        setCourseData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fectching data:", error);
      });
  }, []);

  const handleTermPress = (term: string) => {
    setExpandedTerm(expandedTerm === term ? null : term);
  };

  const renderTermItem = ({ item }: { item: Record }) => (
    <View>
      <TouchableOpacity
        style={styles.termItem}
        onPress={() =>
          handleTermPress(
            item.diem_hoc_phan_nam_hoc + "-" + item.diem_hoc_phan_hoc_ky
          )
        }
      >
        <Text style={styles.termText}>
          {item.diem_hoc_phan_nam_hoc + "-" + item.diem_hoc_phan_hoc_ky}
        </Text>
      </TouchableOpacity>
      {expandedTerm ===
        item.diem_hoc_phan_nam_hoc + "-" + item.diem_hoc_phan_hoc_ky && (
        <View style={styles.coursesContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.courseTextIndex}>STT</Text>
            <Text style={styles.headerText}>Tên học phần</Text>
            <Text style={styles.headerText}>Số tín chỉ</Text>
            <Text style={styles.headerText}>Trạng thái</Text>
            <Text style={styles.headerText}>Điểm</Text>
          </View>
          {Object.values(item.diem_bang_diem).map((course, index) => (
            <View key={course.diem_diem_hoc_phan_id} style={styles.courseItem}>
              <Text style={styles.courseTextIndex}>{index + 1}</Text>
              <Text style={styles.courseText}>
                {course.ctdt_hoc_phan_ten_tieng_viet}
              </Text>
              <Text style={styles.courseTextCenter}>
                {course.ctdt_hoc_phan_so_tin_chi}
              </Text>
              <Text style={styles.courseText}>
                {course.diem_hoc_phan_diem_chu}
              </Text>
              <Text style={styles.courseTextGrade}>
                {course.diem_hoc_phan_he_4}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Điểm số</Text>
      <FlatList
        data={courseData}
        keyExtractor={(item, index) => `${item.diem_hoc_phan_nam_hoc}`}
        renderItem={renderTermItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  termItem: {
    padding: 15,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  termText: {
    fontSize: 18,
  },
  coursesContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    elevation: 1,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 5,
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  courseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  courseText: {
    flex: 1,
    textAlign: "left",
  },
  courseTextCenter: {
    flex: 1,
    textAlign: "center",
  },
  courseTextIndex: {
    width: 40,
    fontWeight: "bold",
  },
  courseTextGrade: {
    flex: 1,
    textAlign: "left",
    paddingLeft: 20,
  },
});

export default App;
