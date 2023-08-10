/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {GiftedChat} from 'react-native-gifted-chat';
import EmojiSelector from 'react-native-emoji-selector';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

function Chat(props) {
  const {navigation} = props;
  const [messages, setMessages] = React.useState([]);
  const [showEmoji, setShowEmoji] = React.useState(false);
  const [text, setText] = React.useState('');
  const state = useSelector(state => state);
  const [profile, setProfile] = React.useState([]);

  React.useEffect(() => {
    if (state?.authSlice?.token == '') {
      navigation.navigate('Login');
    } else {
      setProfile(state?.authSlice?.userData);
      setMessages([
        {
          _id: 1,
          text: 'Hello users, enjoy this food recipe apps!',
          image:
            'https://womensfitness.co.uk/wp-content/uploads/sites/3/2022/11/Shutterstock_1675475479.jpg?w=900',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: require('../assets/profile-icon.jpg'),
          },
        },
      ]);
      database()
        .ref()
        .orderByValue('date')
        .once('value')
        .then(snapshot => {
          const data = snapshot.val();
          const dataMessages = [];
          for (let key in data) {
            dataMessages.unshift(data[key].messages);
          }
          dataMessages.map(item => {
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, item),
            );
          });
        });
    }
  }, []);

  const onSend = React.useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const newReference = database().ref().push();
    newReference
      .set({
        messages,
        date: `${new Date()}`,
      })
      .then(() => console.log('Data updated.'));
  }, []);

  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          style={{marginRight: 20}}>
          <Icon name="chevron-left" size={30} color="#EEC302" />
        </Pressable>
        <Text style={styles.nameText}>Community Chat</Text>
      </View>
      <View style={styles.body}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: profile?.id,
            name: profile?.name,
            avatar: profile?.profilePicture,
          }}
          alwaysShowSend
          onInputTextChanged={value => {
            setShowEmoji(false);
            setText(value);
          }}
          textInputProps={{onSubmitEditing: () => setShowEmoji(false)}}
          text={text}
          renderActions={() => (
            <View style={{height: '100%', justifyContent: 'center', left: 5}}>
              <TouchableOpacity
                onPress={() => {
                  setShowEmoji(true);
                  Keyboard.dismiss();
                }}>
                <Icon name="smile-o" size={20} />
              </TouchableOpacity>
            </View>
          )}
        />
        {showEmoji ? (
          <EmojiSelector
            onEmojiSelected={emoji => setText(`${text}${emoji}`)}
          />
        ) : null}
      </View>
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
  nameText: {
    color: '#000',
    fontSize: 20,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Chat;
