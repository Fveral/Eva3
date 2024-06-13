import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { NavigationProp } from '@react-navigation/native';

// ...

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<unknown[]>([]);
  const user = auth().currentUser;

  useEffect(() => {
    const onValueChange = database()
      .ref('/posts')
      .on('value', snapshot => {
        const data = snapshot.val() ? Object.values(snapshot.val()) : [];
        setPosts(data);
      });

    return () => database().ref('/posts').off('value', onValueChange);
  }, []);

  const handleAddPost = () => {
    if (!user) {
      
      Alert.alert('Usuario no autentificado');
      return;
    }

    if (!newPost.trim()) {
      alert('La entrada no puede estar vacía!');
      return;
    }

    const postRef = database().ref('/posts').push();
    postRef.set({
      id: postRef.key,
      email: user.email,
      content: newPost,
    });

    setNewPost('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="¿Qué opina de ITSQMET??"
        value={newPost}
        onChangeText={setNewPost}
      />
      <Button title="Add Post" onPress={handleAddPost} />
      <FlatList

        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }: { item: { id: string; content: string } }) => ( 
            <TouchableOpacity
                onPress={() => navigation.navigate('Detalle', { post: item })}
          >
            <Text style={styles.post}>{item.content}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  post: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;

