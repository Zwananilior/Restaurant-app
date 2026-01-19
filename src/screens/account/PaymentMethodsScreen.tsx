import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function PaymentMethodsScreen() {
  const [edit, setEdit] = useState(false);

  const [details, setDetails] = useState({
    firstName: "Nthabi",
    lastName: "Black",
    email: "user@email.com",
    phone: "0712345678",
    postcode: "4001",
    dob: "1999-01-01",
    payment: "Cash",
  });

  const update = (key: string, value: string) =>
    setDetails({ ...details, [key]: value });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Payment & Personal Details</Text>

      {Object.entries(details).map(([key, value]) => (
        <View key={key} style={styles.field}>
          <Text style={styles.label}>{key.toUpperCase()}</Text>
          <TextInput
            value={value}
            editable={edit}
            onChangeText={(t) => update(key, t)}
            style={[styles.input, !edit && styles.disabled]}
          />
        </View>
      ))}

      {!edit ? (
        <TouchableOpacity style={styles.btn} onPress={() => setEdit(true)}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#000" }]}
            onPress={() => setEdit(false)}
          >
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#999" }]}
            onPress={() => setEdit(false)}
          >
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: "800", marginBottom: 20 },
  field: { marginBottom: 14 },
  label: { fontSize: 12, color: "#666", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: "#ccc",
  },
  disabled: { backgroundColor: "#eee" },
  btn: {
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#C62828",
    flex: 1,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
