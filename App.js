import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator()

import LoginForm from './components/LoginForm';
import Home from './components/Hero';
import EmployeeSignupForm from './components/SignupForm';
import EmployeeDashboard from './components/EmployeeDashboard';

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
        <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginForm} />
        <Stack.Screen name="SignupForm" options={{ headerShown: false }} component={EmployeeSignupForm} />
        <Stack.Screen name="employeeDashboard" options={{ headerShown: false }} component={EmployeeDashboard} />
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
