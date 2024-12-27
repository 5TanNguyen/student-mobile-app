import { StyleSheet } from "react-native";

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

export default styles;