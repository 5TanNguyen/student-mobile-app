import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

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

  useEffect(() => {
    axios
      .get(
        `http://10.10.4.43/studentsdnc-api/api/v1/sinhvien/khht/Kehoachhoctap`,
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
        setCourseData(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
                <Text style={styles.termText}>Học kỳ {term}</Text>
              </TouchableOpacity>
              {expandedTerm === term && (
                <View style={styles.coursesContainer}>
                  <View style={styles.tableHeader}>
                    <View style={styles.columnIndex}>
                      <Text style={styles.headerText}>STT</Text>
                    </View>
                    <View style={styles.columnName}>
                      <Text style={styles.headerText}>Học phần</Text>
                    </View>
                    <View style={styles.columnCredits}>
                      <Text style={styles.headerText}>Tín chỉ</Text>
                    </View>
                    <View style={styles.columnStatus}>
                      <Text style={styles.headerText}>Tích lũy</Text>
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
      <Text style={styles.title}>Kế hoạch học tập</Text>
      <FlatList
        data={courseData}
        keyExtractor={(item, index) => `${item.nam_hoc}-${index}`}
        renderItem={renderYearItem}
      />
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
  yearItem: {
    padding: 15,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  yearText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  termItem: {
    padding: 15,
    backgroundColor: "#e9e9e9",
    marginBottom: 10,
    borderRadius: 5,
    marginLeft: 15,
    elevation: 1,
  },
  termText: {
    fontSize: 18,
  },
  coursesContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginLeft: 15,
    elevation: 1,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 5,
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  courseItem: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  courseText: {
    textAlign: "center",
  },
  courseTextt: {
    flex: 1,
    textAlign: "center",
  },
  courseTextIndex: {
    fontWeight: "bold",
  },
  columnIndex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  columnName: {
    flex: 3,
    justifyContent: "center",
  },
  columnCredits: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  columnStatus: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
