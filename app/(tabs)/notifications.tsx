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
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../constants/config";
import styles from "@/styles/notifications";
import language from "../../assets/images/lang/language";
// import Toast from "react-native-toast-message";

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
    ql_thong_bao_tieu_de_tieng_anh: string;
    ql_thong_bao_noi_dung: string;
    ql_thong_bao_noi_dung_tieng_anh: string;
    ql_thong_bao_ngay_gui: string;
    ql_thong_bao_loai: string;
  }>({
    ql_thong_bao_id: "",
    ql_thong_bao_tieu_de: "",
    ql_thong_bao_tieu_de_tieng_anh: "",
    ql_thong_bao_noi_dung: "",
    ql_thong_bao_noi_dung_tieng_anh: "",
    ql_thong_bao_ngay_gui: "",
    ql_thong_bao_loai: "",
  });
  const [lang, setLang] = useState(true);

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
          item.ql_thong_bao_tieu_de.replace("<p>", "").replace("</p>", ""),
          item.ql_thong_bao_tieu_de_tieng_anh
            .replace("<p>", "")
            .replace("</p>", ""),
          item.ql_thong_bao_noi_dung.replace(
            item.ql_thong_bao_noi_dung_tieng_anh.slice(
              item.ql_thong_bao_noi_dung_tieng_anh.indexOf("See details"),
              item.ql_thong_bao_noi_dung_tieng_anh.length
            ),
            ""
          ),
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
              <Text style={styles.thongbao}>{translate("notifications")}</Text>
            ) : (
              <Text style={styles.nhacnho}>{translate("reminds")}</Text>
            )}{" "}
          </Text>
          <Text style={{ fontStyle: "italic" }}>
            {formatDate(item.ql_thong_bao_ngay_gui)}
          </Text>
        </View>
        <Text style={styles.notificationTitle}>
          {lang
            ? item.ql_thong_bao_tieu_de_tieng_anh
              ? item.ql_thong_bao_tieu_de_tieng_anh
                  .replace("<p>", "")
                  .replace("</p>", "")
              : item.ql_thong_bao_tieu_de.replace("<p>", "").replace("</p>", "")
            : item.ql_thong_bao_tieu_de.replace("<p>", "").replace("</p>", "")}
        </Text>
        <Text style={styles.notificationDescription}>
          {lang
            ? item.ql_thong_bao_noi_dung_tieng_anh.replace(
                item.ql_thong_bao_noi_dung_tieng_anh.slice(
                  item.ql_thong_bao_noi_dung_tieng_anh.indexOf("See details"),
                  item.ql_thong_bao_noi_dung_tieng_anh.length
                ),
                ""
              )
            : item.ql_thong_bao_noi_dung.replace(
                item.ql_thong_bao_noi_dung.slice(
                  item.ql_thong_bao_noi_dung.indexOf("Xem chi tiết"),
                  item.ql_thong_bao_noi_dung.length
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

    const ngayMoi = dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];

    return <Text>{lang ? newDate : ngayMoi}</Text>;
  };

  const handleNotificationPress = (
    id: string,
    tieude: string,
    tieudeTA: string,
    noidung: string,
    noidungTA: string,
    loai: string,
    ngaygui: string
  ) => {
    // console.log(`Notification ${id} clicked`);

    const notiModal = {
      ql_thong_bao_id: id,
      ql_thong_bao_tieu_de: tieude,
      ql_thong_bao_tieu_de_tieng_anh: tieudeTA,
      ql_thong_bao_noi_dung: noidung,
      ql_thong_bao_noi_dung_tieng_anh: noidungTA,
      ql_thong_bao_ngay_gui: ngaygui,
      ql_thong_bao_loai: loai,
    };

    setNotiInfo(notiModal);
    setModalVisible(true);
    // console.log(notiModal);
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

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setInterval(async () => {
            const storedLang = await AsyncStorage.getItem("lang");
            if (storedLang === "true") {
              setLang(true);
            } else {
              setLang(false);
            }
          }, 500);

          const storedToken = await AsyncStorage.getItem("token");
          if (!storedToken) {
            setNotifications([]);

            // Toast.show({
            //   type: "error",
            //   text1: "ERROR",
            //   text2: "Please login to see notifications !",
            // });
          } else {
            const response = await axios.get(`${config.API_URL}notifications`, {
              headers: {
                "Content-Type": "application/json",
                "DHNCT-API-KEY": "@cntt@dhnct@",
                "DHNCT-Authorization": storedToken,
              },
            });

            if (response.data && response.data.data) {
              setNotifications(response.data.data.notifications);
              // console.log(response.data.data.notifications);
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

      // Cleanup khi tab không còn được focus
      return () => {
        // console.log("Cleanup when tab is unfocused");
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translate("notifications")}</Text>
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
                {lang
                  ? notiInfo.ql_thong_bao_tieu_de_tieng_anh
                    ? notiInfo.ql_thong_bao_tieu_de_tieng_anh
                    : notiInfo.ql_thong_bao_tieu_de
                  : notiInfo.ql_thong_bao_tieu_de}
              </Text>
            </View>

            <View style={styles.content}>
              {/* Date sent ở góc trái trên */}
              <View style={styles.dateSentContainer}>
                <Text style={styles.label}>📅 {translate("dateSent")}: </Text>
                <Text style={styles.value}>
                  {notiInfo.ql_thong_bao_ngay_gui}
                </Text>
              </View>

              {/* Content dạng textarea chiếm full width */}
              <View style={styles.textareaContainer}>
                <Text style={styles.label}>📚 {translate("content")}:</Text>
                <Text style={styles.textarea}>
                  {lang
                    ? notiInfo.ql_thong_bao_noi_dung_tieng_anh
                      ? notiInfo.ql_thong_bao_noi_dung_tieng_anh
                      : notiInfo.ql_thong_bao_noi_dung
                    : notiInfo.ql_thong_bao_noi_dung}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#4b7bec",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  alignItems: "center",
                  marginBottom: 10,
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
      {/* <Toast /> */}
    </View>
  );
};

export default NotificationPage;
