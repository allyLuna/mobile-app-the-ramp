import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet,Text, Pressable, TouchableOpacity} from 'react-native';

export default function App({ bgColor, onPress, text}) {
    return ( 
      <TouchableOpacity 
        onPress={onPress} 

        style=
          {[styles.container,
            bgColor ? {backgroundColor: bgColor} : {} ]}>
        <Text 
          style=
            {[styles.buttonText]}>{text}</Text>
        <StatusBar style="auto" />
      </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    container:{
        width: '80%',
        marginTop: 10,
        backgroundColor: '#FF6000',
        borderRadius: 30,
        alignItems: 'center',
    },

    buttonText: {
        color: '#FFF',
        padding: 15,
        fontSize: 16,
        fontWeight: 'bold',
    }
  });