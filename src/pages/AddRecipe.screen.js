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
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {addAuth} from '../store/reducers/authSlice';

function AddRecipe(props) {
  const {navigation} = props;
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [title, SetTitle] = React.useState([]);
  const [videoLink, SetVideoLink] = React.useState([]);
  const [ingredients, SetIngredients] = React.useState([]);

  React.useEffect(() => {
    if (Object.keys(state.authSlice.userData).length == 0) {
      navigation.navigate('Login');
    }
  }, []);

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
      <ScrollView style={{padding: 10}}>
        <View style={{paddingBottom: 100}}>
          <TextInput
            style={styles.inputActive}
            onChangeText={SetTitle}
            value={title}
            placeholder="Recipe Title"
          />
          <TextInput
            style={styles.input}
            onChangeText={SetVideoLink}
            value={videoLink}
            placeholder="Video Link"
          />
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            onChangeText={SetIngredients}
            value={ingredients}
            placeholder="Ingredients"
          />
          <View style={{margin: 12}}>
            <TouchableHighlight underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>CREATE</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
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
  input: {
    height: 50,
    margin: 12,
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
