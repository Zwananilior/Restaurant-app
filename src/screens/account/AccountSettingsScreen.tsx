import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useUser } from "../../context/UserContext";

export default function AccountSettingsScreen() {
  const { profile, setProfile } = useUser();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile!);

  const save = () => {
    setProfile(form);
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ACCOUNT SETTINGS</Text>

      <TextInput
        editable={editing}
        value={form.firstName}
        style={styles.input}
        onChangeText={t => setForm({ ...form, firstName: t })}
      />

      <TextInput
        editable={editing}
        value={form.lastName}
        style={styles.input}
        onChangeText={t => setForm({ ...form, lastName: t })}
      />

      <TextInput editable={false} value={form.email} style={styles.input} />

      {!editing ? (
        <TouchableOpacity onPress={() => setEditing(true)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={save}>
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 20 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 12 },
  edit: { color: "red", fontWeight: "700" },
  save: { color: "green", fontWeight: "700" },
});
