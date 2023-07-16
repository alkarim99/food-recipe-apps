/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, ScrollView, View, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import axios from 'axios';

import PopularRecipeCard from '../components/PopularRecipeCard';

function Result(props) {
  const {navigation, route} = props;
  const {result} = route.params;

  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={{marginRight: 20}}>
          <Icon name="chevron-left" size={30} color="#EEC302" />
        </Pressable>
        <Text style={styles.headerText}>Search Recipe Result</Text>
      </View>
      <ScrollView style={{padding: 10}}>
        {result?.length != 0 ? (
          result?.map((recipe, index) => {
            return (
              <PopularRecipeCard
                navigation={props.navigation}
                recipe={recipe}
                key={index}
                from={'home'}
              />
            );
          })
        ) : (
          <Text style={{textAlign: 'center'}}>Recipe not found</Text>
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

export default Result;
