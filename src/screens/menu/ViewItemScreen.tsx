import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useCart } from "../../context/CartContext";

const EXTRAS = [
  { id: "e1", name: "Extra Cheese", price: 10 },
  { id: "e2", name: "Sauce", price: 5 },
  { id: "e3", name: "Chips", price: 20 },
];

export default function ViewItemScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { addItem } = useCart();

  const { item } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<any[]>([]);

  const toggleExtra = (extra: any) => {
    setSelectedExtras(prev =>
      prev.find(e => e.id === extra.id)
        ? prev.filter(e => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const extrasTotal = selectedExtras.reduce((s, e) => s + e.price, 0);
  const totalPrice = (item.price + extrasTotal) * quantity;

  const handleAddToCart = () => {
    addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        extras: selectedExtras,
      },
      quantity
    );

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={item.image} style={styles.image} />

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Base Price: R{item.price.toFixed(2)}</Text>

      {/* QUANTITY */}
      <View style={styles.qtyRow}>
        <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))}>
          <Text style={styles.qtyBtn}>−</Text>
        </TouchableOpacity>

        <Text style={styles.qty}>{quantity}</Text>

        <TouchableOpacity onPress={() => setQuantity(q => q + 1)}>
          <Text style={styles.qtyBtn}>+</Text>
        </TouchableOpacity>
      </View>

      {/* EXTRAS */}
      <Text style={styles.section}>Extras</Text>
      {EXTRAS.map(extra => (
        <TouchableOpacity
          key={extra.id}
          style={[
            styles.extraRow,
            selectedExtras.some(e => e.id === extra.id) && styles.extraSelected,
          ]}
          onPress={() => toggleExtra(extra)}
        >
          <Text>{extra.name}</Text>
          <Text>+ R{extra.price}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.total}>
        Total: R{totalPrice.toFixed(2)}
      </Text>

      <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
        <Text style={styles.addText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
