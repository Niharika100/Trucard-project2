import React, { useState } from 'react';
import CheckBox from 'react-native-check-box';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  PixelRatio as PR,
  TextInput,
  Alert,
} from 'react-native';

import { addUser } from '../Database/Services/userService';


const CreateUserScreen = ({ navigation }) => {

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState("");
  const [isAssign, setIsAssign] = useState(false);
  const [customerId, setCustomerId] = useState(null);

  const addNewUser = () => {
    const newUser = {
      customer_name: name,
      mobile: parseInt(mobile),
      email: email,
      isAssign: isAssign,
      customerId: parseInt(customerId)
    }

    addUser(newUser).then((result) => {
      navigation.goBack();
    }).catch(e => Alert.alert(`${e}`));
  }

  return (
    <View style={{ padding: PR.getPixelSizeForLayoutSize(24) / PR.get(), margin: PR.getPixelSizeForLayoutSize(8) / PR.get(), borderWidth: 2, borderRadius: 12 }}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Name"
        keyboardType='name-phone-pad'
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setMobile(text)}
        value={mobile}
        placeholder="Mobile Number"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email Id"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCustomerId(text)}
        value={customerId}
        placeholder="Customer Id"
        keyboardType="numeric"
      />
      <CheckBox
        onClick={() => setIsAssign(!isAssign)}
        isChecked={isAssign}
        rightText={"Assign"}
        style={{ marginBottom: PR.getPixelSizeForLayoutSize(24) / PR.get() }}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={() => addNewUser()}>
        <Text style={styles.textContainer}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    padding: PR.getPixelSizeForLayoutSize(8) / PR.get(),
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 12
  },
  textContainer: {
    fontFamily: 'Helvetica',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: PR.getPixelSizeForLayoutSize(24) / PR.get(),
    padding: PR.getPixelSizeForLayoutSize(12) / PR.get(),
  }
})

export default CreateUserScreen;