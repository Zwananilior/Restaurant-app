import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";

export default function CartScreen({ navigation }: any) {
  const { items, addItem, removeItem } = useCart();
  const { profile } = useUser();

  const isAdmin = profile?.email.endsWith("@admin.com");

  if (isAdmin) {
    return (
      <View style={styles.center}>
        <Ionicons name="lock-closed-outline" size={48} color="#777" />
        <Text style={styles.adminText}>Admins cannot place orders</Text>
      </View>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.title}>YOUR CART IS EMPTY.</Text>
        <Text style={styles.subtitle}>LET’S START AN ORDER!</Text>

        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => navigation.navigate("MenuTab")}
        >
          <Text style={styles.startText}>Start Order</Text>
        </TouchableOpacity>

        <Image
          source={require("../../../assets/IMG-20251222-WA0013.jpg")}
          style={styles.image}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {items.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>

          {item.extras?.length > 0 && (
            <View style={styles.extras}>
              {item.extras.map((e: any) => (
                <Text key={e.id} style={styles.extraText}>
                  • {e.name} (+R{e.price})
                </Text>
              ))}
            </View>
          )}

          <Text style={styles.price}>
            R{item.price.toFixed(2)} × {item.quantity}
          </Text>

          <View style={styles.controls}>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Ionicons name="remove-circle" size={26} color="red" />
            </TouchableOpacity>

            <Text style={styles.qty}>{item.quantity}</Text>

            <TouchableOpacity
              onPress={() =>
                addItem({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                })
              }
            >
              <Ionicons name="add-circle" size={26} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Text style={styles.total}>Total: R{total.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={() => navigation.navigate("Checkout")}
      >
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  adminText: { marginTop: 10, fontSize: 16, fontWeight: "700" },

  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "800" },
  subtitle: { fontSize: 18, marginBottom: 20 },
  startBtn: { backgroundColor: "#C62828", padding: 14, borderRadius: 30 },
  startText: { color: "#fff", fontWeight: "700" },
  image: { width: 200, height: 200 },

  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: "#F6F6F6",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: { fontSize: 16, fontWeight: "800" },
  extras: { marginTop: 6 },
  extraText: { fontSize: 14, color: "#444" },
  price: { marginTop: 6, fontWeight: "600" },

  controls: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  qty: { marginHorizontal: 10, fontSize: 16 },

  total: { fontSize: 18, fontWeight: "800", textAlign: "right" },
  checkoutBtn: { backgroundColor: "#000", padding: 16, borderRadius: 10 },
  checkoutText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
