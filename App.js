import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator()

import LoginForm from './components/LoginForm';
import Home from './components/Hero';
import SignupForm from './components/SignupForm';
import EmployeeDashboard from './components/EmployeeDashboard';
import EmployerDashboard from './components/EmployerDashboard';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="LoginEmployee" options={{ headerShown: false }} component={LoginForm} />
        <Stack.Screen name="LoginEmployer" options={{ headerShown: false }} component={LoginForm} />
        <Stack.Screen name="SignupEmployee" options={{ headerShown: false }} component={SignupForm} />
        <Stack.Screen name="SignupEmployer" options={{ headerShown: false }} component={SignupForm} />
        <Stack.Screen name="employeeDashboard" options={{ headerShown: false }} component={EmployeeDashboard} />
        <Stack.Screen name="employerDashboard" options={{ headerShown: false }} component={EmployerDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
