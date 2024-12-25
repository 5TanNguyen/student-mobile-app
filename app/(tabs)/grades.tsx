import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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

const App: React.FC = () => {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<Record[]>([]);

  // Kiểm tra token khi tab được focus
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const storedToken = await AsyncStorage.getItem("token");
          if (!storedToken) {
            setCourseData([]);

            Toast.show({
              type: "error",
              text1: "ERROR",
              text2: "Please login to see grades!",
            });
          } else {
            const response = await axios.get(
              `http://10.10.4.43/studentsdnc-api/api/v1/sinhvien/diem/Diemso`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "DHNCT-API-KEY": "@cntt@dhnct@",
                  "DHNCT-Authorization": storedToken,
                },
              }
            );

            if (response.data && response.data.data) {
              setCourseData(response.data.data);
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
            <View style={styles.columnIndex}>
              <Text style={styles.courseTextIndex}>No.</Text>
            </View>
            <View style={styles.columnIndex}>
              <Text style={styles.headerText}>Course</Text>
            </View>
            <View style={styles.columnIndex}>
              <Text style={styles.headerText}>Credits</Text>
            </View>
            <View style={styles.columnIndex}>
              <Text style={styles.headerText}>Score</Text>
            </View>
            <View style={styles.columnIndex}>
              <Text style={styles.headerText}>Letter grade</Text>
            </View>
          </View>
          {Object.values(item.diem_bang_diem).map((course, index) => (
            <View key={index} style={styles.courseItem}>
              <View style={styles.columnIndex}>
                <Text style={styles.courseText}>{index + 1}</Text>
              </View>
              <View style={styles.columnIndex}>
                <Text style={styles.courseText}>
                  {course.ctdt_hoc_phan_ten_tieng_viet}
                </Text>
              </View>
              <View style={styles.columnIndex}>
                <Text style={styles.courseTextCenter}>
                  {course.ctdt_hoc_phan_so_tin_chi}
                </Text>
              </View>
              <View style={styles.columnIndex}>
                <Text style={styles.courseText}>
                  {course.diem_hoc_phan_he_4}
                </Text>
              </View>
              <View style={styles.columnIndex}>
                <Text style={styles.courseTextGrade}>
                  {course.diem_hoc_phan_diem_chu}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grades</Text>
      <FlatList
        data={courseData}
        keyExtractor={(item, index) => `${item.diem_hoc_phan_nam_hoc}`}
        renderItem={renderTermItem}
      />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    fontWeight: "bold",
  },
  coursesContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    elevation: 1,
  },
  courseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  courseText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  courseTextCenter: {
    flex: 1,
    textAlign: "center",
  },
  courseTextGrade: {
    flex: 1,
    textAlign: "left",
    paddingLeft: 20,
  },
  columnIndex: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
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
  courseTextIndex: {
    flex: 1,
    width: 30,
    fontWeight: "bold",
  },
});

export default App;
