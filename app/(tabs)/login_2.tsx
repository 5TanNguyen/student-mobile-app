import React, { useEffect } from "react";
import { Button, Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "370847943799-b9ifsvfe460030055ui1c70k347oq4to.apps.googleusercontent.com",
    webClientId:
      "370847943799-jrtbvrsmb4oe6auuntopvbe70ti1hh1q.apps.googleusercontent.com",
    responseType: "code",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Access token:", authentication?.accessToken);
      console.log("code:", response?.params.code);
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
