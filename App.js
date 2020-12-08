import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


export default function App() {
  {/* Make the state that holds the amount of cookies */}
  const [cookieCount, modifyCookieCount] = useState(0)
  
  return (
    <View style={styles.container}>
      <Text>{cookieCount}</Text>
      {/* TouchableOpacity is needed to make use of Onpress prop */} 
      <TouchableOpacity onPress = {plip}>
        <Image style={styles.image} source={require('./images/cookie.png')}/>
      </TouchableOpacity>\
      <StatusBar style="auto" />
    </View>
  );

  function plip(){
    {/* Add a cookie */}
    modifyCookieCount(cookieCount+1)
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },

  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain' },
});




