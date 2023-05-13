import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EmployeeProfile from "./EmployeeProfile";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../auth/authSlice";
import { TouchableOpacity } from 'react-native'
import EmployeeAppointments from "./EmployeeAppointments";

const Tab = createBottomTabNavigator();

const EmployeeDashboard = ({ navigation }) => {
  const [userData, setUserData] = useRecoilState(userState);
  useEffect(() => {
    if (!userData.employee) {
      navigation.navigate("Home");
    }
  });
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#091930", borderTopColor: "#64afda" },
      }}
      tabBarOptions={{
        activeTintColor: "#64ffda",
        inactiveTintColor: "#ccd6f6",
      }}
    >
      <Tab.Screen
        name="Profile"
        component={EmployeeProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={EmployeeAppointments}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="schedule" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="logout"
        component={EmployeeProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <TouchableOpacity
              onPress={() => setUserData({ employee: null, employer: null })}
            >
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default EmployeeDashboard;
