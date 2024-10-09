import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData; // Access userId from userData
    }
  } catch (error) {
    console.error('Error retrieving userId:', error);
  }
  return null; 
};