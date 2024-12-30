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
        borderRadius: 10,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        borderLeftColor: "#3AB9F3",
        borderLeftWidth: 7,
        borderTopColor: "#000",
        borderTopWidth: 1,
        borderRightColor: "#000",
        borderRightWidth: 1,
        borderBottomColor: "#000",
        borderBottomWidth: 1,
      },
      yearText: {
        fontSize: 20,
        fontWeight: "bold",
      },
      termItem: {
        // padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        marginLeft: 7,
        elevation: 1,
      },
      gradientBackground: {
        padding: 10, // Điều chỉnh padding cho nút
        borderRadius: 10, // Bo góc cho nút
        justifyContent: "center",
        alignItems: "flex-start",
      },
      termText: {
        fontSize: 18,
      },
      coursesContainer: {
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginLeft: 7,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5
      },
      tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 10,
        marginBottom: 5,
        backgroundColor: '#3AB9F3',
        borderRadius: 5,
      },
      headerText: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center"
      },
      courseItem: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      },
      courseText: {
        textAlign: "left",
      },
      courseTextIndex: {
        fontWeight: "bold",
      },
      columnIndex: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
      },
      columnName: {
        flex: 3,
        marginTop: 5,
        textAlign: 'left'
      },
      columnCredits: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
      },
      columnStatus: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginRight: 10
      },
})

export default styles;