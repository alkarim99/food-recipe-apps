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
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import BottomNav from '../components/BottomNav';

function Register(props) {
  const {navigation} = props;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [phone, onChangePhone] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [confirmPassword, onChangeConfirmPassword] = React.useState('');

  return (
    <>
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
              onChangeText={onChangeName}
              value={name}
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
              onChangeText={onChangePhone}
              value={phone}
              placeholder="Phone Number"
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
            <Text
              style={{textAlign: 'right', marginRight: 12, marginBottom: 12}}>
              Forgot Password?
            </Text>
            <View style={{margin: 12}}>
              <TouchableHighlight underlayColor="white">
                <View style={styles.button}>
                  <Text style={styles.buttonText}>CREATE</Text>
                </View>
              </TouchableHighlight>
            </View>
            <Text style={{textAlign: 'center'}}>
              Already have account?{' '}
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={{color: '#EFC81A'}}>Log In Here</Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
