import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Purchasables from './Purchasables';


export default function App(props) {
  {/* Make the state that holds the amount of cookies */}
  const [cookieCount, modifyCookieCount] = useState(0)

  function addPurchase(count){
    modifyCookieCount(cookieCount-count)
  }
  
  return (
    <View style={styles.container}>
      <Text>{cookieCount}</Text>
      {/* TouchableOpacity is needed to make use of Onpress prop */} 
      <TouchableOpacity onPress = {addCookie}>
        <Image style={styles.image} source={require('./images/cookie.png')}/>
      </TouchableOpacity>
        <Purchasables addPurchase={addPurchase} count={cookieCount} title='Koekjesslaaf' cost="10"/>
      <StatusBar style="auto" />
    </View>
  );

  function addCookie(){
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
    marginTop: 10,
    width: 100,
    height: 100,
    resizeMode: 'contain' },
});




