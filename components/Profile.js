import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
const photo = require('../assets/images/Employer.jpg');
import { useRecoilState } from 'recoil';
import { employeeState } from '../auth/authSlice';
// import { employee, updateEmployee } from '../auth/authSlice';

const UserProfile = () => {

  const [employeeData, setEmployeeData] = useRecoilState(employeeState);
  const [editing, setEditing] = useState(false);
  const [newUser, setNewUser] = useState({ ...employeeData });
  const { email, phone, address, age, specializations, gender, first_name, last_name } = employeeData;

  const handleUpdate = async() => {
    const updatedUser = await updateEmployee(newUser);
    setEmployeeData(updatedUser)
    setEditing(false);
  };

  const onUpdate = () => {
    setEditing(true)
  }

  const handleChange = (key, value) => {
    setNewUser((prevUser) => ({ ...prevUser, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <Image source={photo} style={styles.photo} />
      <Text style={styles.name}>{first_name} {last_name}</Text>
      {editing ? (
        <KeyboardAvoidingView
            style={{width: '100%'}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <View style={styles.infoContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => handleChange('email', text)}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Phone:</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={(text) => handleChange('phone', text)}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Address: </Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={(text) => handleChange('address', text)}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Age:</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={(text) => handleChange('age', text)}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Specializations:</Text>
            <TextInput
              style={styles.input}
              value={specializations}
              onChangeText={(text) => handleChange('specializations', text)}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Gender:</Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={(text) => handleChange('gender', text)}
            />
          </View>
          <TouchableOpacity onPress={handleUpdate} style={styles.button}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
      ) : (
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>{phone}</Text>
        </View>
        {address ? <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.infoValue}>{address}</Text>
        </View> : ''}
        {age ? <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age:</Text>
          <Text style={styles.infoValue}>{age}</Text>
        </View> : ''}
        {specializations ? <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Specializations:</Text>
          <Text style={styles.infoValue}>{specializations.join(', ')}</Text>
        </View> : ''}
        {gender ? <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Gender:</Text>
          <Text style={styles.infoValue}>{gender}</Text>
        </View> : ''}
        <TouchableOpacity onPress={onUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
        </View>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    width: '50%',
    borderRadius: 5,
    padding: 5
  }
});

export default UserProfile;
