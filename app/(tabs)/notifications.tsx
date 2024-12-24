import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  Dimensions,
  Platform,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");

interface Notification {
  ql_thong_bao_id: string;
  ql_thong_bao_tieu_de: string;
  ql_thong_bao_tieu_de_tieng_anh: string;
  ql_thong_bao_noi_dung: string;
  ql_thong_bao_noi_dung_tieng_anh: string;
  ql_thong_bao_ngay_gui: string;
  ql_thong_bao_loai: string;
}

const NotificationPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Trạng thái modal
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notiInfo, setNotiInfo] = useState<{
    ql_thong_bao_id: string;
    ql_thong_bao_tieu_de: string;
    ql_thong_bao_noi_dung: string;
    ql_thong_bao_ngay_gui: string;
    ql_thong_bao_loai: string;
  }>({
    ql_thong_bao_id: "",
    ql_thong_bao_tieu_de: "",
    ql_thong_bao_noi_dung: "",
    ql_thong_bao_ngay_gui: "",
    ql_thong_bao_loai: "",
  });

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        {
          borderWidth: 1,
          borderColor: item.ql_thong_bao_loai == "1" ? "#198754" : "#eb3b5a",
        },
      ]}
      onPress={() =>
        handleNotificationPress(
          item.ql_thong_bao_id,
          item.ql_thong_bao_tieu_de_tieng_anh
            .replace("<p>", "")
            .replace("</p>", ""),
          item.ql_thong_bao_noi_dung_tieng_anh.replace(
            item.ql_thong_bao_noi_dung_tieng_anh.slice(
              item.ql_thong_bao_noi_dung_tieng_anh.indexOf("See details"),
              item.ql_thong_bao_noi_dung_tieng_anh.length
            ),
            ""
          ),
          item.ql_thong_bao_loai,
          item.ql_thong_bao_ngay_gui
        )
      }
    >
      <View style={styles.notiContent}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 5,
          }}
        >
          <Text>
            {item.ql_thong_bao_loai == "1" ? (
              <Text style={styles.thongbao}>Notifications</Text>
            ) : (
              <Text style={styles.nhacnho}>Reminds</Text>
            )}{" "}
          </Text>
          <Text style={{ fontStyle: "italic" }}>
            {formatDate(item.ql_thong_bao_ngay_gui)}
          </Text>
        </View>
        <Text style={styles.notificationTitle}>
          {item.ql_thong_bao_tieu_de_tieng_anh
            .replace("<p>", "")
            .replace("</p>", "")}
        </Text>
        <Text style={styles.notificationDescription}>
          {item.ql_thong_bao_noi_dung_tieng_anh.replace(
            item.ql_thong_bao_noi_dung_tieng_anh.slice(
              item.ql_thong_bao_noi_dung_tieng_anh.indexOf("See details"),
              item.ql_thong_bao_noi_dung_tieng_anh.length
            ),
            ""
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const formatDate = (date: string) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dateSplit = date
      .replace(date.slice(date.indexOf(" "), date.length), "")
      .split("-");

    const newDate =
      months[parseInt(dateSplit[1], 10) - 1] +
      " " +
      dateSplit[2] +
      ", " +
      dateSplit[0];

    return <Text>{newDate}</Text>;
  };

  const handleNotificationPress = (
    id: string,
    tieude: string,
    noidung: string,
    loai: string,
    ngaygui: string
  ) => {
    // console.log(`Notification ${id} clicked`);

    const notiModal = {
      ql_thong_bao_id: id,
      ql_thong_bao_tieu_de: tieude,
      ql_thong_bao_noi_dung: noidung,
      ql_thong_bao_ngay_gui: ngaygui,
      ql_thong_bao_loai: loai,
    };

    setNotiInfo(notiModal);
    setModalVisible(true);
    // console.log(notiModal);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const storedToken = await AsyncStorage.getItem("token");
          if (!storedToken) {
            setNotifications([]);

            Toast.show({
              type: "error",
              text1: "ERROR",
              text2: "Please login to see notifications !",
            });
          } else {
            const response = await axios.get(
              `http://10.10.4.43/studentsdnc-api/api/v1/notifications`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "DHNCT-API-KEY": "@cntt@dhnct@",
                  "DHNCT-Authorization": storedToken,
                },
              }
            );

            if (response.data && response.data.data) {
              setNotifications(response.data.data.notifications);
            } else {
              Toast.show({
                type: "error",
                text1: "ERROR",
                text2: "Failed to fetch data!",
              });
            }
          }
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "ERROR",
            text2: "Network or server error occurred!",
          });
        }
      };

      fetchData();

      // Cleanup khi tab không còn được focus
      return () => {
        console.log("Cleanup when tab is unfocused");
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.ql_thong_bao_id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {notiInfo.ql_thong_bao_tieu_de}
              </Text>
            </View>

            <View style={styles.content}>
              {/* Date sent ở góc trái trên */}
              <View style={styles.dateSentContainer}>
                <Text style={styles.label}>📅 Date sent: </Text>
                <Text style={styles.value}>
                  {notiInfo.ql_thong_bao_ngay_gui}
                </Text>
              </View>

              {/* Content dạng textarea chiếm full width */}
              <View style={styles.textareaContainer}>
                <Text style={styles.label}>📚 Content:</Text>
                <Text style={styles.textarea}>
                  {notiInfo.ql_thong_bao_noi_dung}
                </Text>
              </View>

              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
    textAlign: "center",
  },
  listContainer: {
    padding: 5,
  },
  notificationItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Mờ phía sau modal
  },
  modalContainer: {
    // width: width * 0.85,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    flex: 1,
  },
  value: {
    color: "#555",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textareaContainer: {
    marginTop: 0,
    width: "100%", // Chiếm full chiều rộng
    marginBottom: 8,
  },
  textarea: {
    height: 150,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top", // Đảm bảo văn bản bắt đầu từ trên cùng
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  dateSentContainer: {
    flexDirection: "row",
    justifyContent: "flex-start", // Căn trái
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notiContent: {
    flex: 1,
  },
  thongbao: {
    backgroundColor: "#198754",
    padding: Platform.OS === "android" ? 10 : 5,
    borderRadius: "10%",
    color: "white",
  },
  nhacnho: {
    backgroundColor: "#eb3b5a",
    padding: Platform.OS === "android" ? 10 : 5,
    borderRadius: "10%",
    color: "white",
  },
});

export default NotificationPage;
