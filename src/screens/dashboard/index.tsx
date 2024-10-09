import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, Grid, GridItem} from '../../component/library';
import {ROUTES} from '../../constants/routes';
import {useTheme} from '../../theme';
import {ThemeColors} from '../../theme/themeTypes';

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
  const {theme} = useTheme(); 
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
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
  );
};

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.background.primary, // Use theme for background color
    },
    item: {
      padding: 20,
      textAlign: 'center',
      color: theme.text.primary, // Use theme for text color
    },
  });

export default Dashboard;
