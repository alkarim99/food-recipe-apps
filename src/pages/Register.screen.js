/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Snackbar} from 'react-native-paper';
import axios from 'axios';
import {useSelector} from 'react-redux';

function Register(props) {
  const {navigation} = props;
  const state = useSelector(state => state);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    if (Object.keys(state.authSlice.userData).length != 0) {
      navigation.navigate('Profile');
    }
  }, []);

  const [fullname, onChangeFullname] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [phonenumber, onChangePhonenumber] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [confirmPassword, onChangeConfirmPassword] = React.useState('');
  const [errorMessages, setErrorMessages] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    if (password != confirmPassword) {
      setErrorMessages('Please check your password!');
      setIsLoading(false);
    } else {
      axios
        .post('https://vast-mite-smock.cyclic.app/users', {
          email: email,
          password: password,
          fullname: fullname,
          phoneNumber: phonenumber,
        })
        .then(response => {
          setIsSuccess(true);
        })
        .catch(error => {
          setErrorMessages(error?.response?.data?.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View style={{padding: 15}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <Pressable onPress={() => navigation.navigate('Home')}>
                <Image
                  source={require('../assets/Group-697-1.png')}
                  style={styles.profileIcon}
                />
              </Pressable>
              <Text style={{fontSize: 30, color: '#EFC81A'}}>
                Let’s Get Started!
              </Text>
              <Text>Create new account to access all feautures</Text>
            </View>
            <View style={{paddingBottom: 100}}>
              <TextInput
                style={styles.inputActive}
                onChangeText={onChangeFullname}
                value={fullname}
                placeholder="Name"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangePhonenumber}
                value={phonenumber}
                placeholder="Phone Number"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeConfirmPassword}
                value={confirmPassword}
                secureTextEntry={true}
                placeholder="Password"
              />
              <View style={{margin: 12}}>
                <TouchableHighlight
                  underlayColor="white"
                  onPress={handleRegister}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>
                      {isLoading ? 'Loading...' : 'CREATE'}
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text style={{textAlign: 'center'}}>
                  Already have account?{' '}
                </Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Text style={{color: '#EFC81A'}}>Log In Here</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <Snackbar
            visible={isSuccess}
            style={{backgroundColor: '#79C079'}}
            onDismiss={() => navigation.navigate('Login')}
            duration={2000}>
            Register success, please login
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
    width: 150,
    height: 150,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  input: {
    height: 50,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  inputActive: {
    height: 50,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
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

export default Register;
