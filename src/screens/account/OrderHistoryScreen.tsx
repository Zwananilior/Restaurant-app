import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { useUser } from "../../context/UserContext";

export default function OrderHistoryScreen() {
  const { orders } = useUser();

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No orders yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={order => order.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item: order }) => (
        <View style={styles.card}>
          <Text style={styles.date}>{order.date}</Text>

          {/* ORDER ITEMS */}
          {order.items.map((item: any, index: number) => (
            <View key={index} style={styles.itemBlock}>
              <Text style={styles.itemName}>
                {item.name} × {item.quantity}
              </Text>

              {/* EXTRAS */}
              {item.extras && item.extras.length > 0 && (
                <View style={styles.extras}>
                  {item.extras.map((extra: any) => (
                    <Text key={extra.id} style={styles.extraText}>
                      • {extra.name} (+R{extra.price})
                    </Text>
                  ))}
                </View>
              )}

              <Text style={styles.itemPrice}>
                Item total: R
                {(
                  (item.price +
                    (item.extras?.reduce(
                      (s: number, e: any) => s + e.price,
                      0
                    ) ?? 0)) *
                  item.quantity
                ).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <Text style={styles.total}>
            Order Total: R{order.total.toFixed(2)}
          </Text>
        </View>
      )}
    />
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 2,
  },

  date: {
    fontWeight: "800",
    marginBottom: 10,
    fontSize: 15,
  },

  itemBlock: {
    marginBottom: 10,
  },

  itemName: {
    fontSize: 15,
    fontWeight: "700",
  },

  extras: {
    marginLeft: 10,
    marginTop: 4,
  },

  extraText: {
    fontSize: 13,
    color: "#555",
  },


  itemPrice: {
    marginTop: 4,
    fontSize: 13,
    color: "#333",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 10,
  },

  total: {
    fontSize: 16,
    fontWeight: "800",
    textAlign: "right",
  },
});
