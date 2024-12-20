import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context"; // SafeAreaView để xử lý vùng an toàn
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

// Hàm thay đổi ngôn ngữ
const changeLanguage = (language: string) => {
  console.log(`Ngôn ngữ được thay đổi sang: ${language}`);
};

const TabLayout: React.FC = () => {
  const colorScheme = useColorScheme();

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
      <View style={styles.headerLayout}>
        <View style={styles.headerLeft}>
          {/* Chức năng đổi ngôn ngữ */}
          <TouchableOpacity onPress={() => changeLanguage("en")}>
            <Text style={styles.language}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLanguage("vi")}>
            <Text style={styles.language}>VI</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerCenter}>
          {/* Tìm kiếm */}
          <TextInput style={styles.searchInput} placeholder="Search" />
        </View>

        <View style={styles.headerRight}>
          {/* Ô tròn màu xanh bên phải */}
          <View style={styles.greenCircle} />
        </View>
      </View>
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
          name="infor"
          options={{
            title: "Infor",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
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
  header: {
    backgroundColor: "#4b69c1", // Màu nền cho header
    paddingVertical: 10, // Khoảng cách dọc để header không bị sát camera giọt nước
    paddingHorizontal: 20, // Khoảng cách ngang
    alignItems: "center",
    justifyContent: "center",
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
  searchInput: {
    width: "80%", // Chiếm 80% chiều ngang của header
    padding: 5,
    borderRadius: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  headerRight: {
    justifyContent: "center",
    alignItems: "center",
  },
  greenCircle: {
    width: 30,
    height: 30,
    borderRadius: 15, // Tạo hình tròn
    backgroundColor: "green",
  },
});

export default TabLayout;
