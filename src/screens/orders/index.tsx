import React, {useEffect, useState} from 'react';
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
import {CustomButton, CustomText} from '../../component';
import {formatDateTime} from '../../utils/dateFormater';
import {getUser} from '../../utils/getUser';
import {ThemeColors} from '../../theme/themeTypes';
import {useTheme} from '../../theme';
import CustomAlert from '../../component/customAlert';

const OrdersScreen = ({navigation}: any) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUserId(user._id || '670125742ccb782ab8bce842');
    };

    fetchUser();
  }, []);

  const {
    data,
    isLoading: loading,
    refetch,
  } = useQuery<any>({
    queryKey: ['orders'],
    queryFn: () => getOrders(userId),
    enabled: !!userId,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteOrder(id),
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
        <Card title={item?.name}>
          <View style={styles.ticketWrapper}>
            <CustomText>{item?.bus?.name}</CustomText>
            <Grid>
              <GridItem span={6}>
                <CustomText color="secondary">
                  Departure: {formatDateTime(item.bus?.departure).time}
                </CustomText>
              </GridItem>
              <GridItem span={6}>
                <CustomText color="secondary">
                  Arrival: {formatDateTime(item.bus?.arrival).time}
                </CustomText>
              </GridItem>
              <GridItem span={6}>
                <CustomText color="secondary">
                  Price: {item.totalPrice}
                </CustomText>
              </GridItem>
            </Grid>
            <View style={{alignItems: 'flex-end'}}>
              <CustomButton
                title="Delete"
                onPress={() => handleDelete(item._id)}
                color="danger"
                size="small"
              />
            </View>
          </View>
        </Card>
      </GridItem>
    </Grid>
  );

  return (
    <View style={styles.container}>
      {/* <CustomAlert
        visible={true}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        onClose={()=>{}}
        buttons={[]}
      /> */}
      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} />
      ) : (
        <ScrollView>
          <CustomText style={styles.header}>Booked Tickets</CustomText>
          {data?.order.length ? (
            <FlatList
              data={data?.order.sort(
                (a: any, b: any) =>
                  +new Date(b.updatedAt) - +new Date(a.updatedAt),
              )}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          ) : (
            <CustomText>No booked tickets available.</CustomText>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.background.primary,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.text.primary,
    },
    ticketWrapper: {
      padding: 5,
    },
  });

export default OrdersScreen;
