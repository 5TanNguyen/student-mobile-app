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
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useRouter } from "expo-router";
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
import language from "../../assets/images/lang/language";
// import Toast from "react-native-toast-message";

// 0.76 phiên phản RN
const Tab = createBottomTabNavigator();

const TabLayout: React.FC = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Trạng thái modal
  const [token, setToken] = useState("");
  const [lang, setLang] = useState(true);
  const [imageHeader, setImageHeader] = useState("");

  const changeLanguage = async (lang: boolean) => {
    setLang(lang);
    await AsyncStorage.setItem("lang", lang ? "true" : "false");
    // console.log(`_layout | Ngôn ngữ được thay đổi sang: ${lang}`);
  };

  const translate = (stringTranslate: string) => {
    for (const key in language) {
      if (key == stringTranslate) {
        if (lang) {
          return language[key as keyof typeof language].split("__")[0];
        } else {
          return language[key as keyof typeof language].split("__")[1];
        }
      }
    }

    return null;
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("imageHeader");
      await AsyncStorage.removeItem("studentName");
      await AsyncStorage.removeItem("token");
      setToken("");
      setModalVisible(false);
      setTimeout(() => {
        router.push("/login");
      }, 500);
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

      const checkAsyncStorage = async () => {
        const storedToken = await AsyncStorage.getItem("token");
        setToken(storedToken || "");

        const langToken = await AsyncStorage.getItem("lang");
        if (!langToken || langToken == "true") {
          await AsyncStorage.setItem("lang", "true");
          setLang(true);
        } else {
          await AsyncStorage.setItem("lang", "false");
          setLang(false);
        }

        const storedImage = await AsyncStorage.getItem("imageHeader");
        setImageHeader(storedImage || "");
      };
      checkAsyncStorage();

      const interval = setInterval(() => {
        StatusBar.setBackgroundColor("#4b69c1", true);
        StatusBar.setBarStyle("light-content", true);

        checkAsyncStorage();
      }, 1000);

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
        {/* <TouchableOpacity style={styles.iconButton}>
          <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity> */}

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
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => changeLanguage(!lang)}
          >
            {lang ? (
              <Image
                style={styles.imageLang}
                source={require("../../assets/images/lang/uk-flag.webp")}
              />
            ) : (
              <Image
                style={styles.imageLang}
                source={require("../../assets/images/lang/vi-flag.png")}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {imageHeader != "" ? (
              <Image source={{ uri: imageHeader }} style={styles.avatar} />
            ) : (
              // <Icon name="account-circle" size={30} color="#000" />
              <Icon name="account-circle" size={30} color="#000" />
            )}
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
              <Text style={styles.headerText}>{translate("action")}</Text>
            </View>

            <View style={styles.content}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#4b7bec",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  alignItems: "center",
                  marginBottom: 10,
                }}
                onPress={() => logOut()}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  {translate("logOut")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#a5b1c2",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  alignItems: "center",
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  {translate("close")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
        }}
      >
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
    width: "60%",
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
    height: 50,
  },
  iconButton: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#dcdde1",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    fontSize: 14,
    color: "#000",
    height: 30,
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
  imageLang: {
    width: 35,
    height: 23,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 40,
    marginLeft: 6,
    backgroundColor: "#e0e0e0",
  },
});

export default TabLayout;
