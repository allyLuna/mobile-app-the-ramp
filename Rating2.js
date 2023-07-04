import * as  React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import { AirbnbRating, Rating} from 'react-native-ratings';


const Rating2 = () => {
  
  return(
    <View style={styles.container}>
        
        <Rating
        style={styles.con}
        type='star' 
        selectedColor='#FF6000'
        unselectColor= 'lightgray'
        showRating={false}
        ratingCount={5}
        startingValue={2}
         imageSize={25}
         ratingBackgroundColor='#FFA559'
        />
   
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    
  },
  con:{
    width: 50,
    height: 45,
    marginBottom: 490,
    marginLeft: 25
  }
  
})

export default Rating2;

