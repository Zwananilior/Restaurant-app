import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNavigation from "./RootNavigation";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../auth/LoginScreen";
import SignupScreen from "../auth/SignupScreen";

import MessagesScreen from "../screens/account/MessagesScreen";
import OrderHistoryScreen from "../screens/account/OrderHistoryScreen";
import AccountSettingsScreen from "../screens/account/AccountSettingsScreen";
import FavouritesScreen from "../screens/account/FavouritesScreen";
import AddressScreen from "../screens/account/AddressScreen";

import CheckoutScreen from "../screens/cart/CheckoutScreen";
import PaymentScreen from "../screens/PaymentScreen";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import ViewItemScreen from "../screens/menu/ViewItemScreen";
import OrderSuccessScreen from "../screens/cart/OrderSuccessScreen";

import AdminFoodScreen from "../screens/admin/AdminFoodScreen";



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />

      <Stack.Screen name="MainTabs" component={RootNavigation} />

      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />

      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />

<Stack.Screen
  name="AdminFood"
  component={AdminFoodScreen}
/>
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
	  <Stack.Screen name="ViewItem" component={ViewItemScreen} />
	  <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen}
/>

	  
    </Stack.Navigator>
  );
}
