import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect,useRef} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
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

  const bottomref = useRef(new Animated.Value(50)).current;
  const leftref = useRef(new Animated.Value(0)).current;
  const cookieBounce = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.parallel([
      Animated.timing(bottomref, {
          toValue: 0,
          duration: 300
      }),
      Animated.timing(leftref, {
          toValue: 60,
          duration: 300
      })
    ]).start(() => {

    });
  };
  
  {/* If the cookieautocount is updated, activate the counter that adds a cookie to the bonuscookie every 1 second. */}
  useEffect(() => {
    const interval = setInterval(() => autoCookie(), perSecBoost);
    return () => {
      clearInterval(interval);
    };
  }, [cookieAutoCount]);

  function autoCookie(){
    if(boostStart == true){
    modifyCookieAutoCount(cookieAutoCount+1);
    }
  }

    {/* When a purchase is made, subtract the cost of that purchase, then apply the bonusses for that purchase. */}
  function addPurchase(cost, type){
    {/* If the type of the purchase is a perSecBoost, subtract the cost of the upgrade, make the next upgrade more expensive,
    and decrease the amount of time it takes for a cookie to be added, then start the per second booster. */}
    if(type == "perSecBoost"){
    modifyCookieCount(cookieCount-cost)
    modifyCostCount(Math.round(costCount*1.5));
    perSecBoost = perSecBoost*0.88;
    boostStart = true;

    {/* If the type of the purchase is a perClickBoost, subtract the cost of the purchase, then multiply the cost of the next upgrade and
    increase the amount of cookies you get per click with 1 */}
    }else if(type == "perClickBoost"){
      modifyCookieCount(cookieCount-cost)
      modifyCostCountClick(costCountClick*2);
      perClickBoost++;
    }

  }
  
  return (
    /* Echo's the app, the Purchasables tag is the purchasables.js component. This is a flexible component i made, you can give it some props
    and the component will handle the rest:
    Type: (perSecBoost, perClickBoost) This determines the type of the purchasable, see the addPurchase function.
    Count: Passes the cookieCount state to the component.
    Title: Give the purchasable a name.
    Cost: Pass the cost, in this case the cost is variable because it will kep rising. */
    <View style={styles.container}>
      <Text>Cookiebonus: {cookieAutoCount}</Text>
      <Text>Totale Cookies: {cookieCount}</Text>
      {/* TouchableOpacity is needed to make use of Onpress prop */} 
      <Animated.Image style={[styles.bouncingcookie, {left: leftref, bottom: bottomref}]} source={require('./images/cookie.png')}></Animated.Image>
      <TouchableOpacity onPress = {addCookie, cookieBounce}>
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
  
  bouncingcookie: {
    position: 'absolute',
    left: '50%',
    bottom: '50%',
    width: 50,
    height: 50,
  },
});




