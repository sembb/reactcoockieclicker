import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Purchasables from './Purchasables';

var boostStart = false;
var perSecBoost = 1000;
var perClickBoost = 1;

export default function App(props) {
  {/* Make the state that holds the amount of clicked cookies, automated cookies. The cost of an upgrade, and the cookies you get per click. */}
  const [cookieAutoCount, modifyCookieAutoCount] = useState(0)
  const [cookieCount, modifyCookieCount] = useState(0)
  const [costCount, modifyCostCount] = useState(10)
  const [costCountClick, modifyCostCountClick] = useState(10)

  
  
  {/* If the cookieautocount is updated, activate the counter that adds a cookie to the bonuscookie every 1 second. */}
  useEffect(() => {
    const interval = setInterval(() => autoCookie(), perSecBoost);
    return () => {
      clearInterval(interval);
    };
  }, [cookieAutoCount]);

  function autoCookie(){
    console.log(boostStart);
    if(boostStart == true){
    modifyCookieAutoCount(cookieAutoCount+1);
    }
  }

    {/* When a purchase is made, subtract the cost of that purchase, then apply the bonusses for that purchase. */}
  function addPurchase(cost, type){
    if(type == "perSecBoost"){
    modifyCookieCount(cookieCount-cost)
    modifyCostCount(costCount+10);
    perSecBoost = perSecBoost*0.85;
    console.log(perSecBoost);
    boostStart = true;
    }else if(type == "perClickBoost"){
      modifyCookieCount(cookieCount-cost)
      modifyCostCountClick(costCountClick*2);
      perClickBoost++;
    }

  }
  
  return (
    <View style={styles.container}>
      <Text>Cookiebonus: {cookieAutoCount}</Text>
      <Text>Totale Cookies: {cookieCount}</Text>
      {/* TouchableOpacity is needed to make use of Onpress prop */} 
      <TouchableOpacity onPress = {addCookie}>
        <Image style={styles.image} source={require('./images/cookie.png')}/>
      </TouchableOpacity>
        <Purchasables type="perSecBoost" addPurchase={addPurchase} count={cookieCount} title='Koekjesslaaf' cost={costCount}/>
        <Purchasables type="perClickBoost" addPurchase={addPurchase} count={cookieCount} title='Clickboost' cost={costCountClick}/>
      <StatusBar style="auto" />
    </View>
  );

  function addCookie(){
    {/* Add a cookie and resets the cookie bonus. */}
    modifyCookieCount(cookieCount+cookieAutoCount+perClickBoost)
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




