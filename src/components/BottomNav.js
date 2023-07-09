/* eslint-disable prettier/prettier */
import React from 'react';

import {StyleSheet, View, Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

function BottomNav(props) {
  const {navigation, active} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Icon
          name="home"
          size={30}
          color={active == 'Home' ? '#eeeeee' : '#6e80b0'}
          style={active == 'Home' ? styles.iconActive : styles.icon}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Icon
          name="plus"
          size={30}
          color={active == 'Login' ? '#eeeeee' : '#6e80b0'}
          style={active == 'Login' ? styles.iconActive : styles.icon}
        />
      </Pressable>
      <Icon name="comment" size={30} color="#6e80b0" style={styles.icon} />
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <Icon
          name="user"
          size={30}
          color={active == 'Profile' ? '#eeeeee' : '#6e80b0'}
          style={active == 'Profile' ? styles.iconActive : styles.icon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  iconActive: {
    padding: 20,
    backgroundColor: '#EEC302',
    borderRadius: 20,
  },
  icon: {
    padding: 20,
  },
});

export default BottomNav;
