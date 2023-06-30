import * as  React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import { AirbnbRating, Rating} from 'react-native-ratings';


const Rating2 = () => {
  
  return(
    <SafeAreaView style={styles.container}>
        
        <Rating
        type='star' 
        selectedColor='#FF6000'
        unselectColor= 'lightgray'
        showRating={false}
        ratingCount={5}
        startingValue={2}
         imageSize={20}
        />
   
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin: 10,
    justifyContent: 'center'
  },
  textStyle:{
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20
  },
  customRatingBarStyle:{
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  
  },
  starImgStyle:{
    width: 40,
    height: 40,
   
    
  },
  btnStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FFA559'
  }
})

export default Rating2;

