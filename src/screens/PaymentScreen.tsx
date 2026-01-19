import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { CardField } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

export default function PaymentScreen() {
  const navigation = useNavigation<any>();
  const { items, clearCart } = useCart();
  const { profile, addOrder } = useUser();

  const [cardComplete, setCardComplete] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePay = async () => {
    if (!cardComplete) {
      Alert.alert(
        "Invalid card",
        "Please enter complete card details"
      );
      return;
    }

    if (!profile) {
      Alert.alert("Error", "You must be logged in to place an order");
      return;
    }

    /* ---------- CREATE ORDER ---------- */
    const order = {
      id: Date.now().toString(),
      items,
      total,
      date: new Date().toLocaleString(),
    };

    /* ---------- SAVE ORDER ---------- */
    await addOrder(order);

    /* ---------- CLEAR CART ---------- */
    clearCart();

    Alert.alert("Payment Successful", "Your order has been placed!");

    navigation.replace("OrderSuccess");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Card Details</Text>

      <CardField
        postalCodeEnabled={false}
        style={styles.card}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        onCardChange={(details) => {
          setCardComplete(details.complete);
        }}
      />

      <TouchableOpacity
        style={[
          styles.btn,
          !cardComplete && styles.disabled,
        ]}
        onPress={handlePay}
        disabled={!cardComplete}
      >
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
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },
  card: {
    height: 55,
    marginVertical: 20,
  },
  btn: {
    backgroundColor: "#C62828",
    padding: 16,
    borderRadius: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  btnText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "800",
  },
  hint: {
    textAlign: "center",
    marginTop: 10,
    color: "#666",
  },
});
