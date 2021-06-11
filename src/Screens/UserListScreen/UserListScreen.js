import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  PixelRatio as PR,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './UserListScreen.styles';
import { getUsers, updateUser, deleteUser } from '../../Database/Services/userService';
import CheckBox from 'react-native-check-box';

const { width } = Dimensions.get('window');

const UserListScreen = ({ navigation }) => {
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const refreshScreen = () => {
    getUsers().then((result) => {
      setFilteredDataSource(result);
      setMasterDataSource(result);
    }).catch(e => Alert.alert(`${e}`));
  }

  useFocusEffect(
    React.useCallback(() => {
      refreshScreen();
    }, []),
  );

  const deleteUserFunction = (userId) => {
    deleteUser(userId).then(() => {
      refreshScreen()
    }).catch(e => Alert.alert(`${e}`))
  }

  const updateIsAssign = (userData) => {
    updateUser(userData).then(() => {
      refreshScreen()
    }).catch(e => Alert.alert(`${e}`))
  }

  const searchFilterFunction = (query) => {
    if (query) {
      const newData = masterDataSource.filter(function (user) {
        let name = user.customer_name.toUpperCase();
        let emailId = user.email.toUpperCase();
        let queryValue = query.toUpperCase();
        if (name.includes(queryValue) || emailId.includes(queryValue)) {
          return true;
        }
        else return false;
      });
      setFilteredDataSource(newData);
      setSearchValue(query);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearchValue(query);
    }
  };

  return (
    <View
      style={{ paddingHorizontal: PR.getPixelSizeForLayoutSize(12) / PR.get(), paddingTop: PR.getPixelSizeForLayoutSize(12) / PR.get(), height: Dimensions.get('window').height }}
    >
      <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-around', alignItems: 'center' }}>
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate('CreateUser')}
        >
          <Text style={{ padding: PR.getPixelSizeForLayoutSize(8) / PR.get(), alignSelf: 'center', borderWidth: 1, borderRadius: 12, backgroundColor: '#F06D6D' }}>Add new user</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <SearchBar
            onChangeText={(text) => { searchFilterFunction(text) }}
            placeholder="Search User"
            value={searchValue}
            containerStyle={{ borderRadius: 24, width: width / 1.6, backgroundColor: '#F06D6D' }}
            inputContainerStyle={{ backgroundColor: '#F9F9F9', borderRadius: 24 }}
          />
        </View>
      </View>
      <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        data={filteredDataSource}
        style={{ marginVertical: PR.getPixelSizeForLayoutSize(4) / PR.get() }}
        keyExtractor={i => i.customerId}
        renderItem={({ item }) => {
          return (
            <View style={styles.cardContainer}>
              <View style={styles.idStyle}>
                <Text>{item.customerId}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: PR.getPixelSizeForLayoutSize(12)/PR.get() }}>
                <View>
                  <CheckBox
                    onClick={() => updateIsAssign(item)}
                    isChecked={item.isAssign}
                  />
                </View>
                <View style={{ flex: 3, alignItems: 'center' }}>
                  <Text style={styles.textContainer}>{item.customer_name}</Text>
                  <Text style={styles.textContainer}>{item.email}</Text>
                  <Text style={styles.textContainer}>{item.mobile}</Text>
                </View>
                <Entypo name='trash' size={24} onPress={() => deleteUserFunction(item.customerId)} />
              </View>
            </View>
          )
        }
        }
      />
    </View>
  );
};

export default UserListScreen;