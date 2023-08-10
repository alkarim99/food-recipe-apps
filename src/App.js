/* eslint-disable prettier/prettier */
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './store/index';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import axios from 'axios';
import {useSelector} from 'react-redux';

import Home from './pages/Home.screen';
import Login from './pages/Login.screen';
import Register from './pages/Register.screen';
import DetailRecipe from './pages/DetailRecipe.screen';
import Profile from './pages/Profile.screen';
import Chat from './pages/Chat.screen';
import More from './pages/More.screen';
import Result from './pages/Result.screen';
import AddRecipe from './pages/AddRecipe.screen';
import MyRecipe from './pages/MyRecipe.screen';
import EditProfile from './pages/EditProfile.screen';

const Stack = createNativeStackNavigator();

function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <RunApp persistor={persistor}></RunApp>
    </Provider>
  );
}

function RunApp({persistor}) {
  const state = useSelector(state => state);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  axios.interceptors.request.use(
    config => {
      if (state?.authSlice?.token != '') {
        config.headers['Authorization'] = `Bearer ${state?.authSlice?.token}`;
      }
      return config;
    },
    error => {
      console.log(error);
      Promise.reject(error);
    },
  );

  return (
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <PaperProvider>
          <StatusBar barStyle={'dark-content'} />

          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DetailRecipe"
              component={DetailRecipe}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="More"
              component={More}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Result"
              component={Result}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddRecipe"
              component={AddRecipe}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyRecipe"
              component={MyRecipe}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </PersistGate>
  );
}

export default App;
