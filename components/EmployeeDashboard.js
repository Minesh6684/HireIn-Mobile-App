import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const EmployeeDashboard = () => {
      return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {backgroundColor: '#091930', borderTopColor: '#64afda'},
                
                
            }}
            tabBarOptions={{
                activeTintColor: '#64ffda',
                inactiveTintColor: '#ccd6f6',
            }}
          >
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="home"
                    color={color}
                    size={size}
                    
                  />
                ),
              }}
            />
            <Tab.Screen
              name="menu"
              component={Profile}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="menu"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
          </Tab.Navigator>
      );
    };

export default EmployeeDashboard