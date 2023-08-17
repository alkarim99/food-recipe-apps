/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Searchbar, Snackbar} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import database from '@react-native-firebase/database';
import {useSelector, useDispatch} from 'react-redux';
import {addAuth} from '../store/reducers/authSlice';

import NewRecipeCard from '../components/NewRecipeCard';
import PopularRecipeCard from '../components/PopularRecipeCard';
import BottomNav from '../components/BottomNav';

function Home(props) {
  const state = useSelector(state => state);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const {width, height} = Dimensions.get('window');

  const [newRecipes, SetNewRecipes] = React.useState([]);
  const [popularRecipes, SetPopularRecipes] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('https://vast-mite-smock.cyclic.app/recipes?sortType=DESC&page=1')
      .then(response => {
        SetNewRecipes(response?.data?.data);
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get('https://vast-mite-smock.cyclic.app/recipes?sortType=ASC&page=1')
      .then(response => {
        SetPopularRecipes(response?.data?.data);
      })
      .catch(error => {
        console.log(error);
      });
    // database()
    //   .ref()
    //   .on('value', snapshot => {
    //     console.log(snapshot.val());
    //   });
  }, []);

  const handleSearch = searchQuery => {
    axios
      .get(`https://vast-mite-smock.cyclic.app/recipes?keyword=${searchQuery}`)
      .then(response => {
        let result = [];
        if (response?.data?.status) {
          result = response?.data?.data;
        }
        const title = 'Search Recipe Result';
        props.navigation.navigate('Result', {result, title});
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCategory = category => {
    axios
      .get(`https://vast-mite-smock.cyclic.app/recipes/category/${category}`)
      .then(response => {
        let result = [];
        if (response?.data?.status) {
          result = response?.data?.data;
        }
        const title = `${category} Category`;
        props.navigation.navigate('Result', {result, title});
      })
      .catch(error => {
        console.log(error);
      });
  };

  let displayNewRecipes = [];
  let displayPopularRecipes = [];
  for (let index = 0; index < 5; index++) {
    displayNewRecipes.push(newRecipes[index]);
    displayPopularRecipes.push(popularRecipes[index]);
  }

  return (
    <>
      <View
        style={{
          width,
          height,
        }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={{padding: 15}}>
            <Searchbar
              placeholder="Search Pasta, Bread, etc"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={{marginBottom: 23}}
              onSubmitEditing={event => {
                handleSearch(searchQuery);
              }}
            />
            {/* Popular For You */}
            <View style={{marginBottom: 20}}>
              <Text style={styles.titleText}>Popular For You</Text>
            </View>
            <ScrollView horizontal>
              <View
                style={{
                  marginBottom: 30,
                  flexDirection: 'row',
                  gap: 15,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleCategory('rice');
                  }}>
                  <Image
                    style={styles.icon}
                    source={require('../assets/fried-rice.png')}
                  />
                  <Text style={styles.iconText}>Rice</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleCategory('noodle');
                  }}>
                  <Image
                    style={styles.icon}
                    source={require('../assets/noodles.png')}
                  />
                  <Text style={styles.iconText}>Noodle</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleCategory('soup');
                  }}>
                  <Image
                    style={styles.icon}
                    source={require('../assets/soup.png')}
                  />
                  <Text style={styles.iconText}>Soup</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleCategory('dessert');
                  }}>
                  <Image
                    style={styles.icon}
                    source={require('../assets/affogato.png')}
                  />
                  <Text style={styles.iconText}>Dessert</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleCategory('spicy');
                  }}>
                  <Image
                    style={styles.icon}
                    source={require('../assets/chili-pepper.png')}
                  />
                  <Text style={styles.iconText}>Spicy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleCategory('uncategorized');
                  }}>
                  <Image
                    style={styles.icon}
                    source={require('../assets/other.png')}
                  />
                  <Text style={styles.iconText}>Others</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            {/* End of Popular For You  */}
            {/* New Recipes */}
            <View style={{marginBottom: 10}}>
              <Text style={styles.titleText}>New Recipes</Text>
            </View>
            <ScrollView
              horizontal
              style={{
                marginBottom: 23,
              }}>
              {displayNewRecipes?.length != 0 ? (
                displayNewRecipes?.map((recipe, index) => {
                  return (
                    <NewRecipeCard
                      navigation={props.navigation}
                      recipe={recipe}
                      key={index}
                    />
                  );
                })
              ) : (
                <Text style={{textAlign: 'center'}}>New Recipes is Empty</Text>
              )}
            </ScrollView>
            {/* End of New Recipes  */}
            {/* Popular Recipes */}
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.titleText}>Popular Recipes</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('More')}>
                <Text>More Info</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{marginBottom: 100}}>
              {displayPopularRecipes?.length != 0 ? (
                displayPopularRecipes?.map((recipe, index) => {
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
                <Text style={{textAlign: 'center'}}>
                  Popular Recipes is Empty
                </Text>
              )}
            </ScrollView>
            {/* End Popular Recipes */}
          </View>
        </ScrollView>
        {/* Bottom Navigation */}
        <BottomNav navigation={props.navigation} active={'Home'} />
        {/* End of Bottom Navigation */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Airbnb Cereal',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  icon: {
    width: 75,
    height: 75,
  },
  iconText: {
    marginTop: 5,
    fontFamily: 'Airbnb Cereal',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  popularText: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '800',
    color: 'black',
  },
  popularCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    gap: 20,
  },
});

export default Home;
