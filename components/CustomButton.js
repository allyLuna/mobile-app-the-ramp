import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet,Text, Pressable, TouchableOpacity} from 'react-native';

export default function App({ onPress, text, type = "PRIMARY"}) {
    return ( 
      <TouchableOpacity 
        onPress={onPress} 
        style=
          {[styles.container, 
            /*styles['container_$'+{type}]*/]}>
        <Text 
          style=
            {[styles.buttonText , 
              /*styles['buttonText_$'+{type}]*/]}>{text}</Text>
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

    container_PRIMARY:{
        backgroundColor: '#FF6000',
    },

    container_TERTIARY  :{
        backgroundColor: 'pink',
    },

    buttonText: {
        color: '#FFF',
        padding: 15,
        fontSize: 16,
        fontWeight: 'bold',
    },

    buttonText_TERTIARY : {
        color: '#000000',
    },
  });