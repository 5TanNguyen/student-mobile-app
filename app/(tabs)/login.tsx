import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  View,
  Text,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import axios from "axios";
import { Icon } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import config from "../../constants/config";
import styles from "../../styles/login";
import language from "../../constants/language";
// const CryptoJS = require("crypto-js");
// import Toast from "react-native-toast-message";

export default function Login() {
  const [modalVisible, setModalVisible] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();
  const [lang, setLang] = useState(true);
  const [isBiometricSupportedcd, setIsBiometricSupportedcd] = useState(false);

  const fallBackToDeFaultAuth = () => {
    console.log("Fall back to password authentication");
  };

  const alertComponent = (
    title: string,
    mess: string,
    btnTxt: string,
    btnFunc: () => void
  ) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const TwoButtonAlert = () =>
    Alert.alert("You are logged in", "5tan", [
      {
        text: "Back",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "PROCEED",
        onPress: () => console.log("OK Pressed"),
      },
    ]);

  const handleBiometricAuth = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    if (!isBiometricAvailable) {
      return alertComponent(
        "Please enter your password",
        "Biometric auth not supported",
        "OK",
        () => fallBackToDeFaultAuth()
      );
    }

    let supportedBiometrics;
    if (isBiometricAvailable) {
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
    }

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (savedBiometrics) {
      return alertComponent(
        "Biometric record not found",
        "Please login with your password",
        "OK",
        () => fallBackToDeFaultAuth()
      );
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login to 5Tan dev app with biometric",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    if (biometricAuth) {
      TwoButtonAlert();
    }
  };

  useEffect(() => {
    async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupportedcd(compatible);
    };
  }, []);

  const showModal = (modalVisible: any) => {
    setModalVisible(modalVisible);
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

  const postLogin = async () => {
    if (email == "" || password == "") {
      showModal(true);
      // Toast.show({
      //   type: "error",
      //   text1: "NOTE",
      //   text2: "Please fill in all the information!",
      // });
    } else {
      try {
        axios
          .post(
            `${config.API_URL}authentication/login`,
            {
              ql_nguoi_dung_email: "test03@gmail.com",
              ql_nguoi_dung_mat_khau:
                "XOCbyxTandfxBP724Ha9PeUoPirSTlL66konRArqnlPwYsV8jbXYUX/sa1lAII3kDvyV58PodjxhdXtrGPi9B07fS9ACuhY9lvxkL/UOr5wY7MwcXzpXAg8Y3yazV8a0OalaxSnkCCMFosFkI7lUYdAqdj4NoSUuJV4Y/s5AMbD2oO7/sli8c2wvgx80/81eUtw3rf2n70JoH0TtbVWpR2ZpVdPXvauUMvW2JWBWafSals9fRPHyF9xdMkpIaeB2PI3f3f1Ii2UYNvT3W30isHLRGnSkWbsCI8IspL2NmotZW46IOSsGhitfzYP/xldj4b2a1Bc2seUTGFl7JB2AGA==",
            },
            // `${config.API_URL}authentication/login`,
            // {
            //   ql_nguoi_dung_email: "y240001@gmail.com",
            //   ql_nguoi_dung_mat_khau:
            //     "wEvruQ4Fr/sWzY+ttxDHOjacjNRkrRhO6ApVh7CUxffeHbT2qUu6vcYyPelHKQcyHrjhsxzOtA5XYHd3M2xoN8Wq6GDhlJppwKNHJTQEZFhdsiDaW2/ulrlQZFpM+HKeN6uek5uqU6KVhS7YtgOmWs7JRtQw8tSvae+F3b//hN6Gq4/HJAUBN15PmraqkC9tv8nCnnedYu5MM9LxD6LnbxWLaYocXc/X85JH+3h1xYqBNHy4dk3VFzDjQsk4QI3Br1vK6oDtn7LeVnx6GNYl1cl0dekPOd1KgsZ+Os3cqdJ79F9jwojXZQ70c/5qtGNUKSS7XzaRfg2bHGHquarA+g==",
            // },
            {
              headers: {
                "Content-Type": "application/json",
                "DHNCT-API-KEY": "@cntt@dhnct@",
              },
            }
          )
          .then(async (response) => {
            console.log(response.data.data.token);
            setToken(response.data.data.token);
            await AsyncStorage.setItem("token", response.data.data.token);

            const responseINFOR = await axios.get(
              `${config.API_URL}sinhvien/info/Thongtinsinhvien`,
              {
                headers: {
                  "Content-Type": "application/json",
                  "DHNCT-API-KEY": "@cntt@dhnct@",
                  "DHNCT-Authorization": response.data.data.token, // Sử dụng token từ AsyncStorage
                },
              }
            );

            if (responseINFOR.data && responseINFOR.data.data) {
              const image =
                `${config.API_IMAGE_URL}` +
                `${responseINFOR.data.data.sv_sinh_vien_avatar.slice(
                  responseINFOR.data.data.sv_sinh_vien_avatar.indexOf(
                    "uploads"
                  ),
                  responseINFOR.data.data.sv_sinh_vien_avatar.length
                )}`;

              await AsyncStorage.setItem("imageHeader", image);
              await AsyncStorage.setItem(
                "studentName",
                responseINFOR.data.data.sv_sinh_vien_ten
              );
              // console.log(response.data.data);
            } else {
              // Toast.show({
              //   type: "error",
              //   text1: "ERROR",
              //   text2: "Failed to fetch data!",
              // });
            }

            router.push("/infor");
          })
          .catch((error) => {
            console.error("Error getting public key:", error);
          });
      } catch (error) {
        console.error("Encryption Error:", error);
      }
    }
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
        } catch (error) {
          // Toast.show({
          //   type: "error",
          //   text1: "ERROR",
          //   text2: "Network or server error occurred!",
          // });
        }
      };

      fetchData();

      axios
        .get(`${config.API_URL}common/keys/getPublicKey`, {
          headers: {
            "Content-Type": "application/json",
            "DHNCT-API-KEY": "@cntt@dhnct@",
          },
        })
        .then((response) => {
          // console.log(response.data.publicKey);
          setPublicKey(response.data.publicKey);
        })
        .catch((error) => {
          console.error("Error getting public key:", error);
        });
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.greetingView}>
        <Text style={styles.portal}>
          {translate("internationalStudentPortal")}
        </Text>
        <Image
          style={styles.imageLoginDNC}
          source={require("../../assets/images/students/DNCLOGO.png")}
        />
      </View>
      <View style={styles.loginForm}>
        <View style={styles.loginContent}>
          <Image
            style={styles.imageLogin}
            source={require("../../assets/images/students/avatarLogin_2.jpg")}
          />
          <Text style={styles.loginPageText}>{translate("loginPage")}</Text>
          <View style={styles.inputField}>
            <Text style={styles.labelInput}>
              <Icon
                name="person-outline"
                type="ionicon"
                color="#000"
                size={25}
                style={{ marginTop: 6, marginLeft: 2 }}
              />
            </Text>
            <TextInput
              style={styles.inputLogin}
              onChangeText={(newText) => setEmail(newText)}
              defaultValue={email}
              placeholder="Email"
            />
          </View>

          <View style={styles.inputField}>
            <Text style={styles.labelInput}>
              <Icon
                name="lock-closed-outline"
                type="ionicon"
                color="#000"
                size={25}
                style={{ marginTop: 6, marginLeft: 2 }}
              />
            </Text>
            <TextInput
              style={styles.inputLogin}
              onChangeText={(newText) => setPassword(newText)}
              defaultValue={password}
              placeholder="Password"
            />
          </View>
          <View style={styles.viewButton}>
            <TouchableOpacity style={styles.buttonLogin} onPress={postLogin}>
              <Text style={styles.textLogin}>{translate("postLogin")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.finger_print}
              onPress={handleBiometricAuth}
            >
              <Icon
                name="fingerprint"
                type="font-awesome-5"
                color="#fff"
                size={20}
                style={{ marginTop: 1, marginLeft: 2 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* <Toast /> */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => showModal(modalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {translate("pleaseEnterTheLoginInformation")}
            </Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => showModal(!modalVisible)}
            >
              <Text style={styles.textClose}>{translate("close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text>
        {""}
        {isBiometricSupportedcd
          ? "Your device is compatible with Biometrics"
          : "Face or Fingerprint scanner is available on this device"}
      </Text>
    </View>
  );
}
