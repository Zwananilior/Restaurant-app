import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useUser } from "../context/UserContext";

export default function LoginScreen({ navigation }: any) {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const ok = await login(email, password);
    if (!ok) {
      setError("Invalid email or password");
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "800", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, padding: 12, marginBottom: 12, borderRadius: 8 },
  btn: { backgroundColor: "#000", padding: 14, borderRadius: 8 },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "700" },
  link: { marginTop: 16, textAlign: "center", fontWeight: "600" },
  error: { color: "red", textAlign: "center", marginBottom: 10 },
});
