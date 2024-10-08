import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Card, Grid, GridItem } from '../../component/library';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getOrders, deleteOrder } from '../../api/services/orders';
import {CustomButton} from '../../component';
import { COLORS } from '../../constants/colors';

interface Order {
  id: string;
  name: string;
  busName: string;
  departure: string;
  arrival: string;
  price: string;
}

const OrdersScreen = ({ navigation }: any) => {
  const {
    data,
    isLoading: loading, // `isPending` is not a valid property of useQuery, changed to `isLoading`
    refetch,
  } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteOrder(id),  // Equivalent to the queryFn pattern
    onSuccess: () => {
      Alert.alert('Success', 'Order deleted successfully');
      refetch(); // Refresh the data after deletion
    },
    onError: (error: any) => {
      Alert.alert('Error', error?.message || 'An error occurred');
    },
  });
  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this order?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteMutation.mutate(id),
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: Order }) => (
    <Grid>
      <GridItem span={12}>
        <Card title={item.name}>
          <View style={styles.ticketWrapper}>
            <Text>{item.busName}</Text>
            <Grid>
              <GridItem span={6}>
                <Text>Departure: {item.departure}</Text>
              </GridItem>
              <GridItem span={6}>
                <Text>Arrival: {item.arrival}</Text>
              </GridItem>
            </Grid>
            <Text>Price: {item.price}</Text>
            <CustomButton
              title="Danger Large"
              onPress={() => handleDelete(item.id)}
              color="danger"
              fullWidth
            />
          </View>
        </Card>
      </GridItem>
    </Grid>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={styles.header}>Booked Tickets</Text>
          {data?.length ? (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text>No booked tickets available.</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ticketWrapper: {
    padding: 5,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: COLORS.background.danger,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OrdersScreen;
