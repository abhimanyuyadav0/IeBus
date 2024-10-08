import React, { useState } from 'react';
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
import { useQuery } from '@tanstack/react-query'; // Import useQuery from TanStack
import { getBuses } from '../../api/services/buses'; // Import the API function
import { getLocations } from '../../api/services/locations';

const BusScreen = ({ navigation }: any) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);

  // Example of provided locations
  const allLocations = {
    locations: [
      { name: 'Mumbai' },
      { name: 'Pune' },
      { name: 'Nashik' },
      { name: 'Lonavala' },
      { name: 'Shambhaji Nagar' },
    ],
  };

  // Fetch buses using TanStack Query
  const {
    data,
    isLoading,
    refetch,
  } = useQuery<any>({
    queryKey: ['orders'],
    queryFn: getBuses,
  });

  const searchBuses = () => {
    if (!data?.buses) return [];
    return data.buses.filter((bus: any) => {
      const fromMatch = bus.from.toLowerCase() === fromLocation.toLowerCase();
      const toMatch = bus.to.toLowerCase() === toLocation.toLowerCase();
      const isIntermediateStop = bus.stops.some(
        (stop: any) => stop.toLowerCase() === toLocation.toLowerCase(),
      );

      return (fromMatch && toMatch) || (fromMatch && isIntermediateStop);
    });
  };

  const filterSuggestions = (input: string, type: 'from' | 'to') => {
    const filtered = allLocations.locations
      ?.filter((location) =>
        location.name.toLowerCase().includes(input.toLowerCase())
      )
      .map((location) => location.name);

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

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

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
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSuggestionSelect(item, 'from')}
              >
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
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSuggestionSelect(item, 'to')}
              >
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
                    navigation.navigate(ROUTES.SEATSELECTION, { bus });
                  }}
                >
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  busItem: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
  },
  bookButton: {
    color: 'green',
    marginTop: 10,
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    maxHeight: 100,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default BusScreen;
