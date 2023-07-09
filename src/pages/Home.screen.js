/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import NewRecipeCard from '../components/NewRecipeCard';
import PopularRecipeCard from '../components/PopularRecipeCard';
import BottomNav from '../components/BottomNav';

function Home(props) {
  const newRecipes = [
    {
      name: 'Bubur Sumsum',
      photo: require('../assets/bubur-sumsum.png'),
      ingredients: [
        'Tepung beras',
        'Air',
        'Santan',
        'Garam',
        'Daun pandan',
        'Gula merah',
      ],
      videoLink: 'https://youtu.be/fxHlUA5Kujs',
    },
    {
      name: 'Churros Keju',
      photo: require('../assets/churros-keju.png'),
      ingredients: [
        'Tepung terigu',
        'Baking powder',
        'Kaldu ayam',
        'Mentega',
        'Air',
        'Susu',
        'Telur ayam',
        'Keju cheddar',
        'Minyak',
        'Cokelat',
      ],
      videoLink: 'https://youtu.be/qLWoIor4pps',
    },
    {
      name: 'Mie Tek-Tek Kuah',
      photo: require('../assets/mie-tek-tek-kuah.png'),
      ingredients: [
        'Mie telur',
        'Telur ayam',
        'Air',
        'Sawi hijau',
        'Kol',
        'Buah tomat',
        'Batang seledri',
        'Daun bawang',
        'Kecap manis',
        'Kaldu ayam',
        'Minyak',
        'Bawang merah',
        'Bawang putih',
        'Kemiri',
        'Cabai merah',
        'Garam',
        'Merica',
      ],
      videoLink: 'https://youtu.be/6sdlhjRE2u0',
    },
    {
      name: 'Soun Goreng Cabe Hijau',
      photo: require('../assets/soun-goreng-cabe-hijau.png'),
      ingredients: [
        'Soun',
        'Buncis',
        'Bawang merah',
        'Bawang putih',
        'Cabai hijau',
        'Kecap manis',
        'Kaldu ayam',
        'Garam',
        'Minyak',
      ],
      videoLink: 'https://youtu.be/IeLDG2wrj60',
    },
    {
      name: 'Sup Buah',
      photo: require('../assets/sup-buah.png'),
      ingredients: [
        'Stroberi',
        'Blueberry',
        'Blackberry',
        'Anggur',
        'Delima',
        'Buavita orange',
        'Kelapa muda',
        'Es batu',
      ],
      videoLink: 'https://youtu.be/fxHlUA5Kujs',
    },
  ];

  const popularRecipes = [
    {
      name: 'Ayam Geprek Sambal Bawang',
      photo: require('../assets/ayam-geprek-sambal-bawang.png'),
      ingredients: [
        'Ayam',
        'Tepung maizena',
        'Telor ayam',
        'Royco kaldu ayam',
        'Ketumbar bubuk',
        'Garam',
        'Merica putih bubuk',
        'Tepung terigu',
        'Tepung Beras',
        'Baking powder',
        'Cabai rawit merah',
        'Bawang merah',
        'Bawang putih',
        'Minyak',
      ],
      videoLink: 'https://youtu.be/cuFQ0kFQfgs',
    },
    {
      name: 'Ayam Goreng Mentega',
      photo: require('../assets/ayam-goreng-mentega.png'),
      ingredients: [
        'Ayam',
        'Bawang putih',
        'Merica butiran',
        'Garam',
        'Kecap manis',
        'Mentega',
        'Bawang bombay',
        'Kecap inggris',
        'Kecap asin',
        'Air jeruk nipis',
      ],
      videoLink: 'https://youtu.be/TBq8A-jYKd4',
    },
    {
      name: 'Mie Goreng Sederhana',
      photo: require('../assets/mie-goreng-sederhana.png'),
      ingredients: [
        'Mie telor',
        'Taouge',
        'Sawi',
        'Ayam kampung',
        'Bawang putih',
        'Bawang merah',
        'Cabai rawit',
        'Garam',
        'Merica putih bubuk',
        'Gula pasir',
        'Kecap manis',
        'Minyak sayur',
        'Timun',
        'Bawang goreng',
      ],
      videoLink: 'https://youtu.be/46CsR1Ma0EA',
    },
    {
      name: 'Nasi Goreng Sederhana',
      photo: require('../assets/nasi-goreng-sederhana.png'),
      ingredients: [
        'Nasi putih',
        'Wortel',
        'Bawang putih',
        'Bawang merah',
        'Cabai merah',
        'Kecap manis',
        'Kaldu ayam',
        'Daun bawang',
        'Minyak goreng',
      ],
      videoLink: 'https://youtu.be/BQZEiWAZyKM',
    },
    {
      name: 'Rendang Ayam Rumahan',
      photo: require('../assets/rendang-ayam-rumahan.png'),
      ingredients: [
        'Ayam',
        'Air matang',
        'Santan',
        'Royco bumbu rendang',
        'Kacang merah',
        'Minyak sayur',
        'Bawang putih',
        'Bawang merah',
        'Jahe',
        'Cabai merah',
        'Cabai rawit merah',
      ],
      videoLink: 'https://youtu.be/GS4i96HVzKw',
    },
    {
      name: 'Tahu Telor Surabaya',
      photo: require('../assets/tahu-telor-surabaya.png'),
      ingredients: [
        'Tahu putih',
        'Telor ayam',
        'Kaldu ayam',
        'Merica putih bubuk',
        'Kol',
        'Taoge',
        'Minyak goreng',
        'Cabe rawit merah',
        'Bawang putih',
        'Kacang tanah goreng',
        'Air hangat',
        'Air jeruk nipis',
        'Kecap manis',
        'Bawang goreng',
        'Seledri',
      ],
      videoLink: 'https://youtu.be/B77Pf_PGl_Q',
    },
  ];

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={{padding: 15}}>
          <Searchbar
            placeholder="Search Pasta, Bread, etc"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{marginBottom: 23}}
          />
          {/* Popular For You */}
          <View style={{marginBottom: 10}}>
            <Text style={styles.titleText}>Popular For You</Text>
          </View>
          <View
            style={{
              marginBottom: 23,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Image
                style={styles.icon}
                source={require('../assets/icon-1.png')}
              />
              <Text style={styles.iconText}>Soup</Text>
            </View>
            <View>
              <Image
                style={styles.icon}
                source={require('../assets/icon-2.png')}
              />
              <Text style={styles.iconText}>Chicken</Text>
            </View>
            <View>
              <Image
                style={styles.icon}
                source={require('../assets/icon-3.png')}
              />
              <Text style={styles.iconText}>Seafood</Text>
            </View>
            <View>
              <Image
                style={styles.icon}
                source={require('../assets/icon-4.png')}
              />
              <Text style={styles.iconText}>Dessert</Text>
            </View>
          </View>
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
            {newRecipes.map((recipe, index) => {
              return (
                <NewRecipeCard
                  navigation={props.navigation}
                  recipe={recipe}
                  key={index}
                />
              );
            })}
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
            <Text>More Info</Text>
          </View>
          <ScrollView style={{marginBottom: 100}}>
            {popularRecipes.map((recipe, index) => {
              return (
                <PopularRecipeCard
                  navigation={props.navigation}
                  recipe={recipe}
                  key={index}
                />
              );
            })}
          </ScrollView>
          {/* End Popular Recipes */}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav navigation={props.navigation} active={'Home'} />
      {/* End of Bottom Navigation */}
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
