import React, { useEffect } from "react";
import { Button, Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Prompt } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "370847943799-b9ifsvfe460030055ui1c70k347oq4to.apps.googleusercontent.com",
    webClientId:
      "370847943799-jrtbvrsmb4oe6auuntopvbe70ti1hh1q.apps.googleusercontent.com",
    clientSecret: "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",
    responseType: "code",
    prompt: Prompt.SelectAccount, // Sử dụng enum Prompt thay vì chuỗi
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Access token:", authentication?.accessToken);
      console.log("Code:", response?.params.code);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login with Google"
      onPress={() => promptAsync()}
    />
  );
}
