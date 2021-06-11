import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserListScreen from './src/Screens/UserListScreen/UserListScreen';
import CreateUserScreen from './src/Screens/CreateUserScreen';

const App = createStackNavigator();

const MyStack = () => {
  return (
      <NavigationContainer>
        <App.Navigator>
          <App.Screen
            name="Users"
            component={UserListScreen}
            options={{ title: 'Users' }}
          />
          <App.Screen
            name="CreateUser"
            component={CreateUserScreen}
            options={{ title: 'Add New User' }}
          />
        </App.Navigator>
      </NavigationContainer>
  );
};

export default MyStack;