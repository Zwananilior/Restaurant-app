import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../context/UserContext";
import { CommonActions } from "@react-navigation/native";

export default function AccountScreen({ navigation }: any) {
  const { isLoggedIn, logout, profile } = useUser();
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !signedOut) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    }
  }, [isLoggedIn]);

  const handleSignOut = async () => {
    await logout();
    setSignedOut(true);
  };

  /* ---------------- SIGNED OUT SCREEN ---------------- */

  if (signedOut) {
    return (
      <View style={styles.signedOutContainer}>
        <Ionicons
          name="sad-outline"
          size={64}
          color="#C62828"
          style={{ marginBottom: 20 }}
        />

        <Text style={styles.signedOutTitle}>
          You're signed out
        </Text>

        <Text style={styles.signedOutSubtitle}>
          We're gonna miss you.
        </Text>

        <TouchableOpacity
          style={styles.homeBtn}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Home" }],
              })
            )
          }
        >
          <Text style={styles.homeText}>Take me home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            )
          }
        >
          <Text style={styles.loginText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isLoggedIn || !profile) return null;

  /* ---------------- ACCOUNT SCREEN ---------------- */

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>ACCOUNT</Text>

      <Text style={styles.name}>
        {profile.firstName} {profile.lastName}
      </Text>
      <Text style={styles.email}>{profile.email}</Text>

      <TouchableOpacity style={styles.signOut} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <Row title="Messages" onPress={() => navigation.navigate("Messages")} />
      <Row
        title="Order History"
        onPress={() => navigation.navigate("OrderHistory")}
      />
      <Row
        title="Favourite Orders"
        onPress={() => navigation.navigate("Favourites")}
      />
      <Row
        title="Account Settings"
        onPress={() => navigation.navigate("AccountSettings")}
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.socials}>
          <Ionicons name="logo-instagram" size={26} color="#C13584" />
          <Ionicons name="logo-facebook" size={26} color="#1877F2" />
          <Ionicons name="logo-youtube" size={26} color="#FF0000" />
        </View>

        <Text style={styles.footerText}>
          © Nthabi Black 2021. All rights reserved.
        </Text>
        <Text style={styles.version}>Version 2576</Text>
      </View>
    </ScrollView>
  );
}

/* ---------------- ROW ---------------- */

function Row({ title, onPress }: any) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={styles.rowText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} />
    </TouchableOpacity>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    paddingBottom: 40,
  },

  header: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginVertical: 20,
  },

  name: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

  email: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },

  signOut: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },

  signOutText: {
    color: "red",
    textAlign: "center",
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },

  rowText: {
    fontSize: 16,
    fontWeight: "600",
  },

  /* FOOTER */
  footer: {
    marginTop: 40,
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#EEE",
  },

  socials: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
  },

  footerText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },

  version: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },

  /* SIGNED OUT */
  signedOutContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  signedOutTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 6,
  },

  signedOutSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },

  homeBtn: {
    backgroundColor: "#C62828",
    padding: 14,
    borderRadius: 10,
    width: "100%",
    marginBottom: 12,
  },

  homeText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "700",
  },

  loginBtn: {
    borderWidth: 1,
    borderColor: "#C62828",
    padding: 14,
    borderRadius: 10,
    width: "100%",
  },

  loginText: {
    color: "#C62828",
    textAlign: "center",
    fontWeight: "700",
  },
});
