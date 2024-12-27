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
      yearItem: {
        padding: 15,
        backgroundColor: "#ffffff",
        marginBottom: 10,
        borderRadius: 5,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
      },
      yearText: {
        fontSize: 20,
        fontWeight: "bold",
      },
      termItem: {
        padding: 15,
        backgroundColor: "#e9e9e9",
        marginBottom: 10,
        borderRadius: 5,
        marginLeft: 15,
        elevation: 1,
      },
      termText: {
        fontSize: 18,
      },
      coursesContainer: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 5,
        marginLeft: 15,
        elevation: 1,
      },
      tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 10,
        marginBottom: 5,
      },
      headerText: {
        fontWeight: "bold",
        textAlign: "center",
      },
      courseItem: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      },
      courseText: {
        textAlign: "center",
      },
      courseTextt: {
        flex: 1,
        textAlign: "center",
      },
      courseTextIndex: {
        fontWeight: "bold",
      },
      columnIndex: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      columnName: {
        flex: 3,
        justifyContent: "center",
      },
      columnCredits: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      columnStatus: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
      },
})

export default styles;