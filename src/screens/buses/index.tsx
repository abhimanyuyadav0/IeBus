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
} from 'react-native';
import { ROUTES } from '../../constants/routes';
import { Card, Grid, GridItem } from '../../component/library';
import { useQuery } from '@tanstack/react-query';
import { getBuses } from '../../api/services/buses';
import { getLocations } from '../../api/services/locations';

const BusScreen = ({navigation}: any) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);

  // Fetch buses using TanStack Query
  const {
    data: busData,
    isLoading: loadingBuses
  } = useQuery<any>({
    queryKey: ['buses'],
    queryFn: getBuses,
  });

  const {
    data: allLocations,
    isLoading: loadingLocations
  } = useQuery<any>({
    queryKey: ['orders'],
    queryFn: getLocations,
  });
  // Loading state for both queries
  if (loadingBuses || loadingLocations) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const searchBuses = () => {
    if (!busData?.buses) return [];
    return busData.buses.filter((bus: any) => {
  console.log(bus)
      const fromMatch = bus.from.toLowerCase() === fromLocation.toLowerCase();
      const toMatch = bus.to.toLowerCase() === toLocation.toLowerCase();
      const isIntermediateStop = bus.stops.some((stop:any) => stop.toLowerCase() === toLocation.toLowerCase());

      return (fromMatch && toMatch) || (fromMatch && isIntermediateStop);
    });
  };

  const filterSuggestions = (input: string, type: 'from' | 'to') => {
    const filtered = allLocations.locations
      .filter((location:any) => location.name.toLowerCase().includes(input.toLowerCase()))
      .map((location:any) => location.name);

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
      <Text style={styles.header}>Bus List</Text>
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
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSuggestionSelect(item, 'from')}>
                <Text style={styles.suggestionItem}>{item}</Text>
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
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSuggestionSelect(item, 'to')}>
                <Text style={styles.suggestionItem}>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsContainer}
          />
        )}

        <Button title="Search" onPress={searchBuses} />
      </View>

      <Grid>
        {filteredBuses.map((bus: any, index: number) => (
          <GridItem key={index} span={6}>
            <Card title={bus.name} onPress={() => {}}>
              <View style={styles.busItem}>
                <Text>Departure: {bus.departure}</Text>
                <Text>Arrival: {bus.arrival}</Text>
                <Text>Price: {bus.price}</Text>
                <TouchableNativeFeedback
                  onPress={() => {
                    navigation.navigate(ROUTES.SEATSELECTION, {bus});
                  }}>
                  <Text style={styles.bookButton}>Book Now</Text>
                </TouchableNativeFeedback>
              </View>
            </Card>
          </GridItem>
        ))}
      </Grid>
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
    marginBottom: 10,
  },
  searchContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  busItem: {
    backgroundColor: COLORS.background.secondary,
    padding: 5,
    borderRadius: 5,
  },
  bookButton: {
    color: COLORS.success,
    marginTop: 10,
  },
  suggestionsContainer: {
    backgroundColor: COLORS.background.primary,
    borderColor: COLORS.background.secondary,
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
    borderBottomColor: COLORS.background.secondary,
  },
});

export default BusScreen;
