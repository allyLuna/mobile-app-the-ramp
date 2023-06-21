import React, { Component } from 'react'
import { Button, StyleSheet, View, Text, Alert, Pressable} from 'react-native'
import Logo from './Logo.js';


const Home = (props) => {

    const { onPress, title = 'FIND RAMPS' } = props;
    return(

        <><View>
            <Logo />
            <Text style={styles.tagline}>NO RULES. JUST SKATE.</Text>
        </View>
        
        <View>
        <Pressable style={styles.btnstyle}
            title="LOGIN"
            onPress={() => Alert.alert('Simple Button pressed')} >
                <Text style={styles.btnTitle}>{title}</Text>
            </Pressable>
        </View></>
    )
}
   
const styles = StyleSheet.create({
    tagline: {
      
        position: 'absolute',
        width: 183,
        height: 24,
        left:65,
        top: 250,
        justifyContent: 'center',
        color: '#FFA559',
        fontWeight: 'bold',
        marginBottom: 35,
    },
    
     btnstyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#FFA559',
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
      },

      btnTitle:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      }
})

export default Home