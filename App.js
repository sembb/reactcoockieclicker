import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Purchasables from './Purchasables';


export default function App(props) {
  {/* Make the state that holds the amount of cookies */}
  const [cookieAutoCount, modifyCookieAutoCount] = useState(0)
  const [cookieCount, modifyCookieCount] = useState(0)
  const [costCount, modifyCostCount] = useState(10)
  const [perClickBoost, setBoost] = useState(1)
  

  useEffect(() => {
    const interval = setInterval(() => autoCookie(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [cookieAutoCount]);

  function autoCookie(){
    modifyCookieAutoCount(cookieAutoCount+1)
    console.log(cookieAutoCount);
  }

  function addPurchase(count){
    modifyCookieCount(cookieCount-count)
    modifyCostCount(costCount+10);
    setBoost(perClickBoost+1)
  }
  
  return (
    <View style={styles.container}>
      <Text>{cookieAutoCount}</Text>
      <Text>{cookieCount}</Text>
      {/* TouchableOpacity is needed to make use of Onpress prop */} 
      <TouchableOpacity onPress = {addCookie}>
        <Image style={styles.image} source={require('./images/cookie.png')}/>
      </TouchableOpacity>
        <Purchasables addPurchase={addPurchase} count={cookieCount} title='Koekjesslaaf' cost={costCount}/>
      <StatusBar style="auto" />
    </View>
  );

  function addCookie(){
    {/* Add a cookie */}
    modifyCookieCount(cookieCount+cookieAutoCount+1)
    modifyCookieAutoCount(cookieAutoCount - cookieAutoCount)
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




