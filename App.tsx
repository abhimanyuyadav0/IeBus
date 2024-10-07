import {View, Text} from 'react-native';
import React from 'react';
import AppRouter from './src/routers';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <View style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </View>
  );
};

export default App;
