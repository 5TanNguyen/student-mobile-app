import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "react-native-elements";
import config from "../../constants/config";
import styles from "../../styles/academic_planning";
// import Toast from "react-native-toast-message";

// Dữ liệu mẫu
interface Course {
  ctdt_hoc_phan_id: string;
  ctdt_hoc_phan_ten_tieng_viet: string;
  ctdt_hoc_phan_so_tin_chi: string;
  ctdt_hoc_phan_so_tiet_ly_thuyet: string;
  ctdt_hoc_phan_so_tiet_thuc_hanh: string | null;
  ctdt_hoc_phan_loai: string;
  diem_hoc_phan_diem_chu: string | null;
}

interface Semester {
  semesterIndex: number;
  ctdt_ke_hoach_hoc_tap_id: string;
  ctdt_nganh_id: string;
  ctdt_chuyen_nganh_id: string;
  ctdt_hoc_phan_id: string;
  ctdt_chuong_trinh_khung_nam_hoc: string;
  ctdt_chuong_trinh_khung_hoc_ky: string;
  sv_sinh_vien_id: string;
  ctdt_hoc_phan: Course[];
}

interface Record {
  nam_hoc: string;
  hoc_ki: {
    [key: string]: Semester;
  };
}

const App: React.FC = () => {
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<Record[]>([]);

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
            //   text2: "Please login to see academic planning!",
            // });
          } else {
            const response = await axios.get(
              `${config.API_URL}sinhvien/khht/Kehoachhoctap`,
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

      return () => {
        // console.log("Cleanup when tab is unfocused");
        // Toast.hide();
      };
    }, [])
  );

  const handleYearPress = (year: string) => {
    setExpandedYear(expandedYear === year ? null : year);
    setExpandedTerm(null); // Đóng tất cả học kỳ khi thay đổi năm
  };

  const handleTermPress = (term: string) => {
    setExpandedTerm(expandedTerm === term ? null : term);
  };

  const renderYearItem = ({ item }: { item: Record }) => (
    <View>
      <TouchableOpacity
        style={styles.yearItem}
        onPress={() => handleYearPress(item.nam_hoc)}
      >
        <Text style={styles.yearText}>{item.nam_hoc}</Text>
        {expandedYear == item.nam_hoc ? (
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
      {expandedYear === item.nam_hoc && (
        <FlatList
          data={Object.keys(item.hoc_ki)}
          keyExtractor={(term) => term}
          renderItem={({ item: term }) => (
            <View>
              <TouchableOpacity
                style={styles.termItem}
                onPress={() => handleTermPress(term)}
              >
                <Text style={styles.termText}>Semester {term}</Text>
              </TouchableOpacity>
              {expandedTerm === term && (
                <View style={styles.coursesContainer}>
                  <View style={styles.tableHeader}>
                    <View style={styles.columnIndex}>
                      <Text style={styles.headerText}>No.</Text>
                    </View>
                    <View style={styles.columnName}>
                      <Text style={styles.headerText}>Course</Text>
                    </View>
                    <View style={styles.columnCredits}>
                      <Text style={styles.headerText}>Credits</Text>
                    </View>
                    <View style={styles.columnStatus}>
                      <Text style={styles.headerText}>Earned Credits</Text>
                    </View>
                  </View>
                  {item.hoc_ki[term].ctdt_hoc_phan.map((course, index) => (
                    <View
                      key={course.ctdt_hoc_phan_id}
                      style={styles.courseItem}
                    >
                      <View style={styles.columnIndex}>
                        <Text style={styles.courseText}>{index + 1}</Text>
                      </View>
                      <View style={styles.columnName}>
                        <Text style={styles.courseText}>
                          {course.ctdt_hoc_phan_ten_tieng_viet}
                        </Text>
                      </View>
                      <View style={styles.columnCredits}>
                        <Text style={styles.courseText}>
                          {course.ctdt_hoc_phan_so_tin_chi}
                        </Text>
                      </View>
                      <View style={styles.columnStatus}>
                        <Text style={styles.courseText}>
                          {course.diem_hoc_phan_diem_chu ? "*" : ""}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Academic Planning</Text>
      <FlatList
        data={courseData}
        keyExtractor={(item, index) => `${item.nam_hoc}-${index}`}
        renderItem={renderYearItem}
      />
      {/* <Toast /> */}
    </View>
  );
};

export default App;
