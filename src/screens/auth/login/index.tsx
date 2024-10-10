import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useMutation, useQuery} from '@tanstack/react-query';
import {getUsers, loginUser} from '../../../api/services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ROUTES} from '../../../constants/routes';
import {ThemeColors} from '../../../theme/themeTypes';
import {useTheme} from '../../../theme';
import {CustomButton, CustomText, CustomTextInput} from '../../../component';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const [formData, setFormData] = useState<{email: string; password: string}>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingUserCheck, setLoadingUserCheck] = useState(true); // Loading state

  useEffect(() => {
    const checkUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      setLoadingUserCheck(false); // Stop loading
      if (userData) {
        navigation.replace(ROUTES.DASHBOARD);
      }
    };
    checkUserData();
  }, [navigation]);

  const mutation: any = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data: any) => {
      console.log('Login complete', data);
      await AsyncStorage.setItem('userData', JSON.stringify(data));

      setErrorMessage(null);
      navigation.replace(ROUTES.DASHBOARD);
    },
    onError: () => {
      Alert.alert('Error', 'Something went wrong, please try again');
    },
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    const {email, password} = formData;
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    mutation.mutate({email, password});
  };

  if (loadingUserCheck) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <CustomText style={styles.title}>Login</CustomText>
        <CustomTextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={value => handleInputChange('email', value)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <CustomTextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={value => handleInputChange('password', value)}
          secureTextEntry
        />
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        {mutation.isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <CustomButton fullWidth color='secondary' title="Login" onPress={handleLogin} />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomText>Don't have an account? </CustomText>
          <CustomButton
            variant="link"
            title="Sign Up"
            onPress={() => navigation.navigate(ROUTES.SIGNUP)}
          />
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 10,
      backgroundColor: theme.background.primary,
    },
    title: {
      fontSize: 24,
      marginBottom: 24,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
      borderRadius: 4,
    },
    userContainer: {
      marginBottom: 10,
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 10,
    },
  });

export default LoginScreen;
