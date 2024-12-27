import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
      termItem: {
        padding: 15,
        backgroundColor: "#ffffff",
        marginBottom: 10,
        borderRadius: 5,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
      },
      termText: {
        fontSize: 18,
        fontWeight: "bold",
      },
      coursesContainer: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        elevation: 1,
      },
      courseItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
      },
      courseText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      courseTextCenter: {
        flex: 1,
        textAlign: "center",
      },
      courseTextGrade: {
        flex: 1,
        textAlign: "left",
        paddingLeft: 20,
      },
      columnIndex: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
      },
      tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 10,
        marginBottom: 5,
      },
      headerText: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
      },
      courseTextIndex: {
        flex: 1,
        width: 30,
        fontWeight: "bold",
      },
});

export default styles;