import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Card, Grid, GridItem} from '../../component/library';
import {useQuery, useMutation} from '@tanstack/react-query';
import {getOrders, deleteOrder} from '../../api/services/orders';
import {CustomButton} from '../../component';
import {COLORS} from '../../constants/colors';
import {formatDateTime} from '../../utils/dateFormater';
import {getUser} from '../../utils/getUser';

const OrdersScreen = ({navigation}: any) => {
  const user: any = getUser();
  console.log('-------------------',user,'-------------------')
  const {
    data,
    isLoading: loading, // `isPending` is not a valid property of useQuery, changed to `isLoading`
    refetch,
  } = useQuery<any>({
    queryKey: ['orders'],
    queryFn: () => getOrders(user._id || '670125742ccb782ab8bce842'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteOrder(id), // Equivalent to the queryFn pattern
    onSuccess: () => {
      Alert.alert('Success', 'Order deleted successfully');
      refetch();
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
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteMutation.mutate(id),
        },
      ],
    );
  };

  const renderItem = ({item}: any) => (
    <Grid>
      <GridItem span={12}>
        <Card title={item.name}>
          <View style={styles.ticketWrapper}>
            <Text>{item.bus.name}</Text>
            <Grid>
              <GridItem span={6}>
                <Text>
                  Departure: {formatDateTime(item.bus.departure).time}
                </Text>
              </GridItem>
              <GridItem span={6}>
                <Text>Arrival: {formatDateTime(item.bus.arrival).time}</Text>
              </GridItem>
            </Grid>
            <Text>Price: {item.totalPrice}</Text>
            <CustomButton
              title="Delete"
              onPress={() => handleDelete(item._id)}
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
        <ScrollView>
          <Text style={styles.header}>Booked Tickets</Text>
          {data?.order.length ? (
            <FlatList
              data={data?.order}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text>No booked tickets available.</Text>
          )}
        </ScrollView>
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
