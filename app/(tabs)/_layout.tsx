import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context"; // SafeAreaView để xử lý vùng an toàn
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Modal,
  Button,
} from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Icon } from "react-native-elements";

// 0.76 phiên phản RN
const changeLanguage = (language: string) => {
  console.log(`Ngôn ngữ được thay đổi sang: ${language}`);
};

const TabLayout: React.FC = () => {
  const colorScheme = useColorScheme();

  const [modalVisible, setModalVisible] = useState<boolean>(false); // Trạng thái modal
  useEffect(() => {
    StatusBar.setBackgroundColor("#4b69c1", true);
    StatusBar.setBarStyle("light-content", true);
  }, []);
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          {/* Icon menu */}
          <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity>

        {/* Ô tìm kiếm */}
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          placeholderTextColor="#aaa"
        />

        {/* Các icon bên phải */}
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="notifications" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="language" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="account-circle" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Course Information</Text>
            </View>

            <View style={styles.content}>
              {/* <View style={styles.row}>
                <Text style={styles.label}>📚 Course Name:</Text>
                <Text style={styles.value}>
                  {eventInfo.ctdt_hoc_phan_ten_tieng_viet}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>🎤 Lecturer:</Text>
                <Text style={styles.value}>
                  {eventInfo.nv_can_bo_ho} {eventInfo.nv_can_bo_ten}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>📍 Room:</Text>
                <Text style={styles.value}>{eventInfo.qttb_phong_ten}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>📅 Class Date:</Text>
                <Text style={styles.value}>{eventInfo.tkb_ngay}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>⏰ Class Time:</Text>
                <Text style={styles.value}>{eventInfo.tkb_tiet_gio_vao}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>📝 Notes:</Text>
                <Text style={styles.value}>{eventInfo.tkb_ghi_chu}</Text>
              </View> */}

              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false, // Không dùng header mặc định
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="infor"
          options={{
            title: "Information",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="academic_planning"
          options={{
            title: "Planning",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "book" : "book-outline"}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "calendar" : "calendar-outline"}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="grades"
          options={{
            title: "Grades",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "checkbox" : "checkbox-outline"}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "notifications" : "notifications-outline"}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="login"
          options={{
            title: "Login",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "log-in" : "log-in-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerLayout: {
    flexDirection: "row", // Để các phần tử nằm ngang
    justifyContent: "space-between", // Giữa các phần tử là khoảng cách đều
    alignItems: "center", // Căn giữa theo chiều dọc
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#4b69c1", // Màu nền cho header
  },
  headerLeft: {
    flexDirection: "row", // Để các nút đổi ngôn ngữ nằm ngang
  },
  language: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 5,
  },
  headerCenter: {
    flex: 1, // Để ô tìm kiếm chiếm hết không gian còn lại
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center", // Căn giữa theo chiều ngang
  },
  greenCircle: {
    width: 30,
    height: 30,
    borderRadius: 15, // Tạo hình tròn
    backgroundColor: "green",
  },
  imageCircle: {
    width: 30,
    height: 30,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Add shadow on Android
    shadowColor: "#000", // Add shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 4, // iOS shadow radius
    position: "relative",
    top: 10,
    right: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    marginTop: 16,
  },
  modalImage: {
    top: 0,
    right: 0,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconButton: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    fontSize: 14,
    color: "#000",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginHorizontal: 5,
  },
});

export default TabLayout;
