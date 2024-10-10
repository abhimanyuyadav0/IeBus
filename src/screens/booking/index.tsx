import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ROUTES} from '../../constants/routes';
import {CustomButton, CustomText} from '../../component';
import SeatSelectionScreen from './seatSelection';
import {Card} from '../../component/library';
import {getUser} from '../../utils/getUser';
import {useTheme} from '../../theme';
import {ThemeColors} from '../../theme/themeTypes';
import {useMutation} from '@tanstack/react-query';
import {getBusById} from '../../api/services/buses';

const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

const BookingScreen = ({navigation, route}: any) => {
  const {bus} = route?.params;

  const {theme} = useTheme();
  const styles = createStyles(theme);
  const [formData, setFormData] = useState<any[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newPassenger, setNewPassenger] = useState<{
    name: string;
    contact: string;
  } | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setCurrentUser(user);
    };

    fetchUser();
  }, []);

  const [busData, setBusData] = useState<any | null>(bus);
  const {mutate: fetchBusData} = useMutation({
    mutationFn: () => getBusById(bus._id),
    onSuccess: data => {
      if (!deepEqual(data.bus, busData)) {
        setBusData(data.bus);
      }
    },
    onError: (error: any) => {
      Alert.alert('Error', error?.message || 'An error occurred');
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchBusData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [fetchBusData]);

  const handleNewPassengerInputChange = (name: string, value: string) => {
    setNewPassenger((prev: any) => ({...prev, [name]: value}));
  };

  const saveNewPassenger = () => {
    if (!newPassenger?.name || !newPassenger.contact) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setFormData(prev => [...prev, newPassenger]);
    setNewPassenger(null);
  };

  const deletePassenger = (index: number) => {
    setFormData(prev => prev.filter((_, i) => i !== index));
    if (selectedSeats.length > formData.length) {
      setSelectedSeats(selectedSeats.slice(0, formData.length - 1));
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setNewPassenger({...formData[index]});
  };

  const saveChanges = (index: number) => {
    if (!newPassenger?.name || !newPassenger.contact) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setFormData(prev => {
      const updatedData = [...prev];
      updatedData[index] = newPassenger;
      return updatedData;
    });
    setEditingIndex(null);
    setNewPassenger(null);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setNewPassenger(null);
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = busData?.seats?.find((s: any) => s._id === seatId);
      return total + (seat ? seat.price : 0);
    }, 0);
  };

  const assignRandomSeats = () => {
    const availableSeats = busData?.seats?.filter(
      (seat: any) => !selectedSeats.includes(seat._id) && !seat.booked,
    );
    const requiredSeats = formData.length - selectedSeats.length;

    for (let i = 0; i < requiredSeats; i++) {
      if (availableSeats.length > 0) {
        const randomSeatIndex = Math.floor(
          Math.random() * availableSeats.length,
        );
        const randomSeat = availableSeats[randomSeatIndex];
        setSelectedSeats(prev => [...prev, randomSeat._id]);
        availableSeats.splice(randomSeatIndex, 1);
      }
    }
  };

  const handleProceedToPayment = () => {
    const totalPrice = getTotalPrice();
    if (formData.some(person => !person.name || !person.contact)) {
      Alert.alert('Error', 'Please fill in all fields for all passengers.');
      return;
    }

    if (selectedSeats.length < formData.length) {
      assignRandomSeats();
    }
    navigation.navigate(ROUTES.PAYMENT, {
      selectedSeats,
      bus: busData,
      totalPrice,
      passengers: formData,
    });
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.header}>Booking for {busData?.name}</CustomText>

      <ScrollView>
        {formData.length > 0 ? (
          <>
            {formData.map((person, index) => (
              <Card key={index} style={styles.card}>
                {editingIndex === index ? (
                  <View>
                    <CustomText>Editing Passenger {index + 1}:</CustomText>
                    <TextInput
                      style={styles.input}
                      value={newPassenger?.name}
                      onChangeText={value =>
                        handleNewPassengerInputChange('name', value)
                      }
                      placeholder="Enter your name"
                    />
                    <TextInput
                      style={styles.input}
                      value={newPassenger?.contact}
                      onChangeText={value =>
                        handleNewPassengerInputChange('contact', value)
                      }
                      placeholder="Enter your contact number"
                      keyboardType="phone-pad"
                    />
                    <View style={styles.actionButtons}>
                      <TouchableOpacity onPress={() => saveChanges(index)}>
                        <CustomText style={styles.saveButton}>Save</CustomText>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={cancelEditing}>
                        <CustomText style={styles.cancelButton}>
                          Cancel
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View>
                    <CustomText>Passenger {index + 1}:</CustomText>
                    <CustomText>Name: {person.name}</CustomText>
                    <CustomText>Contact: {person.contact}</CustomText>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity onPress={() => startEditing(index)}>
                        <CustomText style={styles.editButton}>Edit</CustomText>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deletePassenger(index)}>
                        <CustomText style={styles.deleteButton}>
                          Delete
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Card>
            ))}
          </>
        ) : (
          <CustomText>No passenger added</CustomText>
        )}

        {editingIndex === null && newPassenger === null && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {!formData.some(
              item =>
                item.name ===
                `${currentUser?.firstName} ${currentUser?.lastName}`,
            ) && (
              <CustomButton
                title="Add me"
                variant="text"
                onPress={() =>
                  setFormData([
                    ...formData,
                    {
                      name: `${currentUser?.firstName} ${currentUser?.lastName}`,
                      contact: currentUser.mobile,
                    },
                  ])
                }
                size="small"
              />
            )}
            <CustomButton
              title="Add Passenger"
              onPress={() => setNewPassenger({name: '', contact: ''})}
              size="small"
            />
          </View>
        )}

        {editingIndex === null && newPassenger !== null && (
          <View>
            <CustomText>New Passenger:</CustomText>
            <TextInput
              style={styles.input}
              value={newPassenger?.name}
              onChangeText={value =>
                handleNewPassengerInputChange('name', value)
              }
              placeholder="Enter your name"
            />
            <TextInput
              style={styles.input}
              value={newPassenger?.contact}
              onChangeText={value =>
                handleNewPassengerInputChange('contact', value)
              }
              placeholder="Enter your contact number"
              keyboardType="phone-pad"
            />
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={saveNewPassenger}>
                <CustomText style={styles.saveButton}>Save</CustomText>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelEditing}>
                <CustomText style={styles.cancelButton}>Cancel</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <SeatSelectionScreen
          route={{params: {bus: busData}}}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          formData={formData}
        />

        <View style={styles.totalContainer}>
          <CustomText style={styles.totalText}>
            Total Price: ${getTotalPrice()}
          </CustomText>
          <CustomButton
            title="Proceed to Payment"
            onPress={handleProceedToPayment}
            disabled={formData.length === 0}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background.primary,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    card: {
      marginBottom: 15,
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginTop: 5,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    editButton: {
      color: 'blue',
    },
    saveButton: {
      color: 'green',
    },
    cancelButton: {
      color: 'gray',
    },
    deleteButton: {
      color: 'red',
    },
    totalContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    totalText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default BookingScreen;
