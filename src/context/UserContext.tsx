import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ---------- TYPES ---------- */

type Order = {
  id: string;
  items: any[];
  total: number;
  date: string;
};

type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "admin" | "user";
};

type UserContextType = {
  profile: User | null;
  isLoggedIn: boolean;
  orders: Order[];
  favourites: any[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    data: Omit<User, "role" | "password">,
    password: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  addOrder: (order: Order) => Promise<void>;
  toggleFavourite: (item: any) => Promise<void>;
};

/* ---------- CONTEXT ---------- */

const UserContext = createContext<UserContextType>(null as any);

export const UserProvider = ({ children }: any) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favourites, setFavourites] = useState<any[]>([]);

  /* ---------- LOAD USER ON APP START ---------- */
  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem("LOGGED_IN_USER");
      if (!raw) return;

      const user = JSON.parse(raw);
      setProfile(user);
      setIsLoggedIn(true);

      const userOrders = await AsyncStorage.getItem(
        `ORDERS_${user.email}`
      );
      setOrders(userOrders ? JSON.parse(userOrders) : []);

      const favs = await AsyncStorage.getItem(`FAV_${user.email}`);
      setFavourites(favs ? JSON.parse(favs) : []);
    })();
  }, []);

  /* ---------- SIGNUP ---------- */
  const signup = async (
  data: Omit<User, "role" | "password">,
  password: string
): Promise<{ ok: boolean; error?: string }> => {

  if (password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters" };
  }

  const usersRaw = await AsyncStorage.getItem("USERS");
  const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];

  const exists = users.find(u => u.email === data.email);
  if (exists) {
    return { ok: false, error: "Email already exists" };
  }

  const role = data.email.endsWith("@admin.com") ? "admin" : "user";

  const newUser: User = {
    ...data,
    password,
    role,
  };

  users.push(newUser);
  await AsyncStorage.setItem("USERS", JSON.stringify(users));
  await AsyncStorage.setItem("LOGGED_IN_USER", JSON.stringify(newUser));

  setProfile(newUser);
  setIsLoggedIn(true);
  setOrders([]);
  setFavourites([]);

  return { ok: true };
};


  /* ---------- LOGIN ---------- */
  const login = async (email: string, password: string) => {
    const usersRaw = await AsyncStorage.getItem("USERS");
    if (!usersRaw) return false;

    const users = JSON.parse(usersRaw);
    const user = users.find(
      (u: User) => u.email === email && u.password === password
    );

    if (!user) return false;

    await AsyncStorage.setItem("LOGGED_IN_USER", JSON.stringify(user));
    setProfile(user);
    setIsLoggedIn(true);

    const userOrders = await AsyncStorage.getItem(`ORDERS_${email}`);
    setOrders(userOrders ? JSON.parse(userOrders) : []);

    const favs = await AsyncStorage.getItem(`FAV_${email}`);
    setFavourites(favs ? JSON.parse(favs) : []);

    return true;
  };

  /* ---------- ADD ORDER (USER + ADMIN) ---------- */
  const addOrder = async (order: Order) => {
    if (!profile || profile.role === "admin") return;

    /* USER ORDERS */
    const updatedUserOrders = [order, ...orders];
    setOrders(updatedUserOrders);

    await AsyncStorage.setItem(
      `ORDERS_${profile.email}`,
      JSON.stringify(updatedUserOrders)
    );

    /* ADMIN GLOBAL ORDERS */
    const adminRaw = await AsyncStorage.getItem("ORDERS");
    const adminOrders = adminRaw ? JSON.parse(adminRaw) : [];

    adminOrders.unshift({
      ...order,
      user: profile.email,
    });

    await AsyncStorage.setItem("ORDERS", JSON.stringify(adminOrders));
  };

  /* ---------- FAVOURITES ---------- */
  const toggleFavourite = async (item: any) => {
    if (!profile) return;

    const exists = favourites.find(f => f.id === item.id);
    const updated = exists
      ? favourites.filter(f => f.id !== item.id)
      : [...favourites, item];

    setFavourites(updated);
    await AsyncStorage.setItem(
      `FAV_${profile.email}`,
      JSON.stringify(updated)
    );
  };

  /* ---------- LOGOUT ---------- */
  const logout = async () => {
    await AsyncStorage.removeItem("LOGGED_IN_USER");
    setProfile(null);
    setIsLoggedIn(false);
    setOrders([]);
    setFavourites([]);
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        isLoggedIn,
        orders,
        favourites,
        login,
        signup,
        logout,
        addOrder,
        toggleFavourite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
