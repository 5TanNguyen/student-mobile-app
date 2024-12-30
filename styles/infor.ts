import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
        backgroundColor: "#f5f5f5",
      },
      profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
      },
      avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
        backgroundColor: "#e0e0e0",
      },
      infoTextContainer: {
        flex: 1,
      },
      name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#4b69c1",
      },
      studentId: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
      },
      changeButton: {
        backgroundColor: "#4b69c1",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
      },
      changeButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold"
      },
      infoContainer: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 2,
      },
      infoRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 8,
      },
      label: {
        fontSize: 16,
        fontWeight: "600",
        width: 120,
      },
      value: {
        fontSize: 16,
        fontWeight: "400",
        flex: 1,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
      sectionContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 2,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#EC1E24",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
      button: {
        backgroundColor: "#4b69c1", // Màu nền của button
        paddingVertical: 10, // Khoảng cách dọc bên trong
        paddingHorizontal: 20, // Khoảng cách ngang bên trong
        borderRadius: 5, // Bo tròn góc button
        color: "#4b69c1", // Màu chữ trên button
      },
});

export default styles;