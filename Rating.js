import * as  React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';

const Rating = () => {
  const [defaultRating, setDefaultRating] = React.useState(1)
  const [maxRating, setMaxRating] = React.useState([1,2,3,4,5])

  const starImgFilled = require('./assets/star_filled.png');
  const starImgCorner = require('./assets/star_corner.png');

  const CustomRatingBar = () => {
    return(
      <View style={styles.customRatingBarStyle}>
        {
          maxRating.map((item, key) => {
            return(
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => setDefaultRating(item)}
              >

              <Image
                style={styles.starImgStyle}
                source={
                  item <= defaultRating
                    ? {starImgFilled}
                    : {starImgCorner}
                }
              />


              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }


  return(
    <SafeAreaView style={styles.container}>
        <CustomRatingBar/>
        <Text style={styles.textStyle}>
          {defaultRating + ' / ' + maxRating.length}
        </Text>
        <TouchableOpacity 
          activeOpacity={0.7}
          style={styles.btnStyle}
          onPress={()=> alert(defaultRating)}
        >
          <Text>Get Rating Value</Text>
        </TouchableOpacity>
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
    resizeMode: 'cover',
    
  },
  btnStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FFA559'
  }
})

export default Rating;

