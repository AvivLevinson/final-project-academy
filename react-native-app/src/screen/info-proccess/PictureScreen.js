import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView,SafeAreaView } from 'react-native';

// UI Components
import MyButton from '../../components/MyButton';
import Title from '../../components/Title';

import { TakeImage } from '../../utils/TakeImage.js';

import LottieView from 'lottie-react-native';


import {usePresonalDetails, TYPES} from '../../context/PersonalDetailsContext';




export default function PictureScreen({ navigation }) {
  const [imgList, setImgList] = useState([]);
  const [imgBase64, setImgBase64] = useState({});
  const [counter, setCounter] = useState(0);

  const {dispatch} = usePresonalDetails();

  useEffect(() => {
    if (imgList.length != 0) {
      setCounter(counter + 1);
    }
  }, [imgList]);

  const displayImg = async () => {
    TakeImage(setImgList, setImgBase64);
  };

  const handleSubmit = async () => {
    console.log('handle Submit PictureScreen');
    try{
      
      await dispatch({
        type: TYPES.SET_IMAGE,
        payload: {
          image: imgBase64,
        },
      });
  
      navigation.navigate('SendData');
      
    } catch(error){

      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{flex:1,marginHorizontal: 5,}}>
    <View style={styles.container}>
      <View style={styles.title}>
        <Title title={'take a picture of your face'} />
        <Text>total picture: ({counter}/3)</Text>
      </View>

      <View style={styles.bodyContainer}>
      <LottieView
      style={styles.aniLottie}
      source= { require('../../../assets/lottie/selfie-phone.json')}
      autoPlay
      />
      </View>
      <View style={styles.imgContainer}>
        {imgList ? (
          imgList.map((img, key) => {
            return (
              <Image
                source={{ uri: img }}
                key={key}
                style={{ width: '48%', height: 180, margin:3}}
                resizeMode="cover"
              />
            );
          })
        ) : (
          <View />
        )}
      </View>

      {counter != 2 ? (
        <View style={styles.btnContainer}>
          <MyButton handleClick={displayImg} title={'Take Picture'} />
        </View>
      ) : (
        <View style={styles.btnContainer}>
          <MyButton handleClick={handleSubmit} title={'Next'} />
        </View>
      )}
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
  },

  bodyContainer: {
    flex: 0.9,
  },

  imgContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 0.6,
    justifyContent:'space-between'
  },
  btnContainer: {
    alignItems: 'center',
    margin:5,
  },

  aniLottie:{
    width:'100%',

  }
});

/*
<View style={styles.container}>
      <View style={styles.title}>
        <Text>take a picture of your face</Text>
        <Text>totle picture: (1/3)</Text>
      </View>

      <View style={styles.bodyContainer}>
        <Image source={snapImage} style={styles.img} resizeMode="contain" />
      </View>
      {hasTakePicture ? (


      <View style={styles.imgContainer}>
        <ImgPicker/>
        </View>
        ) :
        (
          <View></View>
        )
        }
      
      
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={ displayImg }
            activeOpacity={0.5}>
            <Text style={styles.textInsideButton}> take a picture </Text>
          </TouchableOpacity>
        </View>
    </View>


*/

//! i can create reducer that have all the action that i need : enter the loction, enter the name and etc....

//! and use the react context to provider the reducer and have on state and on action to make.
