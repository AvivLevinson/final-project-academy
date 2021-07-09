import React, { useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import {usePresonalDetails, TYPES} from '../../context/PersonalDetailsContext';

//images
import smileImg from '../../../assets/img/smile.png';

//components
import { description } from '../../constant/text/description.js';

import Form from '../../components/Form';

export default function DeatilsScreen({ navigation }) {
  
  const {dispatch} = usePresonalDetails();

  const handleSubmitForm = async (values) => {
    try {
    
      await dispatch({
        type: TYPES.SET_INFO,
        payload: {
          info: values,
        },
      });
      navigation.navigate('Location');
      
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView style={styles.container}>
        <ScrollView style = {styles.scrollView}>
          <View style={styles.imageContainer}>
            <Image source={smileImg} style={{ width: '100%' }} resizeMode="contain" />
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.textDescription}>{description}</Text>
          </View>
          <Form handleSubmitForm={handleSubmitForm} />
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    padding: 10,
    margin: 5,
    width: '100%',
  },

  descriptionContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 3,
  },

  textDescription: {
    color: '#4756DF',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },

  textInput: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#4756DF',
    width: '47%',
  },
  scrollView: {
    marginHorizontal: 10,
  },
});
