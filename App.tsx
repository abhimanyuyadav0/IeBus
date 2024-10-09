import {View, Text} from 'react-native';
import React from 'react';
import AppRouter from './src/routers';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ThemeProvider from './src/theme';
import {ToastProvider} from 'react-native-toast-notifications';
import { Toast } from './src/component';

const queryClient = new QueryClient();

const App = () => {
  return (
    <View style={{flex: 1}}>
      <ThemeProvider>
        <ToastProvider
          placement="top"
          duration={5000}
          animationType="slide-in"
          animationDuration={250}
          successColor="green"
          dangerColor="red"
          warningColor="orange"
          normalColor="gray"
          offset={50}
          offsetTop={30}
          offsetBottom={40}
          swipeEnabled={true}
          renderToast={toastOptions => <Toast {...toastOptions}  />}
          >
          <QueryClientProvider client={queryClient}>
            <AppRouter />
          </QueryClientProvider>
        </ToastProvider>
      </ThemeProvider>
    </View>
  );
};

export default App;
