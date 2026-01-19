
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { CardField } from "@stripe/stripe-react-native";
import { useUser } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";

export default function CheckoutScreen({ navigation }: any) {
  const { profile, isLoggedIn, updateProfile, addOrder } = useUser();
  const { items, clearCart } = useCart();

  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState(profile?.firstName || "");
  const [lastName, setLastName] = useState(profile?.lastName || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [address, setAddress] = useState(profile?.address || "");

  /* ---------- BLOCK IF NOT LOGGED IN ---------- */
  useEffect(() => {
    if (!isLoggedIn) {
      Alert.alert(
        "Login Required",
        "Please sign in before checkout",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    }
  }, [isLoggedIn]);

  if (!isLoggedIn || !profile) return null;

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  /* ---------- STEP 1 ---------- */
  const continueToPayment = async () => {
    if (!phone || !address) {
      Alert.alert("Missing Info", "Phone & address are required");
      return;
    }

    await updateProfile({
      firstName,
      lastName,
      phone,
      address,
    });

    setStep(2); // ✅ THIS NOW WORKS
  };

  /* ---------- STEP 2 ---------- */
  const placeOrder = async () => {
    const order = {
      id: Date.now().toString(),
      items,
      total,
      date: new Date().toLocaleString(),
    };

    await addOrder(order);
    clearCart();
    setStep(3);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>
        Step {step} of 3
      </Text>

      {/* ---------- STEP 1 ---------- */}
      {step === 1 && (
        <>
          <Text style={styles.title}>Personal Information</Text>

          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />

          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />

          <TextInput
            placeholder="Phone *"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TextInput
            placeholder="Address *"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Payment")}
          >
            <Text style={styles.btnText}>
              Continue to Payment
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* ---------- STEP 2 ---------- */}
      {step === 2 && (
        <>
          <Text style={styles.title}>Payment</Text>

          <CardField
            postalCodeEnabled
            style={styles.card}
            cardStyle={{ backgroundColor: "#FFF" }}
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={placeOrder}
          >
            <Text style={styles.btnText}>
              Pay R{total.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* ---------- STEP 3 ---------- */}
      {step === 3 && (
        <>
          <Text style={styles.success}>
            Order Successful 🎉
          </Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.btnText}>
              Back to Home
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF" },
  ladder: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  step: { alignItems: "center", flex: 1 },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#CCC",
    justifyContent: "center",
    alignItems: "center",
  },
  active: { backgroundColor: "#C62828" },
  circleText: { color: "#FFF", fontWeight: "700" },
  stepLabel: { marginTop: 4, fontSize: 12 },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  card: { height: 50, marginVertical: 20 },
  btn: {
    backgroundColor: "#C62828",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  btnText: { color: "#FFF", textAlign: "center", fontWeight: "800" },
  success: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
  summary: { textAlign: "center", marginBottom: 20 },
});
