import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import { userState } from "../auth/authSlice";
import axios from "axios";

const EmployeeAppointments = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const getAppointments = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.employee.token}`,
        },
      };
      const response = await axios.get(
        "http://hire-in.vercel.app/employees/get-appointments/",
        config
      );
      setAppointments(response.data);
    };
    getAppointments();
  }, []);

  useEffect(() => {
  }, [appointments]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Appointments</Text>
      {appointments &&
        appointments.map((appointment) => (
          <View style={styles.card} key={appointment.appointment_id}>
            <Text style={styles.name}>
              {appointment.employer.first_name} {appointment.employer.last_name}{" "}
            </Text>
            <Text style={styles.text}>Age: {appointment.employer.age}</Text>
            <Text style={styles.text}>
              Gender: {appointment.employer.gender}
            </Text>
            <Text style={styles.text}>Email: {appointment.employer.email}</Text>
            <Text style={styles.text}>Phone: {appointment.employer.phone}</Text>
            <Text style={styles.text}>
              Address: {appointment.employer.address.apt}{" "}
              {appointment.employer.address.street}{" "}
              {appointment.employer.address.city}{" "}
              {appointment.employer.address.postal}
            </Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  card: {
    width: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default EmployeeAppointments;
