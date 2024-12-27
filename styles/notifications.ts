import { StyleSheet, Platform } from "react-native";

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

  export default styles;