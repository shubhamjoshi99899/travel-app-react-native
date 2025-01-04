import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/MaterialIcons';

function RiderDetailsScreen() {
  const [adults, setAdults] = useState([
    { id: 1, name: 'Shubham Joshi' },
    { id: 2, name: 'Vijay Bhatt' },
  ]);
  const [selectedAdult, setSelectedAdult] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const priceBreakupRef = useRef<Modalize>(null);
  const [mobile, setMobile] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [modalHeight, setModalHeight] = useState(400); // Default h
  const [newAdult, setNewAdult] = useState({
    title: '',
    firstName: '',
    lastName: '',
  });

  const modalizeRef = useRef<Modalize>(null);

  const openAddAdultModal = () => {
    modalizeRef.current?.open();
  };

  const openPriceBreakupModal = () => {
    priceBreakupRef.current?.open();
  };

  const handleSaveNewAdult = async () => {
    try {
      // Add the new adult to the state
      setAdults((prevAdults) => [
        ...prevAdults,
        {
          id: prevAdults.length + 1,
          name: `${newAdult.title} ${newAdult.firstName} ${newAdult.lastName}`,
        },
      ]);

      // Clear the input fields for the modal
      setNewAdult({ title: '', firstName: '', lastName: '' });

      // Close the modal
      if (modalizeRef.current) {
        modalizeRef.current.close();
      }
    } catch (error) {
      console.error('Error saving new adult:', error);
    }
  };

  const handleContinue = () => {
    console.log({ selectedAdult, email, mobile, gstNumber });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setModalHeight(800), // Adjust modal height when the keyboard is open
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setModalHeight(300), // Reset modal height when the keyboard is hidden
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Adults Section */}
        <Text style={styles.sectionTitle}>
          Adults (0/{adults.length} added)
        </Text>
        {adults.map((adult) => (
          <View key={adult.id} style={styles.adultRow}>
            <TouchableOpacity onPress={() => setSelectedAdult(adult.id)}>
              <Icon
                name={
                  selectedAdult === adult.id
                    ? 'radio-button-checked'
                    : 'radio-button-unchecked'
                }
                size={24}
                color="#000"
              />
            </TouchableOpacity>
            <Text style={styles.adultName}>{adult.name}</Text>
            <TouchableOpacity>
              <Icon name="edit" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={openAddAdultModal}>
          <Text style={styles.addButtonText}>Add Adult</Text>
        </TouchableOpacity>

        {/* Contact Information */}
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.infoText}>Booking updates will be shared here</Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
        />

        {/* GST Number */}
        <Text style={styles.sectionTitle}>GST Number (optional)</Text>
        <Text style={styles.infoText}>
          NOTE: Use GST number to avail GST benefits & additional savings
        </Text>
        <TextInput
          style={styles.input}
          placeholder="GST Number"
          value={gstNumber}
          onChangeText={setGstNumber}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add GST</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.fare}>₹6,953</Text>
          <TouchableOpacity onPress={openPriceBreakupModal}>
            <Text style={styles.priceBreakup}>View Price Breakup</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Add New Adult Modal */}
      <Modalize ref={modalizeRef} modalHeight={modalHeight}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Adult</Text>
          <Text style={styles.modalSubtitle}>Above 12 years</Text>
          <View style={styles.titleContainer}>
            {['Mr.', 'Ms.', 'Mrs.'].map((title) => (
              <TouchableOpacity
                key={title}
                style={[
                  styles.titleButton,
                  newAdult.title === title && styles.titleButtonSelected,
                ]}
                onPress={() => setNewAdult({ ...newAdult, title })}
              >
                <Text
                  style={[
                    styles.titleButtonText,
                    newAdult.title === title && styles.titleButtonTextSelected,
                  ]}
                >
                  {title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="First & middle name (Given name)"
            value={newAdult.firstName}
            onChangeText={(text) =>
              setNewAdult({ ...newAdult, firstName: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Last name (Surname)"
            value={newAdult.lastName}
            onChangeText={(text) =>
              setNewAdult({ ...newAdult, lastName: text })
            }
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveNewAdult}
          >
            <Text style={styles.saveButtonText}>Save New Adult</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
      <Modalize ref={priceBreakupRef} modalHeight={200}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Price Breakup</Text>
          <View style={styles.priceBreakupItem}>
            <Text style={styles.breakupLabel}>Base Fare:</Text>
            <Text style={styles.breakupValue}>₹5,000</Text>
          </View>
          <View style={styles.priceBreakupItem}>
            <Text style={styles.breakupLabel}>Taxes:</Text>
            <Text style={styles.breakupValue}>₹953</Text>
          </View>
          <View style={styles.priceBreakupItem}>
            <Text style={styles.breakupLabel}>Service Fee:</Text>
            <Text style={styles.breakupValue}>₹1,000</Text>
          </View>
          <View style={styles.priceBreakupTotal}>
            <Text style={styles.breakupLabel}>Total:</Text>
            <Text style={styles.breakupValue}>₹6,953</Text>
          </View>
        </View>
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  adultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  adultName: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  addButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  addButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  fare: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceBreakup: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: '#ff6200',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  priceBreakupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceBreakupTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    fontWeight: 'bold',
  },
  breakupLabel: {
    fontSize: 16,
    color: '#333',
  },
  breakupValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },

  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  titleButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  titleButtonSelected: {
    backgroundColor: '#007bff',
  },
  titleButtonText: {
    fontSize: 14,
    color: '#000',
  },
  titleButtonTextSelected: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RiderDetailsScreen;
