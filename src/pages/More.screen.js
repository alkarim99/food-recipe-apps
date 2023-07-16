/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, ScrollView, View, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import axios from 'axios';

import PopularRecipeCard from '../components/PopularRecipeCard';

function More(props) {
  const {navigation} = props;
  const [recipes, SetRecipes] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('https://vast-mite-smock.cyclic.app/recipes?sortType=DESC')
      .then(response => {
        SetRecipes(response?.data?.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={{marginRight: 20}}>
          <Icon name="chevron-left" size={30} color="#EEC302" />
        </Pressable>
        <Text style={styles.headerText}>Popular Recipe</Text>
      </View>
      <ScrollView style={{padding: 10}}>
        {recipes?.length != 0 ? (
          recipes?.map((recipe, index) => {
            return (
              <PopularRecipeCard
                navigation={props.navigation}
                recipe={recipe}
                key={index}
                from={'more'}
              />
            );
          })
        ) : (
          <Text style={{textAlign: 'center'}}>Popular Recipes is Empty</Text>
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

export default More;
