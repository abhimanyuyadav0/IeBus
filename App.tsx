import {View, Text} from 'react-native';
import React from 'react';
import AppRouter from './src/routers';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ThemeProvider from './src/theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <View style={{flex: 1}}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </ThemeProvider>
    </View>
  );
};

export default App;
