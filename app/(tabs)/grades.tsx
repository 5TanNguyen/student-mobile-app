import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Icon } from "react-native-elements";
import config from "../../constants/config";
import styles from "../../styles/grades";

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

            // Toast.show({
            //   type: "error",
            //   text1: "ERROR",
            //   text2: "Please login to see grades!",
            // });
          } else {
            const response = await axios.get(
              `${config.API_URL}sinhvien/diem/Diemso`,
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
        {expandedTerm ==
        item.diem_hoc_phan_nam_hoc + "-" + item.diem_hoc_phan_hoc_ky ? (
          <Icon name="chevron-up" type="font-awesome" size={20} color="#000" />
        ) : (
          <Icon
            name="chevron-left"
            type="font-awesome"
            size={20}
            color="#000"
          />
        )}
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
      {/* <Toast /> */}
    </View>
  );
};

export default App;
