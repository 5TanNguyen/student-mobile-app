import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

function DashboardScreen() {
  const subjects = [
    {
      id: "1",
      name: "Toán cao cấp",
      teacher: "Nguyễn Văn A",
      time: "Thứ Hai, 8:00",
      location: "Phòng C3-01",
      bgColor: "#e0f7fa",
    },
    {
      id: "2",
      name: "Lập trình C++",
      teacher: "Trần Thị B",
      time: "Thứ Ba, 10:00",
      location: "Phòng C3-02",
      bgColor: "#ffecb3",
    },
    {
      id: "3",
      name: "Hệ điều hành",
      teacher: "Phạm Văn C",
      time: "Thứ Tư, 13:00",
      location: "Phòng C3-03",
      bgColor: "#ffe0b2",
    },
    {
      id: "4",
      name: "Kỹ thuật phần mềm",
      teacher: "Lê Thị D",
      time: "Thứ Năm, 15:00",
      location: "Phòng C3-04",
      bgColor: "#c8e6c9",
    },
    {
      id: "5",
      name: "Mạng máy tính",
      teacher: "Hoàng Văn E",
      time: "Thứ Sáu, 9:00",
      location: "Phòng C3-05",
      bgColor: "#d1c4e9",
    },
  ];

  const renderSubject = ({ item }) => (
    <View style={[styles.subjectBox, { backgroundColor: item.bgColor }]}>
      <Text style={styles.subjectName}>{item.name}</Text>
      <Text style={styles.subjectDetails}>👨‍🏫 {item.teacher}</Text>
      <Text style={styles.subjectDetails}>🕒 {item.time}</Text>
      <Text style={styles.subjectDetails}>📍 {item.location}</Text>
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
        <TouchableOpacity style={styles.noticeButton}>
          <Text style={styles.noticeButtonText}>Xem lịch học</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Học phần học kỳ này</Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={subjects}
        renderItem={renderSubject}
        keyExtractor={(item) => item.id}
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
