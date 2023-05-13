import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
const photo = require("../assets/images/Employer.jpg");
import { useRecoilState } from "recoil";
import { userState, updateEmployee } from "../auth/authSlice";
import axios from "axios";

const UserProfile = () => {
  const [userData, setUserData] = useRecoilState(userState);
  const employeeData = userData.employee;
  const [editing, setEditing] = useState(false);
  const [newUser, setNewUser] = useState({ ...employeeData });
  const {
    email,
    phone,
    address,
    age,
    specialization,
    gender,
    first_name,
    last_name,
  } = newUser;
  const { apt, street, city, postal, province } = address;

  /**/
  const [open, setOpen] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
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
    // console.log(value);
    setSelectedSpecialization(value);
    setNewUser((prevState) => ({
      ...prevState,
      specialization: value,
    }));
  };

  /**/
  const handleUpdate = async () => {
    console.log(newUser);
    const updatedUser = await updateEmployee(newUser);
    setUserData({ employee: updatedUser, employer: null });
    setEditing(false);
  };

  const onUpdate = () => {
    setEditing(true);
  };

  const handleChange = (key, value) => {
    if (
      key === "apt" ||
      key === "street" ||
      key === "city" ||
      key === "postal" ||
      key === "province"
    ) {
      setNewUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [key]: value,
        },
      }));
    } else {
      setNewUser((prevUser) => ({ ...prevUser, [key]: value }));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={photo} style={styles.photo} />
      <Text style={styles.name}>
        {first_name} {last_name}
      </Text>
      {editing ? (
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.infoContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => handleChange("email", text)}
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Phone:</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={(text) => handleChange("phone", text)}
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Address: </Text>
              <View style={styles.address_section}>
                <View style={styles.addressInputs}>
                  <TextInput
                    style={styles.address_apt}
                    value={apt}
                    onChangeText={(text) => handleChange("apt", text)}
                  />
                  <TextInput
                    style={styles.address_street}
                    value={street}
                    onChangeText={(text) => handleChange("street", text)}
                  />
                </View>
                <View style={styles.addressInputs}>
                  <TextInput
                    style={styles.address_city}
                    value={city}
                    onChangeText={(text) => handleChange("city", text)}
                  />
                  <TextInput
                    style={styles.address_postal}
                    value={postal}
                    onChangeText={(text) => handleChange("postal", text)}
                  />
                </View>
                <TextInput
                  style={styles.address_province}
                  value={province}
                  onChangeText={(text) => handleChange("province", text)}
                />
              </View>
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Age:</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={(text) => handleChange("age", text)}
              />
            </View>
            {items && (
              <View style={{ ...styles.inputRow, zIndex: 2 }}>
                <Text style={styles.label}>Specialization:</Text>
                <TouchableOpacity
                  onPress={handleDropdownPress}
                  style={{ ...styles.input, borderWidth: 0 }}
                >
                  <DropDownPicker
                    open={open}
                    value={selectedSpecialization}
                    items={items}
                    setOpen={setOpen}
                    setValue={setSelectedSpecialization}
                    setItems={setItems}
                    onChangeValue={handleDropdownValueChange}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.inputRow}>
              {/* <TextInput
                style={styles.input}
                value={specialization}
                onChangeText={(text) => handleChange("specialization", text)}
              /> */}
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Gender:</Text>
              <TextInput
                style={styles.input}
                value={gender}
                onChangeText={(text) => handleChange("gender", text)}
              />
            </View>
            <TouchableOpacity onPress={handleUpdate} style={styles.button}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{phone}</Text>
          </View>
          {address ? (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address:</Text>
              <View>
                <Text style={styles.infoValue}>
                  {apt}-{street}
                </Text>
                <Text style={styles.infoValue}>
                  {city} {postal}
                </Text>
                <Text style={styles.infoValue}>{province}</Text>
              </View>
            </View>
          ) : (
            ""
          )}
          {age ? (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Age:</Text>
              <Text style={styles.infoValue}>{age}</Text>
            </View>
          ) : (
            ""
          )}
          {specialization ? (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Specializations:</Text>
              <Text style={styles.infoValue}>{specialization}</Text>
            </View>
          ) : (
            ""
          )}
          {gender ? (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Gender:</Text>
              <Text style={styles.infoValue}>{gender}</Text>
            </View>
          ) : (
            ""
          )}
          <TouchableOpacity onPress={onUpdate} style={styles.button}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "100%",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 16,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    width: "60%",
    borderRadius: 5,
    padding: 5,
  },
  address_section: {
    width: "60%",
  },
  addressInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    // width: '100%',
  },
  address_apt: {
    width: "15%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    textAlign: "center",
    marginBottom: 10,
  },
  address_street: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  address_city: {
    width: "47.5%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  address_postal: {
    width: "47.5%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  address_province: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
});

export default UserProfile;
