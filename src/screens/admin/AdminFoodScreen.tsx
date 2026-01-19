import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

type Food = {
  id: string;
  name: string;
  price: number;
};

export default function AdminFoodScreen() {
  const navigation = useNavigation<any>();

  const [foods, setFoods] = useState<Food[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    const raw = await AsyncStorage.getItem("FOODS");
    setFoods(raw ? JSON.parse(raw) : []);
  };

  const saveFoods = async (updated: Food[]) => {
    setFoods(updated);
    await AsyncStorage.setItem("FOODS", JSON.stringify(updated));
  };

  const handleAddOrUpdate = async () => {
    if (!name || !price) {
      Alert.alert("Error", "All fields required");
      return;
    }

    if (editingId) {
      const updated = foods.map(f =>
        f.id === editingId
          ? { ...f, name, price: Number(price) }
          : f
      );
      await saveFoods(updated);
      setEditingId(null);
    } else {
      const newFood: Food = {
        id: Date.now().toString(),
        name,
        price: Number(price),
      };
      await saveFoods([newFood, ...foods]);
    }

    setName("");
    setPrice("");
  };

  const handleEdit = (food: Food) => {
    setEditingId(food.id);
    setName(food.name);
    setPrice(food.price.toString());
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Delete", "Remove this item?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () =>
          saveFoods(foods.filter(f => f.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Foods</Text>

      <TextInput
        placeholder="Food name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={handleAddOrUpdate}>
        <Text style={styles.btnText}>
          {editingId ? "Update Food" : "Add Food"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={foods}
        keyExtractor={item => item.id}
        contentContainerStyle={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text>R{item.price.toFixed(2)}</Text>
            </View>

            <View style={styles.row}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#C62828",
    padding: 14,
    borderRadius: 12,
  },
  btnText: { color: "#FFF", textAlign: "center", fontWeight: "800" },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: { fontWeight: "700", fontSize: 16 },
  row: { flexDirection: "row", gap: 12 },
  edit: { color: "#1976D2", fontWeight: "700" },
  delete: { color: "#C62828", fontWeight: "700" },
  back: {
    marginTop: 10,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#000",
  },
  backText: { color: "#FFF", textAlign: "center", fontWeight: "800" },
});
