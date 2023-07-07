import React, { Component } from 'react'
import { Button, StyleSheet, View, Text, Alert, Pressable, Image} from 'react-native'
import Logo from '../Logo.js';
import {NavigationProp} from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/core';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import CustomButton from '../components/CustomButton';

export default function Home() {
  const navigation = useNavigation()

  
  const handleSignOut = () => {
    FIREBASE_AUTH.signOut()
  }

    
    return(

        <><View>
             <Image style={[styles.logo, {width:200}]} source = {require('../assets/logo.png')} />
            <Text style={styles.tagline}>NO RULES. JUST SKATE.</Text>
        </View>
        
        <View>
        
        <View style={styles.con2}>
        <CustomButton 
        text="Find Skate Ramps"
        onPress={()=>navigation.navigate('Map')} />

            <CustomButton 
        text="Signout"
        bgColor="black"
        onPress={()=>handleSignOut()} />
        </View>
        </View></>
    )
}
   
const styles = StyleSheet.create({
    tagline: {
      
        position: 'absolute',
        width: 183,
        height: 24,
        marginLeft: 95,
        marginTop: 350,
        justifyContent: 'center',
        color: '#FFA559',
        fontWeight: 'bold',
        marginBottom: 35,
    },
    
     btnstyle: {
      alignItems: 'center',
        justifyContent: 'center',
        marginTop: 250,
        marginLeft: 75,
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#FFA559',
        width: 200
      },
      btnstyle2: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'black',
        width: 200,
        marginLeft: 75,
      },

      btnTitle:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
      logo:{
        width: 200,
        marginTop: 100,
        marginLeft: 75
      },
      con2:{
        alignItems:'center',
        marginTop: 90
      }
})

