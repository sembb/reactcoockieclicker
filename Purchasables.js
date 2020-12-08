import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Purchasables extends React.Component{
    
    render(){
console.log(this.props);
       return     this.props.count >= this.props.cost ?  <Button onPress = {this.props.addPurchase.bind(this, this.props.cost)}></Button>:
       null

    }
}