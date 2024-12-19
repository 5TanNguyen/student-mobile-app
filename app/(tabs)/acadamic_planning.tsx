import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Dữ liệu mẫu
interface Course {
  id: string;
  name: string;
  credits: number;
  status: string;
}

const courseData: Record<string, Course[]> = {
  '2024-1': [
    { id: '1', name: 'Giải tích 1', credits: 3, status: 'Tích lũy' },
    { id: '2', name: 'Lập trình cơ sở', credits: 3, status: 'Tích lũy' },
    { id: '3', name: 'Vật lý đại cương', credits: 4, status: 'Chưa tích lũy' },
  ],
  '2024-2': [
    { id: '4', name: 'Giải tích 2', credits: 3, status: 'Chưa tích lũy' },
    { id: '5', name: 'Cấu trúc dữ liệu', credits: 3, status: 'Tích lũy' },
    { id: '6', name: 'Lý thuyết đồ thị', credits: 3, status: 'Chưa tích lũy' },
  ],
  '2025-1': [
    { id: '7', name: 'Hệ điều hành', credits: 3, status: 'Tích lũy' },
    { id: '8', name: 'Cơ sở dữ liệu', credits: 3, status: 'Chưa tích lũy' },
    { id: '9', name: 'Mạng máy tính', credits: 4, status: 'Tích lũy' },
  ],
};

const App: React.FC = () => {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const handleTermPress = (term: string) => {
    setExpandedTerm(expandedTerm === term ? null : term);
  };

  const renderTermItem = ({ item }: { item: string }) => (
    <View>
      <TouchableOpacity style={styles.termItem} onPress={() => handleTermPress(item)}>
        <Text style={styles.termText}>{item}</Text>
      </TouchableOpacity>
      {expandedTerm === item && (
        <View style={styles.coursesContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.courseTextIndex}>STT</Text>
            <Text style={styles.headerText}>Tên học phần</Text>
            <Text style={styles.headerText}>Số tín chỉ</Text>
            <Text style={styles.headerText}>Trạng thái tích lũy</Text>
          </View>
          {courseData[item].map((course, index) => (
            <View key={course.id} style={styles.courseItem}>
              <Text style={styles.courseTextIndex}>{index + 1}</Text>
              <Text style={styles.courseText}>{course.name}</Text>
              <Text style={styles.courseTextt}>{course.credits}</Text>
              <Text style={styles.courseText}>{course.status}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kế hoạch học tập</Text>
      <FlatList
        data={Object.keys(courseData)}
        keyExtractor={(item) => item}
        renderItem={renderTermItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  termItem: {
    padding: 15,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    elevation: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 5,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  courseText: {
    flex: 1,
    textAlign: 'left',
  },
  courseTextt: {
    flex: 1,
    textAlign: 'center',
  },
  courseTextIndex: {
    width: 40,
    fontWeight: 'bold',
  },
});

export default App;
