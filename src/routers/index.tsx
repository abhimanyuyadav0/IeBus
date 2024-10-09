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
import SeatSelectionScreen from '../screens/booking/seatSelection';
import PaymentScreen from '../screens/payment';
import ConfirmationScreen from '../screens/confirmPayment';

const Stack = createNativeStackNavigator();

const AppRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.LOGIN}>
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={LoginScreen}
          options={{title: 'Login', headerBackVisible: false}}
        />
        <Stack.Screen
          name={ROUTES.SIGNUP}
          component={SignUpScreen}
          options={{title: 'Sign Up'}}
        />
        <Stack.Screen
          name={ROUTES.CONFIRMATION}
          component={ConfirmationScreen}
          options={{title: 'Payment Confirmed'}}
        />
        <Stack.Screen
          name={ROUTES.DASHBOARD}
          component={Dashboard}
          options={{title: 'Welcome to eBus', headerBackVisible: false}}
        />
        <Stack.Screen
          name={ROUTES.USERS}
          component={UserScreen}
          options={{title: 'Users'}}
        />
        <Stack.Screen
          name={ROUTES.BUS}
          component={BusScreen}
          options={{title: 'Buses'}}
        />
        <Stack.Screen
          name={ROUTES.BOOKING}
          component={BookingScreen}
          options={{title: 'Booking'}}
        />
        <Stack.Screen
          name={ROUTES.ORDERS}
          component={OrdersScreen}
          options={{title: 'Your Orders'}}
        />
        <Stack.Screen
          name={ROUTES.PAYMENT}
          component={PaymentScreen}
          options={{title: 'Payment'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
