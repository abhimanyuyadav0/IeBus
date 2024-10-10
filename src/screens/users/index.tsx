import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {getUsers} from '../../api/services/user';
import {Card, Grid, GridItem} from '../../component/library';
import {ROUTES} from '../../constants/routes';
import {useTheme} from '../../theme';
import {ThemeColors} from '../../theme/themeTypes';
import icons from '../../assets/icons'; // Ensure this path is correct

const UserScreen = ({navigation}: any) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
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
          <ActivityIndicator size="large" color={theme.primary} />
        ) : isError ? (
          <Text style={styles.errorText}>
            Error fetching users, please try again later.
          </Text>
        ) : (
          <Grid>
            {data?.users?.map((user: any) => (
              <GridItem key={user._id} span={12}>
                <Card onPress={() => navigation.replace(ROUTES.DASHBOARD)} style={{marginBottom:4}}>
                  <Grid>
                    <GridItem span={3}>
                      <icons.user theme={theme} width={70} height={70} />
                    </GridItem>
                    <GridItem span={9}>
                      <Text style={styles.userEmail}>
                        {user.firstName || user.lastName
                          ? `${user.firstName || ''} ${
                              user.lastName || ''
                            }`.trim()
                          : 'NA'}
                      </Text>
                      <Text style={styles.userEmail}>{user.email}</Text>
                    </GridItem>
                  </Grid>
                </Card>
              </GridItem>
            ))}
          </Grid>
        )}
      </View>
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
    errorText: {
      color: theme.error,
      textAlign: 'center',
      marginVertical: 20,
    },
    userEmail: {
      color: theme.text.primary,
    },
  });

export default UserScreen;
