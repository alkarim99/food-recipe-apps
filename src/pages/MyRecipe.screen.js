/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

import PopularRecipeCard from '../components/PopularRecipeCard';

function MyRecipe(props) {
  const isDarkMode = useColorScheme() === 'dark';
  const {navigation} = props;
  const [recipes, SetRecipes] = React.useState([]);
  const state = useSelector(state => state);
  const [profile, setProfile] = React.useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    if (Object.keys(state.authSlice.userData).length == 0) {
      navigation.navigate('Login');
    } else {
      setProfile(state?.authSlice?.userData);
      SetRecipes(state?.authSlice?.myRecipes);
    }
  }, []);
  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate('Profile')}
          style={{marginRight: 20}}>
          <Icon name="chevron-left" size={30} color="#EEC302" />
        </Pressable>
        <Text style={styles.headerText}>My Recipes</Text>
      </View>
      <ScrollView style={{padding: 10}}>
        {recipes?.length != 0 ? (
          recipes?.map((recipe, index) => {
            return (
              <PopularRecipeCard
                navigation={props.navigation}
                recipe={recipe}
                key={index}
                from={'myrecipe'}
              />
            );
          })
        ) : (
          <Text style={{textAlign: 'center'}}>Your Recipes is Empty</Text>
        )}
      </ScrollView>
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
  headerText: {
    color: '#000',
    fontSize: 20,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MyRecipe;
