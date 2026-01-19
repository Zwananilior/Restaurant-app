import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../context/UserContext";

type Message = {
  id: string;
  from: string;
  body: string;
  date: string;
  read: boolean;
};

export default function MessagesScreen() {
  const { profile } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    if (!profile) return;

    const key = `MESSAGES_${profile.email}`;
    const data = await AsyncStorage.getItem(key);
    const msgs: Message[] = data ? JSON.parse(data) : [];

    // MARK ALL AS READ
    const updated = msgs.map(m => ({ ...m, read: true }));
    await AsyncStorage.setItem(key, JSON.stringify(updated));

    setMessages(updated.reverse());
  };

  if (messages.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No messages yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={messages}
      keyExtractor={m => m.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.from}>{item.from}</Text>
          <Text>{item.body}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  from: { fontWeight: "800" },
  date: { marginTop: 6, fontSize: 12, color: "#777" },
});
