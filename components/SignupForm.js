import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { userState, registerEmployee, registerEmployer} from '../auth/authSlice';
import { useSetRecoilState } from 'recoil';


const EmployeeSignupForm = ({navigation}) => {
  const route = useRoute();
  const path = route.name;
  console.log(path)

  const setUserState = useSetRecoilState(userState);

  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async() => {
    if(!first_name || !last_name || !email || !phone || !password) {
      alert('Please fill all the fields!')
    }
    else {
    const userData = {
      first_name,
      last_name,
      email,
      phone,
      password
    }
    if (path === "SignupEmployee") {
      const serverData = await registerEmployee(userData)
      if (serverData){
        setUserState({employee:serverData, employer: null});
        navigation.navigate('employeeDashboard')
      }
    }
    else if(path === "SignupEmployer") {
      const serverData = await registerEmployer(userData)
      if(serverData){
        setUserState({employer:serverData, employee:null});
        navigation.navigate('employerDashboard')
      }
    }
  }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Create an account</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={first_name}
        onChangeText={setFirstName}
        placeholderTextColor = "#828ca9"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={last_name}
        onChangeText={setLastName}
        placeholderTextColor = "#828ca9"
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor = "#828ca9"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        placeholderTextColor = "#828ca9"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor = "#828ca9"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#091930',
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#ccd6f6',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'transparent',
    fontSize: 16,
    textAlign: 'center',
    color: '#64ffda'
  },
  button: {
    marginTop: 30,
    backgroundColor: '#64ffda',
    borderColor: '#64ffda',
    width: '80%',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EmployeeSignupForm;
