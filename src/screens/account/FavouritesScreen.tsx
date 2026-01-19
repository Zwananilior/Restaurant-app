import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";

export default function FavouritesScreen() {
  const { favourites, toggleFavourite } = useUser();
  const { addItem } = useCart();

  if (!favourites || favourites.length === 0) {
    return (
      <View style={styles.center}>
        <Ionicons name="heart-outline" size={48} color="#999" />
        <Text style={styles.empty}>No favourite items yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favourites}
      keyExtractor={item => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>
              R{item.price.toFixed(2)}
            </Text>
          </View>

          <View style={styles.actions}>
            {/* ADD TO CART */}
            <TouchableOpacity
              onPress={() =>
                addItem({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                })
              }
            >
              <Ionicons
                name="cart-outline"
                size={24}
                color="green"
              />
            </TouchableOpacity>

            {/* REMOVE FROM FAVOURITES */}
            <TouchableOpacity
              onPress={() => toggleFavourite(item)}
            >
              <Ionicons
                name="trash-outline"
                size={24}
                color="red"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    marginTop: 10,
    fontSize: 16,
    color: "#777",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  price: {
    marginTop: 4,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 14,
  },
});
