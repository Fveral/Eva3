
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Post } from '../types'; // Import the 'Post' type from the appropriate location

type RootStackParamList = {
  Home: undefined;
  Detalle: { post: Post };
};

type DetalleScreenRouteProp = RouteProp<RootStackParamList, 'Detalle'>;
type DetalleScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detalle'>;

type Props = {
  route: DetalleScreenRouteProp;
  navigation: DetalleScreenNavigationProp;
};

const DetalleScreen: React.FC<Props> = ({ route, navigation }) => {
  const { post } = route.params;
  const [content, setContent] = useState(post?.content || '');
  const user = auth().currentUser;

  const handleUpdatePost = () => {
    if (!user) {
      
      Alert.alert('Usuario no autentificado');
      return;
    }

    if (post.email !== user.email) {
      alert('Sólo puedes editar tus propios mensajes!');
      return;
    }

    database().ref(`/posts/${post.id}`).update({ content });
    navigation.navigate('Home');
  };

  const handleDeletePost = () => {
    if (!user) {
      
      Alert.alert('Usuario no autentificado');
      return;
    }

    if (post.email !== user.email) {
      alert('Sólo puedes borrar tus propios mensajes!');
      return;
    }

    database().ref(`/posts/${post.id}`).remove();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>Email: {post.email}</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />
      <Button title="Update Post" onPress={handleUpdatePost} />
      <Button title="Delete Post" onPress={handleDeletePost} />
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
});

export default DetalleScreen;
