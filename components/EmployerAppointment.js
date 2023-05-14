import { View, Text, StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import { userState } from "../auth/authSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const EmployerAppointment = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const getAppointments = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.employer.token}`,
        },
      };
      const response = await axios.get(
        "http://hire-in.vercel.app/employers/get-appointment/",
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
      <Text style={styles.title}>Appointments</Text>
      {appointments &&
        appointments.map((appointment) => (
          <View key={appointment.appointment_id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>
                {appointment.employee.first_name}{" "}
                {appointment.employee.last_name}
              </Text>
              <Text>{appointment.employee.specialization}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardBodyText}>
                Age: {appointment.employee.age}
              </Text>
              <Text style={styles.cardBodyText}>
                Gender: {appointment.employee.gender}
              </Text>
              <Text style={styles.cardBodyText}>
                Email: {appointment.employee.email}
              </Text>
              <Text style={styles.cardBodyText}>
                Phone: {appointment.employee.phone}
              </Text>
              <Text style={styles.cardBodyText}>
                Address: {appointment.employee.address.apt}{" "}
                {appointment.employee.address.street},{" "}
                {appointment.employee.address.city}{" "}
                {appointment.employee.address.postal}
              </Text>
            </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardBody: {},
  cardBodyText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default EmployerAppointment;
