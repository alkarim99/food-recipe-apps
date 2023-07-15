/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  ScrollView,
  View,
  Image,
  Text,
  Pressable,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

function DetailRecipe(props) {
  const {navigation, route} = props;
  const {recipe} = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  const [ingredients, SetIngredients] = React.useState(true);
  const [video, SetVideo] = React.useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleIngredients = () => {
    SetIngredients(true);
    SetVideo(false);
  };

  const handleVideo = () => {
    SetIngredients(false);
    SetVideo(true);
  };

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <Image
            source={{uri: recipe.recipePicture}}
            style={{
              width: '100%',
              height: 400,
              resizeMode: 'cover',
            }}
          />
          <View
            style={{
              position: 'absolute',
              margin: 20,
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 6,
              paddingBottom: 6,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 100,
            }}>
            <Pressable onPress={() => navigation.navigate('Home')}>
              <Icon name="arrow-left" size={30} color="#fff" />
            </Pressable>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
            }}>
            <Text numberOfLines={2} style={styles.recipeName}>
              {recipe.title}
            </Text>
            {/* <Text style={styles.recipeAuthor}>By Chef Abdullah Al-Karim</Text> */}
          </View>
        </View>
        <View style={styles.recipeDetail}>
          <View style={styles.navbar}>
            <Pressable onPress={handleIngredients}>
              <Text
                style={
                  ingredients == true
                    ? styles.navbarTextActive
                    : styles.navbarText
                }>
                Ingredients
              </Text>
            </Pressable>
            <Pressable onPress={handleVideo}>
              <Text
                style={
                  video == true ? styles.navbarTextActive : styles.navbarText
                }>
                Video Step
              </Text>
            </Pressable>
          </View>
          {ingredients == true ? (
            recipe.ingredients.split(', ').map((ingredient, index) => {
              return (
                <>
                  <Text style={styles.ingredient} key={index}>
                    - {ingredient}
                  </Text>
                </>
              );
            })
          ) : (
            <>
              <View>
                <YoutubePlayer
                  height={300}
                  play={false}
                  videoId={recipe.videoLink.split('/')[3]}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  recipeName: {
    color: 'black',
    textShadowColor: '#EFC81A',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginLeft: 20,
    marginBottom: 35,
    fontSize: 35,
    fontWeight: 'bold',
  },
  recipeAuthor: {
    marginLeft: 20,
    marginBottom: 30,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  recipeDetail: {
    marginTop: -20,
    padding: 25,
    paddingBottom: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  navbar: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 30,
  },
  navbarText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
  },
  navbarTextActive: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#EFC81A',
  },
  ingredient: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default DetailRecipe;
