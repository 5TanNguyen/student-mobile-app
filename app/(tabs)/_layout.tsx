import { Tabs } from "expo-router";
import React, { useEffect, useState, useCallback } from "react";
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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Index from "./index";
import Infor from "./infor";
import AcademicPlanning from "./academic_planning";
import Calendar from "./calendar";
import Grades from "./grades";
import Notifications from "./notifications";
import LogIn from "./login";
import LogIn2 from "./login_2";
// import Toast from "react-native-toast-message";

// 0.76 phiên phản RN
const changeLanguage = (language: string) => {
  console.log(`Ngôn ngữ được thay đổi sang: ${language}`);
};

const Tab = createBottomTabNavigator();

const TabLayout: React.FC = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Trạng thái modal
  const [token, setToken] = useState("");

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setToken("");
      setModalVisible(false);
      router.push("/login");
    } catch (error) {
      // Toast.show({
      //   type: "error",
      //   text1: "ERROR",
      //   text2: "Log out failed!",
      // });
    }
  };

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor("#4b69c1", true);
      StatusBar.setBarStyle("light-content", true);

      const checkToken = async () => {
        const storedToken = await AsyncStorage.getItem("token");
        setToken(storedToken || "");
      };
      checkToken();

      const interval = setInterval(() => {
        StatusBar.setBackgroundColor("#4b69c1", true);
        StatusBar.setBarStyle("light-content", true);

        checkToken();
      }, 3000);

      return () => clearInterval(interval);
    }, [])
  );

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
          placeholder="Search..."
          placeholderTextColor="#aaa"
        />

        {/* Các icon bên phải */}
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => router.push("/notifications")}
          >
            <Icon name="notifications" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="language" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
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
              <Text style={styles.headerText}>Action</Text>
            </View>

            <View style={styles.content}>
              <TouchableOpacity style={{ marginBottom: 10 }}>
                <Button
                  title="Log out"
                  color="#e15f41"
                  onPress={() => logOut()}
                />
              </TouchableOpacity>

              <Button
                title="Close"
                onPress={() => setModalVisible(false)}
                color="#a4b0be" // Màu sắc của nút
              />
            </View>
          </View>
        </View>
      </Modal>

      <Tab.Navigator>
        {token ? (
          <Tab.Screen
            name="index"
            component={Index}
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
              headerShown: false,
            }}
          />
        ) : (
          <Tab.Screen
            name="login"
            component={LogIn}
            options={{
              title: "Login",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "log-in" : "log-in-outline"}
                  color={color}
                />
              ),
              headerShown: false,
            }}
          />
        )}

        <Tab.Screen
          name="infor"
          component={Infor}
          options={{
            title: "Information",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="academic_planning"
          component={AcademicPlanning}
          options={{
            title: "Planning",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "book" : "book-outline"}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="calendar" // Tên này phải giống với tên được sử dụng trong navigate
          component={Calendar}
          options={{
            title: "Schedule",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "calendar" : "calendar-outline"}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="grades"
          component={Grades}
          options={{
            title: "Grades",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "checkbox" : "checkbox-outline"}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="notifications"
          component={Notifications}
          options={{
            title: "Notifications",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "notifications" : "notifications-outline"}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="test"
          component={LogIn2}
          options={{
            title: "Test login with google",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "log-in" : "log-in-outline"}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
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
    backgroundColor: "#dfe4ea",
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
    width: "40%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
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
    backgroundColor: "none",
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 3,
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
  button: {
    backgroundColor: "#d9534f", // Màu nền của button
    paddingVertical: 10, // Khoảng cách dọc bên trong
    paddingHorizontal: 20, // Khoảng cách ngang bên trong
    borderRadius: 5, // Bo tròn góc button
    color: "#fff", // Màu chữ trên button
  },
});

export default TabLayout;
