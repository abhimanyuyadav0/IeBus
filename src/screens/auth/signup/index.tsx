import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '../../../api/services/user';

const SignUpScreen = ({ navigation }:any) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNo: '',
  });

  const mutation:any = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      Alert.alert('Success', 'Account created successfully! Please log in.');
      navigation.navigate('Login'); 
    },
    onError: (error:any) => {
      console.log(error.message)
      const errorMessage = error?.response?.data?.message || 'Something went wrong.';
      Alert.alert('Error', errorMessage);
    },
  });

  const handleInputChange = (name:any, value:any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    const { firstName, lastName, email, password, mobileNo } = formData;
    if (!firstName || !lastName || !email || !password || !mobileNo) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    mutation.mutate(formData); // Pass the form data to the createUser function
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(value) => handleInputChange('firstName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(value) => handleInputChange('lastName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(value) => handleInputChange('password', value)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile No"
        value={formData.mobileNo}
        onChangeText={(value) => handleInputChange('mobileNo', value)}
        keyboardType="phone-pad"
      />
      {mutation.isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Sign Up" onPress={handleSignUp} />
      )}
      <Button
        title="Already have an account? Log In"
        onPress={() => navigation.navigate('Login')} // Navigate to the Login screen
        color="#007BFF"
      />
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
});

export default SignUpScreen;
