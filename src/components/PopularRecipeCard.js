/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Image, Text, Pressable} from 'react-native';

function PopularRecipeCard(props) {
  const {recipe, navigation, from} = props;
  return (
    <>
      <Pressable
        onPress={() => navigation.navigate('DetailRecipe', {recipe, from})}>
        <View style={styles.popularCard}>
          <Image
            source={{uri: recipe?.recipePicture}}
            style={styles.popularImage}
          />
          <View>
            <Text style={styles.popularText} numberOfLines={1}>
              {recipe?.title}
            </Text>
            <Text>spicy, salted</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  popularCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    gap: 20,
  },
  popularText: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
  },
  popularImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
});

export default PopularRecipeCard;
