import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OrderSuccessScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Order Successful!</Text>

      <Text style={styles.message}>
        Thank you for ordering from Nthabi Black.
        Your food is being prepared 🍽️
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "MainTabs", params: { screen: "MenuTab" } }],
          })
        }
      >
        <Text style={styles.btnText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 10,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "#C62828",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
