import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { UserProvider } from "./src/context/UserContext";
import { CartProvider } from "./src/context/CartContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
   <StripeProvider publishableKey ="">
   <NavigationContainer>
      <UserProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </UserProvider>
    </NavigationContainer>
   </StripeProvider>

  );
}
