import { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from "axios";

const ExpandedEmployee = ({expandedEmployee}) => {
    const{ first_name, last_name, specialization, age, phone, email} = expandedEmployee

  return (
    <View style={styles.container}>
        <Text>{`${first_name} ${last_name}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
      },
})
export default ExpandedEmployee
