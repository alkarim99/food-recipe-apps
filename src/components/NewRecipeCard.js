/* eslint-disable prettier/prettier */
import React from 'react';

import {StyleSheet, View, Image, Text, Pressable} from 'react-native';

function NewRecipeCard(props) {
  const {recipe, navigation} = props;
  return (
    <>
      <Pressable onPress={() => navigation.navigate('DetailRecipe', {recipe})}>
        <View
          style={{
            marginRight: 15,
          }}>
          <Image
            source={{uri: recipe?.recipePicture}}
            style={{
              width: 150,
              height: 200,
              resizeMode: 'cover',
              borderRadius: 15,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
            }}>
            <Text numberOfLines={2} style={styles.newRecipeText}>
              {recipe?.title}
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  newRecipeText: {
    color: 'black',
    textShadowColor: '#EFC81A',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    margin: 12,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NewRecipeCard;
