import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: any;
};

const MENU: Record<string, MenuItem[]> = {
  Drinks: [
    { id: "d1", name: "Coke", price: 25, image: require("../../../assets/IMG-20260103-WA0016.jpg") },
    { id: "d2", name: "Sprite", price: 25, image: require("../../../assets/IMG-20260103-WA0015.jpg") },
    { id: "d3", name: "Stoney Sugar Buddy", price: 24, image: require("../../../assets/IMG-20260103-WA0022.jpg") },
    { id: "d4", name: "Fanta Sugar Buddy", price: 24, image: require("../../../assets/IMG-20260103-WA0023.jpg") },
	{ id: "d5", name: "BlueWatermelon Burst", price:30.31,image: require("../../../assets/IMG-20260103-WA0018.jpg") },
	{ id: "d6", name: "Mojito Sparkling krusher", price: 25,image: require("../../../assets/IMG-20260107-WA0012.jpg") },
  
  ],
  Dessert: [
    { id: "ds1", name: "Ice Cream", price: 35, image: require("../../../assets/IMG-20260103-WA0019.jpg") },
    { id: "ds2", name: "Oreo Sundae", price: 25, image: require("../../../assets/IMG-20260103-WA0014.jpg") },
  ],
  "Family Meals": [
    { id: "f1", name: "15 Piece Bucket", price: 159.9, image: require("../../../assets/IMG-20251222-WA0012.jpg") },
    { id: "f2", name: "9 Piece Bucket", price: 149.9, image: require("../../../assets/IMG-20251222-WA0011.jpg") },
	{ id: "f3", name: "Wings", price: 110.9,image: require("../../../assets/IMG-20260103-WA0020.jpg") },
	{ id: "f4", name: "New zinger", price: 59.9,image: require("../../../assets/IMG-20260107-WA0013.jpg") },
	{ id: "f5", name: "12 Pieces", price: 110.9,image: require("../../../assets/IMG-20260103-WA0017.jpg") },
	
	
  ],
};

export default function MenuScreen() {
  const { addItem } = useCart();
  const { favourites, toggleFavourite, profile } = useUser();
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");

  const isAdmin = profile?.email.endsWith("@admin.com");

  const isFavourite = (id: string) =>
    favourites?.some(f => f.id === id);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search menu..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.entries(MENU).map(([title, items]) => (
          <View key={title}>
            <Text style={styles.section}>{title}</Text>

            {items
              .filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map(item => (
                <View key={item.id} style={styles.card}>
                  <Image source={item.image} style={styles.image} />

                  <View style={styles.info}>
                    <View style={styles.row}>
                      <Text style={styles.name}>{item.name}</Text>

                      <TouchableOpacity
                        onPress={() =>
                          toggleFavourite({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                          })
                        }
                      >
                        <Ionicons
                          name={isFavourite(item.id) ? "heart" : "heart-outline"}
                          size={24}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.price}>
                      R{item.price.toFixed(2)}
                    </Text>

                    <TouchableOpacity
                      disabled={isAdmin}
                      style={[
                        styles.btn,
                        isAdmin && { backgroundColor: "#999" },
                      ]}
                      onPress={() =>
                        addItem({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                        })
                      }
                    >
                      <Text style={styles.btnText}>
                        {isAdmin ? "Admins cannot order" : "Add to Cart"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        ))}
      </ScrollView>

      {!isAdmin && (
        <TouchableOpacity
          style={styles.checkout}
          onPress={() =>
            navigation.navigate("MainTabs", { screen: "CartTab" })
          }
        >
          <Text style={styles.checkoutText}>Go to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#FFF" },
  search: { borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 10 },
  section: { fontSize: 20, fontWeight: "800", marginVertical: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  image: { width: 90, height: 90, borderRadius: 10, marginRight: 12 },
  info: { flex: 1 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontSize: 16, fontWeight: "700" },
  price: { marginTop: 4, fontWeight: "600" },
  btn: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  btnText: { color: "#FFF", textAlign: "center", fontWeight: "700" },
  checkout: {
    backgroundColor: "#C62828",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  checkoutText: { color: "#FFF", textAlign: "center", fontWeight: "700" },
});
