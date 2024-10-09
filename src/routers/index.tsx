import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/dashboard';
import {ROUTES} from '../constants/routes';
import {LoginScreen, SignUpScreen} from '../screens/auth';
import UserScreen from '../screens/users';
import BusScreen from '../screens/buses';
import BookingScreen from '../screens/booking';
import OrdersScreen from '../screens/orders';
import PaymentScreen from '../screens/payment';
import ConfirmationScreen from '../screens/confirmPayment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from '../component/header';

const Stack = createNativeStackNavigator();

const AppRouter = () => {

  const getCustomHeader = (navigation: any, title: string, headerBackVisible = true) => {
    return () => (
      <CustomHeader title={title} navigation={navigation} headerBackVisible={headerBackVisible} />
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.LOGIN}>
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={LoginScreen}
          options={{
            headerShown: false, // No header for the login screen
            headerBackVisible: false, // Ensure no back button
          }}
        />
        <Stack.Screen
          name={ROUTES.SIGNUP}
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ROUTES.CONFIRMATION}
          component={ConfirmationScreen}
          options={{header: ({navigation}) => getCustomHeader(navigation, 'Payment Confirmed')()}}
        />
        <Stack.Screen
          name={ROUTES.DASHBOARD}
          component={Dashboard}
          options={({navigation}) => ({
            header: getCustomHeader(navigation, 'Welcome to eBus',false),
          })}
        />
        <Stack.Screen
          name={ROUTES.USERS}
          component={UserScreen}
          options={({navigation}) => ({
            header: getCustomHeader(navigation, 'Users'),
          })}
        />
        <Stack.Screen
          name={ROUTES.BUS}
          component={BusScreen}
          options={({navigation}) => ({
            header: getCustomHeader(navigation, 'Buses'),
          })}
        />
        <Stack.Screen
          name={ROUTES.BOOKING}
          component={BookingScreen}
          options={({navigation}) => ({
            header: getCustomHeader(navigation, 'Booking'),
          })}
        />
        <Stack.Screen
          name={ROUTES.ORDERS}
          component={OrdersScreen}
          options={({navigation}) => ({
            header: getCustomHeader(navigation, 'Your Orders'),
          })}
        />
        <Stack.Screen
          name={ROUTES.PAYMENT}
          component={PaymentScreen}
          options={({navigation}) => ({
            header: getCustomHeader(navigation, 'Payment'),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
