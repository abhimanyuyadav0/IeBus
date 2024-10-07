import React, {useState} from 'react';
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
import { ROUTES } from '../../../constants/routes';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [formData, setFormData] = useState<{email: string; password: string}>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mutation: any = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data: any) => {
      console.log('Login complete', data);
      await AsyncStorage.setItem('userData', JSON.stringify(data)); // Assuming the token is part of the response

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
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={value => handleInputChange('email', value)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
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
          <Button title="Login" onPress={handleLogin} />
        )}

        <Button
          title="Don't have an account? Sign Up"
          onPress={() => navigation.navigate('Signup')}
          color="#007BFF"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
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
