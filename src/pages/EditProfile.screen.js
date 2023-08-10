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
  TouchableHighlight,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Snackbar} from 'react-native-paper';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {addAuth} from '../store/reducers/authSlice';
import {launchImageLibrary} from 'react-native-image-picker';

const createFormData = photo => {
  const data = new FormData();

  data.append('photo', {
    name: photo?.assets[0]?.fileName,
    type: photo?.assets[0]?.type,
    uri:
      Platform.OS === 'ios'
        ? photo?.assets[0]?.uri.replace('file://', '')
        : photo?.assets[0]?.uri,
  });

  return data;
};

function EditProfile(props) {
  const {navigation} = props;
  const state = useSelector(state => state);
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const [profile, setProfile] = React.useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    if (state?.authSlice?.token == '') {
      navigation.navigate('Login');
    } else {
      setProfile(state?.authSlice?.userData);
    }
  }, []);

  const [fullname, onChangeFullname] = React.useState(profile?.fullname);
  const [phonenumber, onChangePhonenumber] = React.useState(
    profile?.phoneNumber,
  );
  const [photo, setPhoto] = React.useState(null);
  const [errorMessages, setErrorMessages] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUpdateProfile = () => {
    setIsLoading(true);
    const token = state?.authSlice?.token;
    const myRecipes = state?.authSlice?.myRecipes;
    if (photo != null) {
      const payload = createFormData(photo);
      axios
        .patch('https://vast-mite-smock.cyclic.app/users/photo', payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          axios
            .get('https://vast-mite-smock.cyclic.app/users')
            .then(response => {
              const data = response?.data?.data[0];
              dispatch(
                addAuth({
                  userData: data,
                  token,
                  myRecipes,
                }),
              );
            })
            .catch(error => {
              setErrorMessages(error?.response?.data?.message);
            });
        })
        .catch(error => {
          setErrorMessages(error?.response?.data?.message);
        });
    }
    axios
      .patch('https://vast-mite-smock.cyclic.app/users', {
        fullname: fullname,
        phoneNumber: phonenumber,
      })
      .then(response => {
        const data = response?.data?.data[0];
        dispatch(
          addAuth({
            userData: data,
            token,
            myRecipes,
          }),
        );
        setIsSuccess(true);
      })
      .catch(error => {
        setErrorMessages(error?.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateProfilePicture = () => {
    setIsLoading(true);
    if (photo != null) {
      const payload = createFormData(photo);
      axios
        .patch('https://vast-mite-smock.cyclic.app/users/photo', payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          const token = state?.authSlice?.token;
          const myRecipes = state?.authSlice?.myRecipes;
          axios
            .get('https://vast-mite-smock.cyclic.app/users')
            .then(responseData => {
              const data = responseData?.data?.data[0];
              dispatch(
                addAuth({
                  userData: data,
                  token,
                  myRecipes,
                }),
              );
            })
            .catch(error => {
              console.log(error);
            });
          setIsSuccess(true);
        })
        .catch(error => {
          setErrorMessages(error?.response?.data?.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setErrorMessages('Photo profile not found');
      setIsLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.navigate('Profile')}
            style={{marginRight: 20}}>
            <Icon name="chevron-left" size={30} color="#EEC302" />
          </Pressable>
          <Text style={styles.nameText}>Edit Profile</Text>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View>
            {photo?.assets ? (
              photo?.assets[0]?.uri ? (
                <>
                  <Image
                    source={{
                      uri: photo?.assets[0]?.uri,
                    }}
                    style={styles.profileIcon}
                  />
                </>
              ) : (
                <Image
                  source={
                    {uri: profile?.profilePicture} ??
                    require('../assets/profile-icon.jpg')
                  }
                  style={styles.profileIcon}
                />
              )
            ) : (
              <Image
                source={
                  {uri: profile?.profilePicture} ??
                  require('../assets/profile-icon.jpg')
                }
                style={styles.profileIcon}
              />
            )}

            <TouchableHighlight
              underlayColor="white"
              onPress={handleChoosePhoto}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Choose Profile Picture</Text>
              </View>
            </TouchableHighlight>
            {/* <TouchableHighlight
              underlayColor="white"
              onPress={handleUpdateProfilePicture}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {isLoading ? 'Loading...' : 'Save Profile Picture'}
                </Text>
              </View>
            </TouchableHighlight> */}

            <TextInput
              style={styles.inputActive}
              onChangeText={onChangeFullname}
              placeholder="Name"
              name="fullname"
              defaultValue={profile?.fullname}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangePhonenumber}
              placeholder="Phone Number"
              name="phoneNumber"
              keyboardType="numeric"
              defaultValue={profile?.phoneNumber}
            />
            <TouchableHighlight
              underlayColor="white"
              onPress={handleUpdateProfile}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {isLoading ? 'Loading...' : 'Save Profile'}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <Snackbar
            visible={isSuccess}
            style={{backgroundColor: '#79C079'}}
            onDismiss={() => navigation.navigate('Profile')}
            duration={2000}>
            Edit profile success
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
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  nameText: {
    color: '#000',
    fontSize: 20,
  },
  profileIcon: {
    padding: 20,
    margin: 20,
    width: 150,
    height: 150,
    borderRadius: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
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
    margin: 12,
  },
  buttonText: {
    textAlign: 'center',
    padding: 12,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default EditProfile;
