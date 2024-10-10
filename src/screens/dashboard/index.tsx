import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, Grid, GridItem} from '../../component/library';
import {ROUTES} from '../../constants/routes';
import {useTheme} from '../../theme';
import {ThemeColors} from '../../theme/themeTypes';
import icons from '../../assets/icons';
import { CustomButton } from '../../component';

const Dashboard = ({navigation}: any) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const dashboardOptions = [
    {
      title: 'Users',
      url: ROUTES.USERS,
      icon: <icons.usersGroup theme={theme} width={50} height={50} />,
    },
    {
      title: 'Bus',
      url: ROUTES.BUS,
      icon: <icons.busIcon theme={theme} width={50} height={50} />,
    },
    {
      title: 'Your Orders',
      url: ROUTES.ORDERS,
      icon: <icons.orderIcon theme={theme} width={50} height={50} />,
    },
  ];
  
  // const handlePostCities = async () => {
  //   for (const city of maharashtraCities) {
  //     try {
  //       const response = await fetch('https://elite-mix-437808-u8.de.r.appspot.com/v1/locations', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ name: city }),
  //       });

  //       const data = await response.json();
  //       console.log(`Added city: ${city}`, data);
  //     } catch (error) {
  //       console.error(`Error adding city ${city}:`, error);
  //     }
  //   }
  // };
  return (
    <View style={styles.container}>
      <Grid>
        {dashboardOptions.map((item, index) => (
          <GridItem key={index} span={12}>
            <Card onPress={() => navigation.navigate(item.url)}>
              <Grid>
                <GridItem span={2}>{item.icon}</GridItem>
                <GridItem span={10}>
                  <Text style={styles.item}>{item.title}</Text>
                </GridItem>
              </Grid>
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
      backgroundColor: theme.background.primary,
    },
    item: {
      padding: 20,
      textAlign: 'center',
      color: theme.text.primary,
    },
  });

export default Dashboard;
