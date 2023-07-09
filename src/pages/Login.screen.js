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
  TouchableHighlight,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function Login(props) {
  const {navigation} = props;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  return (
    <>
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
            <Text
              style={{textAlign: 'right', marginRight: 12, marginBottom: 12}}>
              Forgot Password?
            </Text>
            <View style={{margin: 12}}>
              <TouchableHighlight underlayColor="white">
                <View style={styles.button}>
                  <Text style={styles.buttonText}>LOG IN</Text>
                </View>
              </TouchableHighlight>
            </View>
            <Text style={{textAlign: 'center'}}>
              Don’t have an account?{' '}
              <Pressable
                onPress={() => navigation.navigate('Register')}
                style={{color: '#EFC81A', margin: 0, padding: 0}}>
                <Text style={{color: '#EFC81A', margin: 0, padding: 0}}>
                  Sign Up
                </Text>
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
