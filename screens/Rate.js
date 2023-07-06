import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, FlatList} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomMultiline from '../components/CustomMultiline';
import ReviewItem from '../components/reviewItem';
import Header from '../components/header';
import Logo from '../assets/Silangan.jpg'; 
import skateSpots from '../Spots';
import { SkateIndex } from  './Map.js';
import { FIRESTORE_DB } from '../FirebaseConfig';
import {Rating} from 'react-native-ratings';
import { Firestore } from 'firebase/firestore';
import {firebase} from 'firebase/app'
const db = FIRESTORE_DB;
export default function Rate() {
  
  const todoRef = db(db).collection('New Park')
  
  const [skateSpot, setSkateSpot] = useState('');
  const [uname, setUname] = useState('USER1');
  const [comment, setComment] = useState('');
  const [SKRating, setSKRating] = useState(0);

  const onSubmitReview = () => {
    console.warn("Submit Review");
    setUname('USER 1');
  }

  const getRatingVal =(value) => {
    console.log(value)
  }


  //add new data to collection
  const addData = () => {
    // check if we have new field data
    if (username && username.length && comment && comment.length && SKRating && SKRating.length > 0){
        //get the timestamp
        
        const data = {
            username: uname,
            comment : comment,
            Rating  : SKRating,
          
        };
        todoRef
          .add(data)
          .then(() => {
              // release the new field state
              setUname(''),
              setComment(''),
              setSKRating(0);
          })
          .catch((error) => {
            // show an alert in case of error
            alert(error);
          })
    }
  }

  return (
    
    <><Header /><View style={styles.container}>

      <Text style={styles.header}>{skateSpots[SkateIndex].title}</Text>

      <Image
        source={skateSpots[SkateIndex].image}
        style={[styles.SkateSpot]}
        resizeMode='cover' /><Text style={styles.desc}>{skateSpots[SkateIndex].description}</Text>


      <View style={styles.content}>

        <View style={styles.list}>
          <Text style={styles.headerText} bgColor="#FF6000"> Rate:</Text>
          <Rating
            style={styles.con}
            type='star'
            selectedColor='#FF6000'
            unselectColor='lightgray'
            showRating={false}
            ratingCount={5}
            startingValue={2}
            imageSize={25}
            ratingBackgroundColor='#FFA559' 
            onChange={this.getRatingVal}
            />
        </View>

        <CustomMultiline placeholder="Leave comments about the place"
          onChangeText={(text) => setComment(text)}
        />

      </View>
      <CustomButton
        text="Submit Rating"
        onPress={addData()} />

      <StatusBar style="auto" />
    </View></>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },

  content: {
    width: '90%',
  },
  
  headerText:{
    padding: 10,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 10,
    backgroundColor: '#FFA559',
    textAlign: 'center',
    width: 75
  },
  header:{
    padding: 10,
    marginTop: 10,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 10,
    backgroundColor: '#FFA559',
    textAlign: 'center',
    width: 300
  },
  desc:{
    marginBottom: 10,
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'white',
    textAlign: 'center',
    width: 200,
    fontStyle:'italic',
    borderBottomWidth: 1
  },
  SkateSpot: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  rate:{

    marginTop: 15,
    marginBottom: 15,
    marginLeft: 95,
    position: 'absolute'
  },
  list:{
    borderWidth: 2,
    borderColor: '#FFA559',
    borderRadius: 15,
    padding: 5,
    
  },
  btn:{
    position: 'absolute',
    marginTop: 500,
    alignItems: 'center',
    width:'100%'
  },
  con:{
    position: 'absolute',
   marginLeft: 100,
   marginTop: 13
  }
});
