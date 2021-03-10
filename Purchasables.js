import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Purchasables extends React.Component{
    
    render(){
       return     this.props.count >= this.props.cost ?  <View style={this.props.style}><Button color='#c46c25' onPress = {this.props.addPurchase.bind(this, this.props.cost, this.props.type)} title={this.props.title + " Kost: " + this.props.cost}></Button></View>:
       null

    }
    
}