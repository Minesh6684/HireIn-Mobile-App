import { Pressable, View, Text, StyleSheet, Image } from "react-native"
const Logo = require("../assets/images/hirein_logo.png");

export default function Home ({ navigation }) {
    const onEmployeeButtonPress = () => {
      navigation.navigate('Login');
    };
    return(
        <View style={styles.buttonContainer}>
            <Image source={Logo} style={styles.logo}/>
            <Text style={[styles.name, {marginBottom: 40}]}>HireIn</Text>
            <Pressable style={styles.employeeButton}  onPress={onEmployeeButtonPress}>
                <Text style={styles.buttonText}>Employee</Text>
            </Pressable>
            <Pressable style={styles.employeeButton}>
                <Text style={styles.buttonText}>Employer</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        height: 100,
        width: 100,
        marginTop: 90,
    },
    name: {
        fontSize: 35,
        color: '#ccd6f6'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#091930'
    },
    employeeButton: {
        padding: 10,
        borderColor: "#64ffda",
        borderWidth: 2,
        borderRadius: 10,
        width: '60%',
        height: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginBottom: 20
    },
    buttonText: {
        color: '#64ffda',
        fontSize: 18,
        fontWeight: 500
    }
})