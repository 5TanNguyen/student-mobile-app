import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#f5f5f5",
      },
      calendar: {
        borderWidth: 1, // Độ dày viền
        borderColor: "#cccccc", // Màu viền
        borderRadius: 10, // Bo góc
        shadowColor: "#000", // Màu đổ bóng
        shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng (ngang, dọc)
        shadowOpacity: 0.25, // Độ mờ bóng
        shadowRadius: 3.84, // Bán kính bóng
        elevation: 5, // Độ nổi (chỉ dành cho Android)
        backgroundColor: "#ffffff", // Nền cho calendar
        margin: 3, // Khoảng cách từ calendar đến các phần tử khác
      },
      todoContainer: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        top: 20,
      },
      todoTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
      },
      subjectItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 1,
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 10,
        // shadowColor: "#000", // Màu của bóng
        // shadowOffset: { width: 0, height: 4 }, // Độ lệch của bóng (ngang, dọc)
        // shadowOpacity: 1, // Độ trong suốt của bóng
        // shadowRadius: 4, // Bán kính của bóng
        // elevation: 1, // Đổ bóng trên Android
        borderWidth: 1, // Độ trong suốt của bóng
        borderRadius: 15, // Tạo hình tròn
        borderStyle: "solid",
      },
      subjectText: {
        fontSize: 16,
        color: "#333", // Màu chữ
      },
    
      indexText: {
        fontSize: 16,
      },
    
      modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ
      },
      modalContainer: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
      },
      header: {
        alignItems: "center",
        marginBottom: 20,
      },
      headerText: {
        fontSize: 20,
        fontWeight: "bold",
      },
      label: {
        fontWeight: "bold",
        marginBottom: 5,
        width: "40%", // Chiều rộng của label
      },
      value: {
        fontSize: 16,
        width: "60%", // Chiều rộng của value
        textAlign: "right", // Căn phải cho value
      },
      row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      },
      closeButton: {
        padding: 8,
      },
      closeButtonText: {
        fontSize: 16,
        color: "#888",
      },
      content: {
        marginTop: 16,
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        elevation: 5,
        width: "80%", // Chiều rộng của modal
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
      },
      modalDescription: {
        marginVertical: 15,
        textAlign: "center",
      },
      circleColor: {
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10, // Khoảng cách giữa vòng tròn và tên môn học
        // shadowOpacity: 1, // Độ trong suốt của bóng
        // shadowRadius: 4, // Bán kính của bóng
        borderWidth: 1, // Độ trong suốt của bóng
        borderRadius: 15, // Tạo hình tròn
        borderStyle: "solid",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
});

export default styles;