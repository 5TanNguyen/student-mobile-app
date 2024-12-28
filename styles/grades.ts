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
      termText: {
        fontSize: 18,
        fontWeight: "bold",
      },
      coursesContainer: {
        marginLeft: 7,
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5
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
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 10,
        marginBottom: 5,
        backgroundColor: '#3AB9F3',
        borderRadius: 5
      },
      headerText: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5
      },
      letterGrade: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5,
        marginRight: 5
      },
      courseTextIndex: {
        flex: 1,
        width: 30,
        fontWeight: "bold",
        marginTop: 5
      },
});

export default styles;