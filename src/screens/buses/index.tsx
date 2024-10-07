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
} from 'react-native';
import {ROUTES} from '../../constants/routes';
import {Card, Grid, GridItem} from '../../component/library';

// Sample bus data
const busesData = [
  {
    id: 1,
    name: 'Bus A',
    departure: '10:00 AM',
    arrival: '2:00 PM',
    price: '$20',
    from: 'Mumbai',
    to: 'Pune',
    stops: ['Lonavala', 'Shambhaji Nagar'],
  },
  {
    id: 2,
    name: 'Bus B',
    departure: '1:00 PM',
    arrival: '5:00 PM',
    price: '$25',
    from: 'Pune',
    to: 'Mumbai',
    stops: ['Shambhaji Nagar'],
  },
  {
    id: 3,
    name: 'Bus C',
    departure: '3:00 PM',
    arrival: '7:00 PM',
    price: '$15',
    from: 'Mumbai',
    to: 'Nashik',
    stops: [], // No intermediate stops
  },
];

// Locations list for suggestions
const allLocations = [
  'Mumbai',
  'Pune',
  'Nashik',
  'Lonavala',
  'Shambhaji Nagar',
];

const BusScreen = ({navigation}: any) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [filteredBuses, setFilteredBuses] = useState(busesData);
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);

  // Handle search for buses
  const searchBuses = () => {
    const results = busesData.filter(bus => {
      const fromMatch = bus.from.toLowerCase() === fromLocation.toLowerCase();
      const toMatch = bus.to.toLowerCase() === toLocation.toLowerCase();
      const isIntermediateStop = bus.stops.some(
        stop => stop.toLowerCase() === toLocation.toLowerCase(),
      );

      // Show bus if user is searching for direct routes or an intermediate stop
      return (fromMatch && toMatch) || (fromMatch && isIntermediateStop);
    });
    setFilteredBuses(results);
  };

  // Filter suggestions based on input
  const filterSuggestions = (input: string, type: 'from' | 'to') => {
    const filtered = allLocations.filter(location =>
      location.toLowerCase().includes(input.toLowerCase()),
    );

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
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSuggestionSelect(item, 'from')}>
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
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSuggestionSelect(item, 'to')}>
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
