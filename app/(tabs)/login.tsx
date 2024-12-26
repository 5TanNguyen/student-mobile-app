import React, { useEffect, useState } from "react";
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
} from "react-native";
import axios from "axios";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import config from "../../constants/config";
// const CryptoJS = require("crypto-js");
// import Toast from "react-native-toast-message";

export default function Login() {
  const [modalVisible, setModalVisible] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  const showModal = (modalVisible: any) => {
    setModalVisible(modalVisible);
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
            // `${config.API_URL}authentication/login`,
            // {
            //   ql_nguoi_dung_email: "test03@gmail.com",
            //   ql_nguoi_dung_mat_khau:
            //     "XOCbyxTandfxBP724Ha9PeUoPirSTlL66konRArqnlPwYsV8jbXYUX/sa1lAII3kDvyV58PodjxhdXtrGPi9B07fS9ACuhY9lvxkL/UOr5wY7MwcXzpXAg8Y3yazV8a0OalaxSnkCCMFosFkI7lUYdAqdj4NoSUuJV4Y/s5AMbD2oO7/sli8c2wvgx80/81eUtw3rf2n70JoH0TtbVWpR2ZpVdPXvauUMvW2JWBWafSals9fRPHyF9xdMkpIaeB2PI3f3f1Ii2UYNvT3W30isHLRGnSkWbsCI8IspL2NmotZW46IOSsGhitfzYP/xldj4b2a1Bc2seUTGFl7JB2AGA==",
            // },
            `${config.API_URL}authentication/login`,
            {
              ql_nguoi_dung_email: "y240001@gmail.com",
              ql_nguoi_dung_mat_khau:
                "wEvruQ4Fr/sWzY+ttxDHOjacjNRkrRhO6ApVh7CUxffeHbT2qUu6vcYyPelHKQcyHrjhsxzOtA5XYHd3M2xoN8Wq6GDhlJppwKNHJTQEZFhdsiDaW2/ulrlQZFpM+HKeN6uek5uqU6KVhS7YtgOmWs7JRtQw8tSvae+F3b//hN6Gq4/HJAUBN15PmraqkC9tv8nCnnedYu5MM9LxD6LnbxWLaYocXc/X85JH+3h1xYqBNHy4dk3VFzDjQsk4QI3Br1vK6oDtn7LeVnx6GNYl1cl0dekPOd1KgsZ+Os3cqdJ79F9jwojXZQ70c/5qtGNUKSS7XzaRfg2bHGHquarA+g==",
            },
            {
              headers: {
                "Content-Type": "application/json",
                "DHNCT-API-KEY": "@cntt@dhnct@",
              },
            }
          )
          .then(async (response) => {
            // console.log(response.data.data.token);
            setToken(response.data.data.token);
            await AsyncStorage.setItem("token", response.data.data.token);
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

  useEffect(() => {
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
      .then((response) => {
        // console.log(response.data.publicKey);
        setPublicKey(response.data.publicKey);
      })
      .catch((error) => {
        console.error("Error getting public key:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loginForm}>
        <View style={styles.loginContent}>
          <Image
            style={styles.imageLogin}
            source={require("../../assets/images/students/avatarLogin_2.jpg")}
          />
          <Text style={styles.loginPageText}>LOGIN PAGE</Text>
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
          <TouchableOpacity style={styles.buttonLogin} onPress={postLogin}>
            <Text style={styles.textLogin}>LOGIN</Text>
          </TouchableOpacity>
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
              Please enter the login information
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Close"
                onPress={() => showModal(!modalVisible)}
                color="#888"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  loginForm: {
    flexDirection: "column",
    backgroundColor: "#3c55ac",
    width: "70%",
    borderRadius: 20,
    shadowColor: "#535c68",
    shadowOpacity: 0.4,
    shadowOffset: { width: 7, height: 7 },
    shadowRadius: 3,
    alignItems: "center",
    paddingBottom: 25,
  },

  loginContent: {
    marginTop: 10,
    width: "90%",
    alignItems: "center",
  },

  loginPageText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    top: 40,
  },

  imageLogin: {
    width: 90,
    height: 90,
    borderRadius: 50,
    // borderColor: "white",
    // borderWidth: 5,
    // left: "50%",
    top: -10,
    transform: [{ translateX: 0 }, { translateY: "-50%" }],
  },

  inputField: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 35,
  },

  labelInput: {
    zIndex: 2,
  },

  inputLogin: {
    position: "absolute",
    backgroundColor: "#dff9fb",
    borderRadius: 5,
    height: 40,
    left: 0,
    width: "100%",
    zIndex: 1,
    paddingLeft: 35,
  },

  buttonLogin: {
    width: "100%",
    backgroundColor: "#b71540",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 5,
  },

  textLogin: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
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
  text: {
    marginBottom: 20,
    fontSize: 18,
  },
});
