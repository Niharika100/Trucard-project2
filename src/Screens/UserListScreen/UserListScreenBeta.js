/*
    1. recyclerListView causing warning for empty data
    2. some issue with the touchable opacity in class based component
    3. how to use redux for the realm database
    4. 
*/ 
import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    PixelRatio as PR,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import { RecyclerListView, LayoutProvider, DataProvider } from 'recyclerlistview';
import { SearchBar } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';

import Sheet from '../../Components/Sheet/Sheet';
import styles from './UserListScreen.styles';
import { getUsers, updateUser, deleteUser } from '../../Database/Services/userService';
import CheckBox from 'react-native-check-box';

const { width } = Dimensions.get('window');

export class UserListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            searchValue: "",
            showUserSheet: false,
            dataProvider: new DataProvider((r1, r2) => { return r1 !== r2; }),
            masterDataSource: [],
            filteredDataSource: []
        }
    }

    refreshScreen = () => {
        getUsers().then((result) => {
            this.setState({
                ...this.state,
                dataProvider: this.state.dataProvider.cloneWithRows(result),
                masterDataSource: result,
                filteredDataSource: result
            })
            // console.log('this.state');
            // console.log(this.state);
        }).catch(e => Alert.alert(`${e}`));
    }

    componentDidMount() {
        // console.log("component did mount")
        this.refreshScreen()
    }

    deleteUserFunction = (userId) => {
        deleteUser(userId).then(() => {
            this.refreshScreen()
        }).catch(e => Alert.alert(`${e}`))
    }

    updateIsAssign = (userData) => {
        updateUser(userData).then(() => {
            refreshScreen()
        }).catch(e => Alert.alert(`${e}`))
    }

    searchFilterFunction = (query) => {
        if (query) {
            const newData = this.state.masterDataSource.filter(function (user) {
                let name = user.customer_name.toUpperCase();
                let emailId = user.email.toUpperCase();
                let queryValue = query.toUpperCase();
                if (name.includes(queryValue) || emailId.includes(queryValue)) {
                    return true;
                }
                else return false;
            });
            this.setState({
                ...this.state,
                filteredDataSource: newData,
                searchValue: query
            })
        } else {
            this.setState({
                ...this.state,
                filteredDataSource: this.state.masterDataSource,
                searchValue: query
            })
        }
    };

    layoutProvider = new LayoutProvider(
        (index) => 0,
        (type, dim) => {
            dim.width = Dimensions.get('window').width;
            dim.height = 150;
        },
    );

    rowRenderer = (type, data) => {
        return (
            <TouchableOpacity style={styles.cardContainer} onPress={() => {
                console.log('clicked')
                this.setState({
                    ...this.state,
                    user: data,
                    showUserSheet: true
                })
            }}>
                <View>
                    <CheckBox
                        onClick={() => this.updateIsAssign(data)}
                        isChecked={data.isAssign}
                    />
                </View>
                <View style={styles.idStyle}>
                    <Text>{data.customerId}</Text>
                </View>
                <View style={{ flex: 3, alignItems: 'center' }}>
                    <Text style={styles.textContainer}>{data.customer_name}</Text>
                    <Text style={styles.textContainer}>{data.email}</Text>
                    <Text style={styles.textContainer}>{data.mobile}</Text>
                </View>
                <Entypo name='trash' size={24} onPress={() => this.deleteUserFunction(data.customerId)} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View
                style={{ padding: PR.getPixelSizeForLayoutSize(10) / PR.get(), marginBottom: PR.getPixelSizeForLayoutSize(48) / PR.get() }}
            >
                <TouchableOpacity
                    style={{ flexDirection: 'row-reverse', marginVertical: 8 }}
                    onPress={() => this.props.navigation.navigate('CreateUser')}
                >
                    <Text style={{ padding: 4, borderWidth: 1, borderRadius: 2 }}>Add user</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <SearchBar
                        onChangeText={(text) => { searchFilterFunction(text) }}
                        placeholder="Search User"
                        value={this.state.searchValue}
                        containerStyle={{ backgroundColor: '#70186f', borderRadius: 20, width: width / 1.04 }}
                        inputContainerStyle={{ backgroundColor: 'lightgrey', borderRadius: 20 }}
                    />
                </View>
                <View style={{ minHeight: 1, minWidth: 1 }}>
                    <RecyclerListView
                        dataProvider={this.state.dataProvider}
                        layoutProvider={this.layoutProvider}
                        rowRenderer={this.rowRenderer}
                    canChangeSize={true}
                    />
                </View>
                <Sheet
                    modalVisible={this.state.showUserSheet}
                    close={() => this.setState({
                        ...this.state,
                        showUserSheet: false
                    })}
                    component={
                        <View style={styles.userProfileContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', color: 'white', marginHorizontal: PR.getPixelSizeForLayoutSize(10) / PR.get() }}>
                                    {this.state.user?.customerId}
                                </Text>
                                <Text style={{ fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', color: 'white' }}>
                                    {this.state.user?.customer_name}
                                </Text>
                            </View>
                            <Text style={{ fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', color: 'white' }}>
                                {this.state.user?.email}
                            </Text>
                            <Text style={{ fontSize: 18, fontFamily: 'SpaceGrotesk-Bold', color: 'white' }}>
                                {this.state.user?.mobile}
                            </Text>
                        </View>
                    }
                />
            </View>
        );
    }
}

export default UserListScreen;