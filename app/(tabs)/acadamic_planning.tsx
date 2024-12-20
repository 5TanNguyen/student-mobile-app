import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

// Dữ liệu mẫu
interface Course {
  id: string;
  name: string;
  credits: number;
  status: string;
}

const courseData: Record<string, Record<string, Course[]>> = {
  "2024": {
    "Học kỳ 1": [
      { id: "1", name: "Giải tích 1", credits: 3, status: "*" },
      { id: "2", name: "Lập trình cơ sở", credits: 3, status: "*" },
      {
        id: "3",
        name: "Vật lý đại cương",
        credits: 4,
        status: "",
      },
    ],
    "Học kỳ 2": [
      { id: "4", name: "Giải tích 2", credits: 3, status: "" },
      { id: "5", name: "Cấu trúc dữ liệu", credits: 3, status: "*" },
      {
        id: "6",
        name: "Lý thuyết đồ thị",
        credits: 3,
        status: "*",
      },
    ],
  },
  "2025": {
    "Học kỳ 1": [
      { id: "7", name: "Hệ điều hành", credits: 3, status: "*" },
      { id: "8", name: "Cơ sở dữ liệu", credits: 3, status: "" },
      { id: "9", name: "Mạng máy tính", credits: 4, status: "*" },
    ],
  },
};

const App: React.FC = () => {
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  // const [courseData, setCourseData] = useState<Record<
  //   string,
  //   Record<string, Course[]>
  // > | null>(null);

  const handleYearPress = (year: string) => {
    setExpandedYear(expandedYear === year ? null : year);
    setExpandedTerm(null); // Đóng tất cả học kỳ khi thay đổi năm
  };

  const handleTermPress = (term: string) => {
    setExpandedTerm(expandedTerm === term ? null : term);
  };

  const renderYearItem = ({ item }: { item: string }) => (
    <View>
      <TouchableOpacity
        style={styles.yearItem}
        onPress={() => handleYearPress(item)}
      >
        <Text style={styles.yearText}>{item}</Text>
      </TouchableOpacity>
      {expandedYear === item && (
        <FlatList
          data={Object.keys(courseData[item])}
          keyExtractor={(term) => term}
          renderItem={({ item: term }) => (
            <View>
              <TouchableOpacity
                style={styles.termItem}
                onPress={() => handleTermPress(term)}
              >
                <Text style={styles.termText}>{term}</Text>
              </TouchableOpacity>
              {expandedTerm === term && (
                <View style={styles.coursesContainer}>
                  <View style={styles.tableHeader}>
                    <View style={styles.columnIndex}>
                      <Text style={styles.headerText}>STT</Text>
                    </View>
                    <View style={styles.columnName}>
                      <Text style={styles.headerText}>Tên học phần</Text>
                    </View>
                    <View style={styles.columnCredits}>
                      <Text style={styles.headerText}>Số tín chỉ</Text>
                    </View>
                    <View style={styles.columnStatus}>
                      <Text style={styles.headerText}>Trạng thái tích lũy</Text>
                    </View>
                  </View>
                  {courseData[item][term].map((course, index) => (
                    <View key={course.id} style={styles.courseItem}>
                      <View style={styles.columnIndex}>
                        <Text style={styles.courseText}>{index + 1}</Text>
                      </View>
                      <View style={styles.columnName}>
                        <Text style={styles.courseText}>{course.name}</Text>
                      </View>
                      <View style={styles.columnCredits}>
                        <Text style={styles.courseText}>{course.credits}</Text>
                      </View>
                      <View style={styles.columnStatus}>
                        <Text style={styles.courseText}>{course.status}</Text>
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
        data={Object.keys(courseData)}
        keyExtractor={(item) => item}
        renderItem={renderYearItem}
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
    marginLeft: 30,
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
    width: 40,
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
