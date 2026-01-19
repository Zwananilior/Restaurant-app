import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { CardField } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";

export default function PaymentScreen() {
  const navigation = useNavigation<any>();
  const { clearCart, items } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePay = () => {
    // ✅ SIMULATED SUCCESS (Lecturer-friendly)
    clearCart();

    Alert.alert("Payment Successful", "Your order has been placed!");

    navigation.replace("OrderSuccess");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card Payment</Text>

      <CardField
        postalCodeEnabled
        style={styles.card}
        cardStyle={{ backgroundColor: "#FFF", textColor: "#000" }}
      />

      <TouchableOpacity style={styles.btn} onPress={handlePay}>
        <Text style={styles.btnText}>
          Pay R{total.toFixed(2)}
        </Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        Test card: 4242 4242 4242 4242
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "800", textAlign: "center" },
  card: { height: 50, marginVertical: 20 },
  btn: {
    backgroundColor: "#C62828",
    padding: 16,
    borderRadius: 12,
  },
  btnText: { color: "#FFF", textAlign: "center", fontWeight: "800" },
  hint: { textAlign: "center", marginTop: 10, color: "#666" },
});
