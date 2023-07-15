/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Image,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import EmojiSelector from 'react-native-emoji-selector';
import {useSelector, useDispatch} from 'react-redux';

function Chat(props) {
  const {navigation} = props;
  const [messages, setMessages] = React.useState([]);
  const [showEmoji, setShowEmoji] = React.useState(false);
  const [text, setText] = React.useState('');
  const [user, setUser] = React.useState(null);
  const state = useSelector(state => state);
  const [profile, setProfile] = React.useState([]);

  React.useEffect(() => {
    if (Object.keys(state.authSlice.userData).length == 0) {
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
    }
  }, []);

  const onSend = React.useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
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
            _id: 1,
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
