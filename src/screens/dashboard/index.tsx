import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Card, Grid, GridItem} from '../../component/library';
import {ROUTES} from '../../constants/routes';

const dashboardOptions = [
  {
    title: 'Users',
    url: ROUTES.USERS,
  },
  {
    title: 'Bus',
    url: ROUTES.BUS,
  },
  {
    title: 'Your Orders',
    url: ROUTES.ORDERS,
  },
];

const Dashboard = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Grid>
          {dashboardOptions.map((item, index) => (
            <GridItem key={index} span={6}>
              <Card onPress={() => navigation.navigate(item.url)}>
                <Text style={styles.item}>{item.title}</Text>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 20,
    textAlign: 'center',
  },
});

export default Dashboard;
