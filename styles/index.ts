import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f2f2f2",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      backgroundColor: "#fff",
      elevation: 2,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      paddingHorizontal: 15,
      height: 60,
    },
    iconButton: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      backgroundColor: "#f2f2f2",
      marginHorizontal: 10,
      padding: 8,
      borderRadius: 5,
    },
    welcomeBox: {
      padding: 20,
      backgroundColor: "#fff",
      elevation: 2,
    },
    welcomeText: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    dateText: {
      color: "#666",
    },
    noticeBox: {
      backgroundColor: "#e3f2fd",
      margin: 15,
      padding: 15,
      borderRadius: 10,
    },
    noticeText: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    noticeSubText: {
      color: "#666",
      marginBottom: 10,
    },
    noticeButton: {
      backgroundColor: "#2f95dc",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    noticeButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    sectionLink: {
      color: "#2f95dc",
      fontWeight: "bold",
    },
    subjectBox: {
      padding: 15,
      margin: 15,
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
    subjectName: {
      fontSize: 16,
      fontWeight: "bold",
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },
    subjectDetails: {
      marginTop: 5,
      color: "#555",
    },
  });

export default styles;