import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

export default function Header(){
    return(
    <View style={styles.header}>
    <Image style={styles.img} source = {require('../assets/minilogo.png')} />
            <Text style={styles.headerText}> THE RAMP </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 90,
        paddingTop: 38,
        borderBottomWidth: 0.5,
        borderBottomColor: '#777',
        
    },
     headerText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        position:'absolute',
        marginTop: 55,
        marginLeft: 140,
     },
     img:{
        marginTop: 45,
        marginLeft: 15,
        position: 'absolute',
        width: '10%',
        height: '80%',
      },
});