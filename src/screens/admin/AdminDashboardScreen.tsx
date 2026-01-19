import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";

type Order = {
  id: string;
  total: number;
  date: string;
  viewedByAdmin?: boolean;
};

export default function AdminDashboardScreen() {
  const { profile, logout } = useUser();
  const navigation = useNavigation<any>();

  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  if (!profile || !profile.email.endsWith("@admin.com")) {
    return (
      <View style={styles.center}>
        <Text style={{ fontWeight: "800" }}>ACCESS DENIED</Text>
      </View>
    );
  }

  /* ---------- LOAD & CLEAR ORDER BADGE ---------- */
  const loadOrders = async () => {
    const data = await AsyncStorage.getItem("ORDERS");
    if (!data) return;

    const updated = JSON.parse(data).map((o: Order) => ({
      ...o,
      viewedByAdmin: true,
    }));

    await AsyncStorage.setItem("ORDERS", JSON.stringify(updated));
    setOrders(updated);
  };

  /* ---------- SEND MESSAGE ---------- */
  const sendMessage = async () => {
  if (!message.trim()) {
    Alert.alert("Error", "Message empty");
    return;
  }

  // Get all users
  const usersRaw = await AsyncStorage.getItem("USERS");
  const users = usersRaw ? JSON.parse(usersRaw) : [];

  const msg = {
    id: Date.now().toString(),
    from: "Admin",
    body: message,
    date: new Date().toLocaleString(),
    read: false,
  };

  // Send to EACH USER (not admin)
  for (const user of users) {
    if (user.role !== "admin") {
      const key = `MESSAGES_${user.email}`;
      const existing = await AsyncStorage.getItem(key);
      const msgs = existing ? JSON.parse(existing) : [];

      msgs.unshift(msg);
      await AsyncStorage.setItem(key, JSON.stringify(msgs));
    }
  }

  setMessage("");
  Alert.alert("Sent", "Message sent to all users");
};


  /* ---------- PAGES ---------- */

  const OrdersPage = () => (
    <View style={styles.card}>
      <Text style={styles.header}>Orders</Text>
      <Text>Total Orders: {orders.length}</Text>

      {orders.slice(0, 5).map(o => (
        <Text key={o.id}>
          • R{o.total.toFixed(2)} — {o.date}
        </Text>
      ))}
    </View>
  );

  /* ---------- REAL BAR CHART ---------- */
  const ChartsPage = () => {
    const max = Math.max(...orders.map(o => o.total), 1);

    return (
      <View style={styles.card}>
        <Text style={styles.header}>Revenue Chart</Text>

        {orders.slice(0, 6).map((o, i) => (
          <View key={i} style={styles.chartRow}>
            <View
              style={[
                styles.bar,
                { width: `${(o.total / max) * 100}%` },
              ]}
            />
            <Text style={styles.barText}>R{o.total.toFixed(0)}</Text>
          </View>
        ))}

        <Text style={{ marginTop: 10 }}>
          Total Revenue: R
          {orders.reduce((s, o) => s + o.total, 0).toFixed(2)}
        </Text>
      </View>
    );
  };

  const MessagesPage = () => (
    <View style={styles.card}>
      <Text style={styles.header}>Send Message</Text>

      <TextInput
        placeholder="Type message"
        value={message}
        onChangeText={setMessage}
        style={styles.input}
        multiline
      />

      <TouchableOpacity style={styles.btn} onPress={sendMessage}>
        <Text style={styles.btnText}>Send</Text>
      </TouchableOpacity>
    </View>
  );

const handleLogout = async () => {
  await logout();

  navigation.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });
};


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.header}>Admin</Text>
        <Text>{profile.email}</Text>
      </View>

      {page === 0 && <OrdersPage />}
      {page === 1 && <ChartsPage />}
      {page === 2 && <MessagesPage />}

      <TouchableOpacity
        style={styles.nextBtn}
        onPress={() => setPage((page + 1) % 3)}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>

       <TouchableOpacity
  style={styles.nextBtn}
  onPress={() => navigation.navigate("AdminFood")}
>
  <Text style={styles.nextText}>Manage Foods</Text>
</TouchableOpacity>


      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 16 },
  card: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  header: { fontWeight: "800", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#C62828",
    padding: 12,
    borderRadius: 10,
  },
  btnText: { color: "#FFF", textAlign: "center", fontWeight: "700" },
  nextBtn: {
    backgroundColor: "#1976D2",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
  },
  nextText: { color: "#FFF", textAlign: "center", fontWeight: "800" },
  logoutBtn: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 12,
  },
  logoutText: { color: "#FFF", textAlign: "center", fontWeight: "800" },
  chartRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bar: {
    height: 14,
    backgroundColor: "#1976D2",
    borderRadius: 6,
    marginRight: 8,
  },
  barText: { fontWeight: "600" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
