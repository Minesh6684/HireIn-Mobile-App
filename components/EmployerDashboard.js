import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EmployerProfile from "./EmployerProfile";
import EmployerSearchServices from "./EmployerSearchServices";
import EmployerAppointment from "./EmployerAppointment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useRecoilState } from "recoil";
import { userState } from "../auth/authSlice";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

const EmployerDashboard = ({ navigation }) => {
  const [userData, setUserData] = useRecoilState(userState);
  useEffect(() => {
    if (!userData.employer) {
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
        component={EmployerProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={EmployerSearchServices}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-search"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={EmployerAppointment}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="schedule" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="logout"
        component={EmployerSearchServices}
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

export default EmployerDashboard;
