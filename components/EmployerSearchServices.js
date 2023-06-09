import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../auth/authSlice";

const EmployerSearchServices = ({ navigation }) => {
  const [userData, setUserData] = useRecoilState(userState);
  const employerData = userData.employer;
  const [imageUri, setImageUri] = useState(null);

  /**/
  const [expandedEmployee, setExpandedEmployees] = useState();
  const [isEmployeeExpanded, setExpandEmployees] = useState(false);

  const { first_name, last_name, specialization, age, phone, email } =
    expandedEmployee || {};
  /**/
  const [open, setOpen] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await axios.get(
          "https://hire-in.vercel.app/admin/get-services/"
        );
        const serviceNames = response.data.map(
          (speciality) => speciality.service_name
        );
        const itemsArray = serviceNames.map((serviceName) => ({
          label: serviceName,
          value: serviceName,
        }));
        setItems(itemsArray);
      } catch (error) {
        console.log(error);
      }
    };
    getServices();
  }, []);

  const handleDropdownPress = () => {
    setOpen(!open);
  };

  const handleDropdownValueChange = (value) => {
    setSelectedSpecialization(value);
  };

  const handleSubmit = () => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `http://hire-in.vercel.app/employers/search/employee/${selectedSpecialization}`
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
    console.log(employees);
  };

  const toggleExpandEmployee = () => {
    setExpandEmployees(!isEmployeeExpanded);
  };

  const handleBookAppointment = (emp) => {
    const fetchIndividualEmployees = async (empId) => {
      try {
        const response = await axios.get(
          "https://hire-in.vercel.app/employees/display_individual_employee/" +
            empId
        );
        setExpandedEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchIndividualEmployees(emp._id);
    setExpandEmployees(true);
  };

  const handleHire = async () => {
    const userData = {
      employee_id: expandedEmployee._id,
      employer_id: employerData._id,
    };
    const response = await axios.post(
      "https://hire-in.vercel.app/employers/hire",
      userData
    );
    if (response.data.message) {
      alert(response.data.message);
      navigation.navigate("Appointments");
    }
  };

  return (
    <>
      {!isEmployeeExpanded && (
        <View style={styles.container}>
          <Text style={styles.heading}>Search Employees</Text>
          {items && (
            <View style={{ ...styles.inputRow, zIndex: 2 }}>
              <TouchableOpacity
                onPress={handleDropdownPress}
                style={{ zIndex: 2, marginBottom: 10 }}
              >
                <DropDownPicker
                  placeholder="Select Specialization"
                  open={open}
                  value={selectedSpecialization}
                  items={items}
                  setOpen={setOpen}
                  setValue={setSelectedSpecialization}
                  setItems={setItems}
                  onChangeValue={handleDropdownValueChange}
                  style={styles.dropdown}
                  containerStyle={styles.dropdownContainer}
                  textStyle={styles.dropdownText}
                  dropDownStyle={styles.dropdownList}
                  listItemLabelStyle={styles.dropdownItemLabel}
                  listItemContainerStyle={styles.dropdownItemContainer}
                  dropDownMaxHeight={150}
                  zIndex={3}
                  modalContentContainerStyle={styles.dropdownModal}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.employeesContainer}>
            <Text style={styles.subheading}>List of Employees</Text>
            {employees.length === 0 ? (
              <Text style={styles.noEmployeeText} key="no_employee">
                No employees found.
              </Text>
            ) : (
              employees.map((employee) => (
                <View style={styles.employeeItem} key={employee.id}>
                  <Text style={styles.employeeName}>
                    {employee.first_name} {employee.last_name}
                  </Text>
                  <Text style={styles.employeeSpecialization}>
                    {employee.specialization}
                  </Text>
                  <Text style={styles.employeeSpecialization}>
                    <Text style={{ fontWeight: 600 }}>Gender:</Text>{" "}
                    {employee.gender}{" "}
                    <Text style={{ fontWeight: 600 }}>Age:</Text> {employee.age}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleBookAppointment(employee)}
                  >
                    <Text style={styles.buttonText}>Book Appointment</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      )}

      {expandedEmployee && isEmployeeExpanded && (
        <View style={styles.expandedEmployeeContainer}>
          <Text style={styles.expandedEmployeeTitle}>Employee Details</Text>
          <View style={styles.expandedEmployeeCard}>
            <Text style={styles.expandedEmployeeNameText}>
              {first_name} {last_name}
            </Text>
            <Text style={styles.expandedEmployeeText}>
              Specialization: {specialization}
            </Text>
            <Text style={styles.expandedEmployeeText}>Age: {age}</Text>
            <Text style={styles.expandedEmployeeText}>Phone: {phone}</Text>
            <Text style={styles.expandedEmployeeText}>Email: {email}</Text>
            <View style={styles.expandedEmployeeButtonContainer}>
              <TouchableOpacity
                style={styles.hirebutton}
                onPress={() => setExpandEmployees(false)}
              >
                <Text style={styles.hirebuttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.hirebutton}
                onPress={() => handleHire(expandedEmployee._id)}
              >
                <Text style={styles.hirebuttonText}>Hire</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: "#fafafa",
    textAlign: "center",
  },
  dropdownContainer: {
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginVertical: 0,
    marginLeft: -4,
    marginRight: -4,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownList: {
    marginTop: -8,
    borderRadius: 4,
  },
  dropdownItemLabel: {
    fontSize: 16,
    textAlign: "left",
  },
  dropdownItemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  hirebutton: {
    backgroundColor: "green",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
    marginTop: 10,
    marginLeft: 50,
  },
  hirebuttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  employeesContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  subheading: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 18,
    color: "#333",
  },
  employeeContainer: {
    flexDirection: "column",
    // justifyContent: 'space-between',
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  employeeItem: {
    width: 340,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 22,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  employeeSpecialization: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  noEmployeeText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#666",
  },
  expandedEmployeeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  expandedEmployeeCard: {
    backgroundColor: "#FFFFFF",
    width: 400,
    borderRadius: 8,
    padding: 26,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  expandedEmployeeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  expandedEmployeeNameText: {
    fontWeight: "700",
    marginBottom: 10,
    fontSize: 20,
  },
  expandedEmployeeText: {
    marginBottom: 5,
    fontSize: 16,
  },
  expandedEmployeeButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  hirebutton: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "48%",
    marginTop: 20,
    alignSelf: "flex-end",
  },
  hirebuttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EmployerSearchServices;
