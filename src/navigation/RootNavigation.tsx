import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import MenuScreen from "../screens/menu/MenuScreen";
import CartScreen from "../screens/cart/CartScreen";
import AccountScreen from "../screens/account/AccountScreen";
import MessagesScreen from "../screens/account/MessagesScreen";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import { useUser } from "../context/UserContext";

const Tab = createBottomTabNavigator();

export default function RootNavigation() {
  const { profile } = useUser();
  const [unreadCount, setUnreadCount] = useState<number | undefined>();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    if (!profile) return;

    const key = `MESSAGES_${profile.email}`;
    const data = await AsyncStorage.getItem(key);

    if (data) {
      const msgs = JSON.parse(data);
      const unread = msgs.filter((m: any) => !m.read).length;
      setUnreadCount(unread > 0 ? unread : undefined);
    } else {
      setUnreadCount(undefined);
    }
  };

  const isAdmin = profile?.email.endsWith("@admin.com");

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="MenuTab"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
          tabBarBadge: unreadCount,
        }}
      />

      {/* ✅ ADMIN ONLY TAB */}
      {isAdmin && (
        <Tab.Screen
          name="Admin"
          component={AdminDashboardScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="speedometer-outline" size={size} color={color} />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="AccountTab"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
