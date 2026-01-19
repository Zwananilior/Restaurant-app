import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "USER_PROFILE";

export const saveUserProfile = async (data: any) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
};

export const getUserProfile = async () => {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};
