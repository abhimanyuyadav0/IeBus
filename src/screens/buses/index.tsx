import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {ROUTES} from '../../constants/routes';
import {Card, Grid, GridItem} from '../../component/library';
import {useQuery} from '@tanstack/react-query';
import {getBuses} from '../../api/services/buses';
import {getLocations} from '../../api/services/locations';
import {COLORS} from '../../constants/colors';
import {formatDateTime} from '../../utils/dateFormater';
import {CustomButton, CustomText} from '../../component';
import { useTheme } from '../../theme';
import { ThemeColors } from '../../theme/themeTypes';

const BusScreen = ({navigation}: any) => {
  const {theme} = useTheme(); 
  const styles = createStyles(theme);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);

  const {data: busData, isLoading: loadingBuses} = useQuery<any>({
    queryKey: ['buses'],
    queryFn: getBuses,
    refetchOnWindowFocus:true
  });

  const {data: allLocations, isLoading: loadingLocations} = useQuery<any>({
    queryKey: ['locations'],
    queryFn: getLocations,
  });

  if (loadingBuses || loadingLocations) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const locationMap = allLocations.locations.reduce(
    (acc: any, location: any) => {
      acc[location._id] = location.name;
      return acc;
    },
    {},
  );

  const searchBuses = () => {
    if (!busData?.buses) return [];

    return busData.buses.filter((bus: any) => {
      const fromMatch =
        !fromLocation ||
        locationMap[bus.from._id]
          ?.toLowerCase()
          .includes(fromLocation.toLowerCase());

      const toMatch =
        !toLocation ||
        locationMap[bus.to._id]
          ?.toLowerCase()
          .includes(toLocation.toLowerCase());

      const isIntermediateStop = bus.stops.some((stop: any) =>
        locationMap[stop._id]?.toLowerCase().includes(toLocation.toLowerCase()),
      );

      return (fromMatch && toMatch) || (fromMatch && isIntermediateStop);
    });
  };

  const filterSuggestions = (input: string, type: 'from' | 'to') => {
    const filtered = allLocations.locations
      .filter((location: any) =>
        location.name.toLowerCase().includes(input.toLowerCase()),
      )
      .map((location: any) => location.name);

    if (type === 'from') {
      setFromSuggestions(filtered);
    } else {
      setToSuggestions(filtered);
    }
  };

  const handleFromChange = (text: string) => {
    setFromLocation(text);
    filterSuggestions(text, 'from');
  };

  const handleToChange = (text: string) => {
    setToLocation(text);
    filterSuggestions(text, 'to');
  };

  const handleSuggestionSelect = (location: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setFromLocation(location);
      setFromSuggestions([]);
    } else {
      setToLocation(location);
      setToSuggestions([]);
    }
  };

  const filteredBuses = searchBuses();

  return (
    <View style={styles.container}>
      <CustomText style={styles.header}>Bus List</CustomText>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="From"
          value={fromLocation}
          onChangeText={handleFromChange}
        />
        {fromSuggestions.length > 0 && (
          <FlatList
            data={fromSuggestions}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSuggestionSelect(item, 'from')}>
                <CustomText style={styles.suggestionItem}>{item}</CustomText>
              </TouchableOpacity>
            )}
            style={styles.suggestionsContainer}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="To"
          value={toLocation}
          onChangeText={handleToChange}
        />
        {toSuggestions.length > 0 && (
          <FlatList
            data={toSuggestions}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSuggestionSelect(item, 'to')}>
                <CustomText style={styles.suggestionItem}>{item}</CustomText>
              </TouchableOpacity>
            )}
            style={styles.suggestionsContainer}
          />
        )}

        <Button title="Search" onPress={searchBuses} />
      </View>

      <ScrollView>
        {filteredBuses.length > 0 ? (
          <Grid>
            {filteredBuses.map((bus: any, index: number) => {
              const formattedDeparture = formatDateTime(bus.departure);
              const formattedArrival = formatDateTime(bus.arrival);
              return (
                <GridItem key={index} span={12}>
                  <Card title={bus.name} onPress={() => {}}>
                    <View style={styles.busItem}>
                      <CustomText>
                        Departure: {formattedDeparture.date}{' '}
                        {formattedDeparture.time}
                      </CustomText>
                      <CustomText>
                        Arrival: {formattedArrival.date} {formattedArrival.time}
                      </CustomText>
                      <CustomText>Price: {bus.price}</CustomText>
                      <CustomText>From: {locationMap[bus.from._id]}</CustomText>
                      <CustomText>To: {locationMap[bus.to._id]}</CustomText>
                      <CustomText>
                        Stops:{' '}
                        {bus.stops
                          .map((stop: any) => locationMap[stop._id])
                          .join(', ')}
                      </CustomText>
                      <View style={{alignItems: 'flex-end'}}>
                        <CustomButton
                          title="Book Now"
                          onPress={() => {
                            navigation.navigate(ROUTES.BOOKING, {bus});
                          }}
                          size="small"
                        />
                      </View>
                    </View>
                  </Card>
                </GridItem>
              );
            })}
          </Grid>
        ) : (
          <CustomText style={styles.header}>No Bus found</CustomText>
        )}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.background.primary
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: theme.secondary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  busItem: {
    backgroundColor: theme.background.secondary,
    padding: 5,
    borderRadius: 5,
  },
  bookButton: {
    color: theme.success,
    marginTop: 10,
  },
  suggestionsContainer: {
    backgroundColor: theme.background.primary,
    borderColor: theme.background.secondary,
    borderWidth: 1,
    maxHeight: 100,
    marginBottom: 10,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.background.secondary,
  },
});

export default BusScreen;
