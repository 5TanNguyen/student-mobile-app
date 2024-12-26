import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import config from "../../constants/config";
// import Toast from "react-native-toast-message";
// import * as ImagePicker from "expo-image-picker";

export default function StudentInfoScreen() {
  const [student, setStudent] = useState({
    sv_sinh_vien_ma: "",
    sv_sinh_vien_ten: "",
    sv_sinh_vien_ho: "",
    sv_sinh_vien_ten_viet_tat: "",
    sv_sinh_vien_gioi_tinh: "",
    sv_sinh_vien_avatar: "",
    sv_sinh_vien_ho_chieu: "",
    sv_sinh_vien_ngay_cap_cccd: "",
    sv_sinh_vien_noi_cap_cccd: "",
    sv_sinh_vien_nguyen_quan: "",
    firstname: "",
    sv_lop_ma: "",
    sv_lop_ten_tieng_anh: "",
    sv_lop_ten_tieng_viet: "",
    sv_sinh_vien_ngay_sinh: "",
    sv_sinh_vien_email: "",
    sv_sinh_vien_trang_thai: "",
    sv_sinh_vien_sdt: "",
    sv_sinh_vien_dia_chi_thuong_tru: "",
    sv_sinh_vien_cccd: "",
    dm_dan_toc_ten_tieng_anh: "",
    dm_ten_ton_giao_tieng_anh: "",
    quoc_tich_hien_tai_tieng_anh: "",
    sv_sinh_vien_dia_chi_lien_lac: "",
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
    sv_sinh_vien_ma_ho_so: "",
    sv_sinh_vien_ma_bhyt: "",
    sv_sinh_vien_ten_phong_ktx: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState("");
  const [token, setToken] = useState("");

  // const requestPermission = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Sorry, we need camera roll permissions to make this work!");
  //   }
  // };

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useFocusEffect(
    useCallback(() => {
      // Hàm bất đồng bộ xử lý việc lấy token và gọi API
      const fetchData = async () => {
        try {
          const storedToken = await AsyncStorage.getItem("token");
          if (!storedToken) {
            setStudent({
              sv_sinh_vien_ma: "",
              sv_sinh_vien_ten: "",
              sv_sinh_vien_ho: "",
              sv_sinh_vien_ten_viet_tat: "",
              sv_sinh_vien_gioi_tinh: "",
              sv_sinh_vien_avatar: "",
              sv_sinh_vien_ho_chieu: "",
              sv_sinh_vien_ngay_cap_cccd: "",
              sv_sinh_vien_noi_cap_cccd: "",
              sv_sinh_vien_nguyen_quan: "",
              firstname: "",
              sv_lop_ma: "",
              sv_lop_ten_tieng_anh: "",
              sv_lop_ten_tieng_viet: "",
              sv_sinh_vien_ngay_sinh: "",
              sv_sinh_vien_email: "",
              sv_sinh_vien_trang_thai: "",
              sv_sinh_vien_sdt: "",
              sv_sinh_vien_dia_chi_thuong_tru: "",
              sv_sinh_vien_cccd: "",
              dm_dan_toc_ten_tieng_anh: "",
              dm_ten_ton_giao_tieng_anh: "",
              quoc_tich_hien_tai_tieng_anh: "",
              sv_sinh_vien_dia_chi_lien_lac: "",
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
              sv_sinh_vien_ma_ho_so: "",
              sv_sinh_vien_ma_bhyt: "",
              sv_sinh_vien_ten_phong_ktx: "",
            });

            // Toast.show({
            //   type: "error",
            //   text1: "ERROR",
            //   text2: "Please login to see information!",
            // });
          } else {
            // Gọi API để lấy thông tin sinh viên sau khi lấy token
            const response = await axios.get(
              `${config.API_URL}sinhvien/info/Thongtinsinhvien`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "DHNCT-API-KEY": "@cntt@dhnct@",
                  "DHNCT-Authorization": storedToken, // Sử dụng token từ AsyncStorage
                },
              }
            );

            if (response.data && response.data.data) {
              setStudent(response.data.data);
              console.log(response.data.data);
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
          //   text2: "Please login to see information!",
          // });
        }
      };

      fetchData();

      return () => {
        // console.log("Cleanup when tab is unfocused");
      };
    }, [])
  );

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
    `${config.API_IMAGE_URL}` +
    student.sv_sinh_vien_avatar.slice(
      student.sv_sinh_vien_avatar.indexOf("uploads"),
      student.sv_sinh_vien_avatar.length
    );

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
      <Text style={styles.title}>Student Information</Text>
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
          <Text style={styles.label}>Nickname:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_ten_viet_tat}</Text>
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
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_sdt}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Passport:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_cccd}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date of issue:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_ngay_cap_cccd}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Issuing authority:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_noi_cap_cccd}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Original Nationality:</Text>
          <Text style={styles.value}>{student.quoc_tich_goc_tieng_anh}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Current Nationality:</Text>
          <Text style={styles.value}>
            {student.quoc_tich_hien_tai_tieng_anh}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Ethnicity:</Text>
          <Text style={styles.value}>{student.dm_dan_toc_ten_tieng_anh}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Religion:</Text>
          <Text style={styles.value}>{student.dm_ten_ton_giao_tieng_anh}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Place of origin:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_nguyen_quan}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>
            {student.sv_sinh_vien_dia_chi_thuong_tru}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Contact address:</Text>
          <Text style={styles.value}>
            {student.sv_sinh_vien_dia_chi_lien_lac}
          </Text>
        </View>
      </View>

      {/* Khối thông tin cha */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Academic Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Class Code:</Text>
          <Text style={styles.value}>{student.sv_lop_ma}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Class Name:</Text>
          <Text style={styles.value}>{student.sv_lop_ten_tieng_viet}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Course:</Text>
          <Text style={styles.value}>{student.ctdt_khoa_hoc_nam_hoc}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>
            {student.sv_sinh_vien_trang_thai === "1" && "Still studying"}
            {student.sv_sinh_vien_trang_thai === "2" && "Dropped out"}
            {student.sv_sinh_vien_trang_thai === "3" && "Deferred studies"}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Profile Code:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_ma_ho_so}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Enrollment Date:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_ngay_nhap_hoc}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Health insurance code:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_ma_bhyt}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Dormitory:</Text>
          <Text style={styles.value}>{student.sv_sinh_vien_ten_phong_ktx}</Text>
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
      {/* <Toast /> */}

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
    padding: 10,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
