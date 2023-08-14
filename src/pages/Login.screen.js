/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  useColorScheme,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';
import {addAuth} from '../store/reducers/authSlice';

function Login(props) {
  const {navigation} = props;
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    if (state?.authSlice?.token != '') {
      navigation.navigate('Profile');
    }
  }, []);

  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [errorMessages, setErrorMessages] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    axios
      .post('https://vast-mite-smock.cyclic.app/auth/login', {
        email: email,
        password: password,
      })
      .then(response => {
        const profile = response?.data?.data;
        const token = response?.data?.token;
        axios
          .get(
            `https://vast-mite-smock.cyclic.app/recipes?user_id=${profile?.id}`,
          )
          .then(responseRecipes => {
            const myRecipes = responseRecipes?.data?.data;
            dispatch(
              addAuth({
                userData: profile,
                token,
                myRecipes,
              }),
            );
          });
        setIsSuccess(true);
      })
      .catch(error => {
        console.log(error);
        setErrorMessages(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View style={{padding: 15, backgroundColor: 'white'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 80,
              }}>
              <Pressable onPress={() => navigation.navigate('Home')}>
                <Image
                  source={require('../assets/Group-697-1.png')}
                  style={styles.profileIcon}
                />
              </Pressable>
              <Text style={{fontSize: 30, color: '#EFC81A'}}>Welcome!</Text>
              <Text>Log in to your exiting account.</Text>
            </View>
            <View style={{paddingBottom: 100}}>
              <TextInput
                style={styles.inputActive}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
              />
              <View style={{margin: 12}}>
                <TouchableOpacity
                  underlayColor="white"
                  onPress={handleLogin}
                  disabled={isLoading}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>
                      {isLoading ? 'Loading...' : 'LOG IN'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>
                  Don't have an account?{' '}
                </Text>
                <Pressable onPress={() => navigation.navigate('Register')}>
                  <Text style={{color: '#EFC81A', margin: 0, padding: 0}}>
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
          <Snackbar
            visible={isSuccess}
            style={{backgroundColor: '#79C079'}}
            onDismiss={() => navigation.navigate('Profile')}
            duration={2000}>
            Login success
          </Snackbar>

          <Snackbar
            visible={Boolean(errorMessages)}
            style={{backgroundColor: '#CB3837'}}
            onDismiss={() => setErrorMessages(null)}
            action={{
              label: 'X',
              onPress: () => {
                setErrorMessages(null);
              },
            }}>
            {errorMessages}
          </Snackbar>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileIcon: {
    padding: 20,
    margin: 20,
    width: 200,
    height: 200,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  input: {
    height: 50,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  inputActive: {
    height: 50,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#eee',
    borderColor: '#EFC81A',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#EFC81A',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    padding: 12,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Login;
