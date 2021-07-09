import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

import { usePresonalDetails } from '../../context/PersonalDetailsContext';
import { useAuth } from '../../context/AuthContext';

import {Api} from '../../api';

export default function SendData() {

  const [lodaing, setLoading] = useState(true);

  const { state } = usePresonalDetails();
  const { setIsCompelteLogin } = useAuth();


  const render = async ()=>{
      try {

        //const data = await Api.completeLoginProcess(state);
        setLoading(true);
        setIsCompelteLogin(true);
        //setToken(data.token);

        if (!data) {
          console.log('Error');
        } else {
          setLoading(!lodaing);
          setToken(data.token);
        }
      } catch (error) {
        console.log(error);
      } 


  }

  
  useEffect(() => {
    console.log('useEffect send Data');
    render();

  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" animating={true} color="#0000ff" />

      <Text>Send Data</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
