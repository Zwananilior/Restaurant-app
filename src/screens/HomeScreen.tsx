import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";

const CATEGORIES = [
  { id: "1", title: "Sharing", image: require("../../assets/chicken_pizza.jpg") },
  { id: "2", title: "Drinks", image: require("../../assets/IMG-20260103-WA0018.jpg") },
  { id: "3", title: "Wings", image: require("../../assets/IMG-20260103-WA0020.jpg") },
];

const TRY_ME = [
  { id: "1", name: "Chicken Pizza", price: 29, image: require("../../assets/chicken_pizza.jpg") },
  { id: "2", name: "Beef Burger", price: 39, image: require("../../assets/beef_burger.jpg") },
  { id: "3", name: "Wrapsta", price: 29, image: require("../../assets/IMG-20260103-WA0021.jpg") },
  { id: "4", name: "Oreo Sundae", price: 25, image: require("../../assets/IMG-20260103-WA0014.jpg") },
  
  
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { addItem } = useCart();
  const { isLoggedIn } = useUser();

  return (
    <View style={styles.container}>
      {!isLoggedIn && (
        <View style={styles.authRow}>
          <TouchableOpacity style={styles.authBtn} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.authText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.authBtnOutline}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.authTextDark}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.tryMe}>
        <Image
          source={require("../../assets/ChatGPT Image Dec 21, 2025, 11_30_36 PM.png")}
          style={styles.tryMeImage}
        />
      </View>

      <Text style={styles.section}>Browse Category</Text>
      <View style={styles.categoryRow}>
        {CATEGORIES.map(c => (
          <TouchableOpacity
            key={c.id}
            style={styles.categoryCard}
            onPress={() =>
              navigation.navigate("MainTabs", { screen: "MenuTab" })
            }
          >
            <Image source={c.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{c.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>Try Me</Text>
      <FlatList
        horizontal
        data={TRY_ME}
        keyExtractor={i => i.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.tryCard}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.price}>R{item.price}</Text>

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                addItem({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                });
                navigation.navigate("MainTabs", { screen: "CartTab" });
              }}
            >
              <Text style={styles.addText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {!isLoggedIn && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerBtn}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.footerText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  authRow: { flexDirection: "row", padding: 20, gap: 10 },
  authBtn: { flex: 1, backgroundColor: "#000", padding: 14, borderRadius: 10 },
  authBtnOutline: { flex: 1, borderWidth: 1, padding: 14, borderRadius: 10 },
  authText: { color: "#FFF", textAlign: "center", fontWeight: "700" },
  authTextDark: { textAlign: "center", fontWeight: "700" },
  tryMe: { margin: 20, borderRadius: 14, overflow: "hidden" },
  tryMeImage: { width: "100%", height: 200 },
  section: { fontSize: 18, fontWeight: "800", margin: 20 },
  categoryRow: { flexDirection: "row", justifyContent: "space-around" },
  categoryCard: { alignItems: "center", padding: 14 },
  categoryImage: { width: 70, height: 70 },
  categoryText: { fontWeight: "700" },
  tryCard: { width: 200, marginLeft: 20, padding: 14 },
  image: { width: "100%", height: 120 },
  itemName: { fontWeight: "700" },
  price: { marginBottom: 10 },
  addBtn: { backgroundColor: "#C62828", padding: 12, borderRadius: 10 },
  addText: { color: "#FFF", textAlign: "center" },
  footer: { padding: 20 },
  footerBtn: { backgroundColor: "#000", padding: 16, borderRadius: 12 },
  footerText: { color: "#FFF", textAlign: "center", fontWeight: "800" },
});
