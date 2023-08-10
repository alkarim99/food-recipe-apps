/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  TextInput,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import {addAuth} from '../store/reducers/authSlice';

const createFormData = (photo, title, videoLink, ingredients, userId) => {
  const data = new FormData();

  data.append('recipePicture', {
    name: photo?.assets[0]?.fileName,
    type: photo?.assets[0]?.type,
    uri:
      Platform.OS === 'ios'
        ? photo?.assets[0]?.uri.replace('file://', '')
        : photo?.assets[0]?.uri,
  });

  data.append('title', title);
  data.append('ingredients', ingredients);
  data.append('videoLink', videoLink);
  data.append('user_id', userId);

  return data;
};

function AddRecipe(props) {
  const {navigation} = props;
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [photo, setPhoto] = React.useState(null);
  const [title, SetTitle] = React.useState([]);
  const [videoLink, SetVideoLink] = React.useState([]);
  const [ingredients, SetIngredients] = React.useState([]);
  const [isLoading, SetIsLoading] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    if (state?.authSlice?.token == 0) {
      navigation.navigate('Login');
    }
  }, []);

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleCreateRecipe = () => {
    SetIsLoading(true);
    const userId = state?.authSlice?.userData.id;
    const payload = createFormData(
      photo,
      title,
      videoLink,
      ingredients,
      userId,
    );
    axios
      .post('https://vast-mite-smock.cyclic.app/recipes', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        axios
          .get(`https://vast-mite-smock.cyclic.app/recipes?user_id=${userId}`)
          .then(responseRecipes => {
            const myRecipes = responseRecipes?.data?.data;
            dispatch(
              addAuth({
                userData: state?.authSlice?.userData,
                token: state?.authSlice?.token,
                myRecipes,
              }),
            );
          });
        setIsSuccess(true);
      })
      .catch(error => {
        setErrorMessages(error?.response?.data?.message);
      })
      .finally(() => {
        SetIsLoading(false);
      });
  };

  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={{marginRight: 20}}>
          <Icon name="chevron-left" size={30} color="#EEC302" />
        </Pressable>
        <Text style={styles.headerText}>Add New Recipe</Text>
      </View>
      <KeyboardAvoidingView>
        <ScrollView
          style={{padding: 10}}
          contentInsetAdjustmentBehavior="automatic">
          <View style={{paddingBottom: 1000}}>
            {photo?.assets[0]?.uri ? (
              <>
                <Image
                  source={
                    {
                      uri: photo?.assets[0]?.uri,
                    } ?? require('../assets/Group-697-1.png')
                  }
                  style={{
                    width: '100%',
                    height: '50%',
                    marginBottom: '10px',
                  }}
                />
              </>
            ) : (
              ''
            )}
            <View style={{margin: 12}}>
              <TouchableHighlight
                underlayColor="white"
                onPress={handleChoosePhoto}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Choose Recipe Picture</Text>
                </View>
              </TouchableHighlight>
            </View>
            <TextInput
              style={styles.inputActive}
              onChangeText={SetTitle}
              value={title}
              placeholder="Recipe Title"
            />
            <View style={{margin: 12}}>
              <TextInput
                style={styles.input}
                onChangeText={SetVideoLink}
                value={videoLink}
                placeholder="Video Link"
              />
              <Text>* Please use youtube link</Text>
            </View>
            <View style={{margin: 12}}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.input}
                onChangeText={SetIngredients}
                value={ingredients}
                placeholder="Ingredients"
              />
              <Text>
                * Write the ingredients with a comma separator (salt, paper,
                etc...)
              </Text>
            </View>
            <View style={{margin: 12}}>
              <TouchableHighlight
                underlayColor="white"
                onPress={handleCreateRecipe}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>
                    {isLoading ? 'Loading...' : 'CREATE'}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            <Snackbar
              visible={isSuccess}
              style={{backgroundColor: '#79C079'}}
              duration={2000}>
              Success Add Recipe
            </Snackbar>

            <Snackbar
              visible={Boolean(errorMessages)}
              style={{backgroundColor: '#CB3837'}}
              onDismiss={() => setErrorMessages(null)}
              action={{
                label: 'X',
                onPress: () => {
                  setErrorMessages(null);
                },
              }}>
              {errorMessages}
            </Snackbar>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  input: {
    height: 50,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  inputActive: {
    height: 50,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#EFC81A',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#EFC81A',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    padding: 12,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default AddRecipe;
