import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {getUsers} from '../../api/services/user';
import {Card, Grid, GridItem} from '../../component/library';
import { ROUTES } from '../../constants/routes';

const UserScreen = ({navigation}: any) => {
  const {
    data,
    isPending: loading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  return (
    <View style={styles.container}>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : isError ? (
          <Text>Error fetching users, please try again later.</Text>
        ) : (
          <Grid>
            {data?.users?.map((user: any) => (
              <GridItem key={user._id} span={12}>
                <Card
                onPress={()=>navigation.replace(ROUTES.DASHBOARD)}
                  title={
                    user.firstName || user.lastName
                      ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                      : 'NA'
                  }>
                  <View>
                    <Text>{user.email}</Text>
                  </View>
                </Card>
              </GridItem>
            ))}
          </Grid>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: '#ccc',
    padding: 20,
    textAlign: 'center',
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pulse: {
    position: 'absolute',
  },
});

export default UserScreen;
