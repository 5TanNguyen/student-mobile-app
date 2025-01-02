import React from "react";
import { Button, View, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import config from "@/constants/config";
import axios from "axios";
// import { AsyncStorage } from "react-native";
import moment from "moment-timezone";

WebBrowser.maybeCompleteAuthSession();

const revokeGoogleToken = async (token: string) => {
  try {
    const response = await fetch(
      "https://accounts.google.com/o/oauth2/revoke",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `token=${token}`,
      }
    );

    if (response.ok) {
      console.log("Token revoked successfully");
    } else {
      console.error("Failed to revoke token:", await response.text());
    }
  } catch (error) {
    console.error("Error revoking token:", error);
  }
};

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "370847943799-jrtbvrsmb4oe6auuntopvbe70ti1hh1q.apps.googleusercontent.com",
    webClientId:
      "370847943799-jrtbvrsmb4oe6auuntopvbe70ti1hh1q.apps.googleusercontent.com",
    clientSecret: "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",
    clientId:
      "370847943799-jrtbvrsmb4oe6auuntopvbe70ti1hh1q.apps.googleusercontent.com",
    responseType: "code", // Use token to simplify access
    // redirectUri: "https://auth.expo.io/5tan/student-mobile-app",
  });

  const handleLogin = async () => {
    handleRevoke();
    const result = await promptAsync();
    if (result.type === "success") {
      const vietnamTime = moment.tz("Asia/Ho_Chi_Minh").format();
      // const queries = new URLSearchParams(result.params).toString();
      const queries = new URLSearchParams({
        code: result.params.code, // Mã code từ kết quả đăng nhập Google
        scope:
          "email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid",
        authuser: "0", // Đặt giá trị authuser giống với CI
        prompt: "none", // Giá trị prompt giống với CI
        timeZone: "Asia/Ho_Chi_Minh",
        currentTime: vietnamTime,
      }).toString();

      console.log(queries);

      const response = await axios.get(
        `${config.API_URL}authentication/login_google?` + `${queries}`,
        {
          headers: {
            "Content-Type": "application/json",
            "DHNCT-API-KEY": "@cntt@dhnct@",
          },
        }
      );

      console.log(response);
    }
  };

  const handleRevoke = async () => {
    if (response?.type === "success") {
      const token = response.params.access_token;
      if (token) {
        await revokeGoogleToken(token);
      } else {
        console.log("No token available to revoke");
      }
    } else {
      console.log("No successful login response to revoke");
    }
  };

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={handleLogin}
      />
      <Button title="Revoke Google Token" onPress={handleRevoke} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
