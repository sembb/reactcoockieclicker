import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect,useRef} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing, ImageBackground } from 'react-native';
import Purchasables from './Purchasables';

var boostStart = false;
var perSecBoost = 1000;
var perClickBoost = 1;
var cookieBounceCount = 0;

export default function App(props) {
  {/* Make the state that holds the amount of clicked cookies, automated cookies. The cost of an upgrade, and the cookies you get per click. */}
  const [cookieAutoCount, modifyCookieAutoCount] = useState(0)
  const [cookieCount, modifyCookieCount] = useState(0)
  const [costCount, modifyCostCount] = useState(10)
  const [costCountClick, modifyCostCountClick] = useState(10)

  const [elementArray,setElementArray] = useState([]);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rotation = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      
    }).start(rotateAnim.setValue(0));
  }
  
  const cookieBounce = () => {
    cookieBounceCount++;
    var bottompos = new Animated.Value(50);
    var leftpos = new Animated.Value(50);
    // Will change fadeAnim value to 1 in 5 seconds
    setElementArray(elementArray.concat(<Animated.Image style={[styles.bouncingcookie, {left: leftpos.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%']
    }), bottom: bottompos.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%']
    })}]} source={require('./images/cookie.png')}></Animated.Image>))
    console.log(elementArray);
    Animated.parallel([
      Animated.timing(bottompos, {
          toValue: getRandomArbitrary(-100, 100),
          duration: 500
      }),
      Animated.timing(leftpos, {
          toValue: getRandomArbitrary(-100, 100),
          duration: 500
      })
    ]).start(() => {

    });
    if(elementArray.length > 50){
      var remaining = elementArray;
      remaining.splice(0, 1);
      console.log(remaining);
      setElementArray(remaining);
    }
    
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

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  
  return (
    /* Echo's the app, the Purchasables tag is the purchasables.js component. This is a flexible component i made, you can give it some props
    and the component will handle the rest:
    Type: (perSecBoost, perClickBoost) This determines the type of the purchasable, see the addPurchase function.
    Count: Passes the cookieCount state to the component.
    Title: Give the purchasable a name.
    Cost: Pass the cost, in this case the cost is variable because it will kep rising. */
    <View style={styles.container}>
      <ImageBackground source={require('./images/1751302.jpg')} style={styles.backImg}>
      { elementArray }
      <View style={styles.btngr}>
            <Purchasables style={styles.buttonb} type="perSecBoost" addPurchase={addPurchase} count={cookieCount} title='Koekjesslaaf' cost={costCount}/>
            <Purchasables type="perClickBoost" addPurchase={addPurchase} count={cookieCount} title='Clickboost' cost={costCountClick}/>
          </View>
        <View style={{position:'absolute',left:'50%',marginLeft:-50,top:'50%',marginTop:-50, display:'flex', alignItems: 'center'}}>
          
          <View style={styles.countText}>
            <Text style={styles.countTextPad}>Cookiebonus: {cookieAutoCount}</Text>
            <Text style={styles.countTextPad}>Totale Cookies: {cookieCount}</Text>
          </View>
          {/* TouchableOpacity is needed to make use of Onpress prop */} 
          <TouchableOpacity onPress = {() => {addCookie(); cookieBounce(); rotation();}}>
            
            <Animated.Image style={[styles.image, {transform: [{rotate: rotateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
            })}]}]} source={require('./images/cookie.png')}/>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </View>
  );

  function addCookie(){
    {/* Add a cookie and resets the cookie bonus. */}
    modifyCookieCount(cookieCount+cookieAutoCount+perClickBoost)
    modifyCookieAutoCount(cookieAutoCount - cookieAutoCount)
  }

}

const styles = StyleSheet.create({
  btngr: {
    position: 'absolute',
    left: 10,
    top: 10,
  },

  countText: {
    backgroundColor: 'rgba(196, 108, 37, 0.70)',
    borderRadius: 4,
  },

  backImg: {
    position:'absolute', width: '100%', height: '100%'
  },

  countTextPad: {
    padding: 10,
    fontSize: 20,
    color: 'white',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  buttonb: {
    marginBottom: 10,
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
    marginBottom: -100,
    marginLeft: -25,

  },

});




