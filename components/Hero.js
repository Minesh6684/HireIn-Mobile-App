import { Pressable, View, Text, StyleSheet, Image } from "react-native";
const Logo = require("../assets/images/hirein_logo.png");
import { userState } from "../auth/authSlice";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function Home({ navigation }) {
  const [userData, setUserData] = useRecoilState(userState);
  useEffect(() => {
    if (userData.employer) {
      navigation.navigate("employerDashboard");
    } else if (userData.employee) {
      navigation.navigate("employeeDashboard");
    }
  });
    
  const onEmployeeButtonPress = () => {
    navigation.navigate("LoginEmployee");
  };

  const onEmployerButtonPress = () => {
    navigation.navigate("LoginEmployer");
  };
  return (
    <View style={styles.buttonContainer}>
      <Image source={Logo} style={styles.logo} />
      <Text style={[styles.name, { marginBottom: 40 }]}>HireIn</Text>
      <Pressable style={styles.employeeButton} onPress={onEmployeeButtonPress}>
        <Text style={styles.buttonText}>Employee</Text>
      </Pressable>
      <Pressable style={styles.employeeButton} onPress={onEmployerButtonPress}>
        <Text style={styles.buttonText}>Employer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 100,
    marginTop: 90,
  },
  name: {
    fontSize: 35,
    color: "#ccd6f6",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#091930",
  },
  employeeButton: {
    padding: 10,
    borderColor: "#64ffda",
    borderWidth: 2,
    borderRadius: 10,
    width: "60%",
    height: "7%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: 20,
  },
  buttonText: {
    color: "#64ffda",
    fontSize: 18,
    fontWeight: 500,
  },
});
