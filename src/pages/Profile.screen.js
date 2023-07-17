/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  useColorScheme,
  ScrollView,
  View,
  Image,
  Text,
  Pressable,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import BottomNav from '../components/BottomNav';
import {useSelector, useDispatch} from 'react-redux';
import {addAuth} from '../store/reducers/authSlice';

function Profile(props) {
  const {navigation} = props;
  const isDarkMode = useColorScheme() === 'dark';
  const state = useSelector(state => state);
  const [profile, setProfile] = useState([]);
  const dispatch = useDispatch();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {width, height} = Dimensions.get('window');

  React.useEffect(() => {
    if (Object.keys(state.authSlice.userData).length == 0) {
      navigation.navigate('Login');
    } else {
      setProfile(state?.authSlice?.userData);
    }
  }, []);

  const handleLogout = () => {
    dispatch(
      addAuth({
        userData: {},
        token: '',
      }),
    );
    navigation.navigate('Home');
  };

  return (
    <>
      <View
        style={{
          width,
          height,
        }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View style={{backgroundColor: '#EEC302'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 80,
                paddingBottom: 40,
              }}>
              <Image
                // source={require('../assets/profile-icon.jpg')}
                source={
                  {uri: profile?.profilePicture} ??
                  require('../assets/profile-icon.jpg')
                }
                style={styles.profileIcon}
              />
              <Text
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                {profile.fullname}
              </Text>
            </View>
          </View>
          <View style={styles.profileCard}>
            <View style={styles.list}>
              <View
                style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                <Icon name="user" size={30} color="#EEC302" />
                <Text style={{fontSize: 16, color: 'black'}}>Edit Profile</Text>
              </View>
              <Icon name="angle-right" size={30} color="black" />
            </View>
            <View style={styles.list}>
              <View
                style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                <Icon name="cloud-upload" size={25} color="#EEC302" />
                <Text style={{fontSize: 16, color: 'black'}}>My Recipe</Text>
              </View>
              <Icon name="angle-right" size={30} color="black" />
            </View>
            <View style={styles.list}>
              <View
                style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                <Icon name="save" size={30} color="#EEC302" />
                <Text style={{fontSize: 16, color: 'black'}}>Saved Recipe</Text>
              </View>
              <Icon name="angle-right" size={30} color="black" />
            </View>
            <View style={styles.list}>
              <View
                style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                <Icon name="heart" size={30} color="#EEC302" />
                <Text style={{fontSize: 16, color: 'black'}}>Liked Recipe</Text>
              </View>
              <Icon name="angle-right" size={30} color="black" />
            </View>
            <Pressable onPress={handleLogout}>
              <View style={styles.list}>
                <View
                  style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                  <Icon name="sign-out" size={30} color="#EEC302" />
                  <Text style={{fontSize: 16, color: 'black'}}>Logout</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </ScrollView>
        <BottomNav navigation={props.navigation} active={'Profile'} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileIcon: {
    padding: 20,
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profileCard: {
    marginTop: -30,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    paddingBottom: 300,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Profile;
