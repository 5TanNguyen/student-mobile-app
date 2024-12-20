import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Platform,
  View,
  Text,
  Alert,
} from "react-native";
import axios from "axios";
// import Toast from "react-native-toast-message";
// import * as ImagePicker from "expo-image-picker";

export default function StudentInfoScreen() {
  const [student, setStudent] = useState({
    sv_sinh_vien_ma: "",
    sv_sinh_vien_ten: "",
    sv_sinh_vien_ho: "",
    sv_sinh_vien_gioi_tinh: "",
    sv_sinh_vien_avatar: "",
    firstname: "",
    sv_lop_ma: "",
    sv_lop_ten_tieng_anh: "",
    sv_lop_ten_tieng_viet: "",
    sv_sinh_vien_ngay_sinh: "",
    sv_sinh_vien_email: "",
    sv_sinh_vien_sdt: "",
    sv_sinh_vien_dia_chi_thuong_tru: "",
    sv_sinh_vien_cccd: "",
    dm_dan_toc_ten_tieng_anh: "",
    dm_ten_ton_giao_tieng_anh: "",
    quoc_tich_hien_tai_tieng_anh: "",
    ctdt_khoa_hoc_nam_hoc: "",
    sv_sinh_vien_ngay_nhap_hoc: "",
    quoc_tich_goc_tieng_anh: "",
    sv_sinh_vien_ten_cha: "",
    sv_sinh_vien_sdt_cha: "",
    sv_sinh_vien_email_cha: "",
    sv_sinh_vien_ten_me: "",
    sv_sinh_vien_sdt_me: "",
    sv_sinh_vien_email_me: "",
    sv_sinh_vien_ten_nguoi_giam_ho: "",
    sv_sinh_vien_sdt_nguoi_giam_ho: "",
    sv_sinh_vien_email_nguoi_giam_ho: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState("");

  // const requestPermission = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Sorry, we need camera roll permissions to make this work!");
  //   }
  // };

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    // requestPermission();

    axios
      .get(
        `http://10.10.4.43/studentsdnc-api/api/v1/common/keys/getPublicKey`,
        {
          headers: {
            "Content-Type": "application/json",
            "DHNCT-API-KEY": "@cntt@dhnct@",
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Error getting public key:", error);
      });

    axios
      .get(
        `http://10.10.4.43/studentsdnc-api/api/v1/sinhvien/info/Thongtinsinhvien`,
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
        setStudent(response.data.data);

        console.log("Load thông tin sinh viên");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student info:", error);
      });
  }, []);

  if (!student) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading student information...</Text>
      </View>
    );
  }

  // const avatarUri = selectedImage
  //   ? selectedImage
  //   : `${student.sv_sinh_vien_avatar}`;
  const avatarUri =
    "http://10.10.4.43/studentsdnc-api/uploads/students/19819110003/19819110003_6763c471e05e3.jpg";

  const gender = student.sv_sinh_vien_gioi_tinh === "2" ? "Male" : "Female";

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // const uploadImage = async () => {
  //   if (Platform.OS === "web") {
  //     const input = document.createElement("input");
  //     input.type = "file";
  //     input.accept = "image/*";
  //     input.onchange = async (event) => {
  //       const target = event.target as HTMLInputElement;
  //       const file = target.files?.[0];
  //       if (file) {
  //         const formData = new FormData();
  //         formData.append("image", file);

  //         try {
  //           const apiUrl =
  //             "http://10.10.4.43/CodeIgniter-3.1.13/api/update_profile_picture";
  //           const response = await axios.post(apiUrl, formData, {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //             },
  //           });

  //           const tempuri =
  //             "http://10.10.4.43/CodeIgniter-3.1.13/" + response.data.data;
  //           setSelectedImage(tempuri);
  //           closeModal();
  //           // Toast.show({
  //           //   type: "success",
  //           //   text1: "Upload successful!",
  //           //   text2: "Profile picture updated successfully.",
  //           // });
  //           console.log("Upload web successful:", response.data);
  //         } catch (error) {
  //           console.error("Upload failed:", error);
  //         }
  //       }
  //     };
  //     input.click();
  //   } else {
  //     const options = {
  //       mediaType: "photo",
  //       includeBase64: false,
  //       quality: 1,
  //     };

  //     const response = await ImagePicker.launchImageLibraryAsync(options);

  //     if (response.canceled) {
  //       console.log("User cancelled image picker");
  //       return;
  //     }

  //     if (response.assets && response.assets.length > 0) {
  //       const image = response.assets[0];
  //       console.log("Selected Image:", image);

  //       const photo = {
  //         uri: image.uri,
  //         type: image.type || "image/jpeg",
  //         name: image.fileName || "avatar.jpg",
  //       };
  //       const blob = await fetch(photo.uri).then((res) => res.blob());

  //       const formData = new FormData();
  //       formData.append("image", blob, photo.name);

  //       try {
  //         const apiUrl =
  //           "http://10.10.4.43:8081/CodeIgniter-3.1.13/api/update_profile_picture";
  //         const uploadResponse = await axios.post(apiUrl, formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         });

  //         const tempuri =
  //           "http://10.10.4.43:8081/CodeIgniter-3.1.13/" +
  //           uploadResponse.data.data;
  //         setSelectedImage(tempuri);
  //         closeModal();
  //         // Toast.show({
  //         //   type: "success",
  //         //   text1: "Upload successful!",
  //         //   text2: "Profile picture updated successfully.",
  //         // });
  //         console.log("Upload successful:", uploadResponse.data);
  //       } catch (error) {
  //         console.error("Upload failed:" + error);
  //       }
  //     } else {
  //       console.log("No image selected");
  //     }
  //   }
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.name}>
            {student.sv_sinh_vien_ten} {student.sv_sinh_vien_ho}
          </Text>
          <Text style={styles.studentId}>
            Student ID: {student.sv_sinh_vien_ma}
          </Text>
          <TouchableOpacity style={styles.changeButton} onPress={openModal}>
            <Text style={styles.changeButtonText}>Change profile picture</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        {/* Các thông tin chi tiết của sinh viên */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Class Code:</Text>
          <Text style={styles.value}>{student.sv_lop_ma}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Class Name:</Text>
          <Text style={styles.value}>{student.sv_lop_ten_tieng_viet}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{gender}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_ngay_sinh}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_sdt}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>
            {student.sv_sinh_vien_dia_chi_thuong_tru}
          </Text>
        </View>
      </View>

      {/* Khối thông tin cha */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Father's Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_ten_cha}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_sdt_cha}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_email_cha}</Text>
        </View>
      </View>

      {/* Khối thông tin mẹ */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Mother's Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_ten_me}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_sdt_me}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_email_me}</Text>
        </View>
      </View>

      {/* Khối thông tin người giám hộ */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Guardian's Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>
            {student.sv_sinh_vien_ten_nguoi_giam_ho}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>
            {student.sv_sinh_vien_sdt_nguoi_giam_ho}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>
            {student.sv_sinh_vien_email_nguoi_giam_ho}
          </Text>
        </View>
      </View>

      {/* Modal để chọn ảnh đại diện */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Profile Picture</Text>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={closeModal} color="#888" />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    backgroundColor: "#e0e0e0",
  },
  infoTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4b69c1",
  },
  studentId: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  changeButton: {
    backgroundColor: "#4b69c1",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  changeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    width: 120,
  },
  value: {
    fontSize: 16,
    fontWeight: "400",
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  sectionContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
});
