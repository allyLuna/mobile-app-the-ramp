import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, FlatList, Pressable} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomMultiline from '../components/CustomMultiline';
import reviewItem from '../components/reviewItem';
import Header from '../components/header';
import skateSpots from '../Spots';
import { SkateIndex } from  './Map.js';
import { FIRESTORE_DB } from '../FirebaseConfig';
import {Rating} from 'react-native-ratings';
import {collection, addDoc, onSnapshot, QuerySnapshot, getDoc, doc, DocumentSnapshot} from 'firebase/firestore'
import {USER} from './SignUp'
import { useNavigation } from '@react-navigation/core';
export let avg;
//export let SKTitle;

export default function Rate() {
  const [newData, setNewData] = useState([]);
  const [comment, setComment] = useState('');
  const [SKRating, setSKRating] = useState();
  const navigation = useNavigation();
  var [ratings, setRating] = useState([]);
  var [SRComment, setSRComment] = useState([]);
  var cmt ='';
  //SKTitle = skateSpots[SkateIndex].title;

        //GET DATA FOR RATING AVERAGE
        const getDATA = () => {
            // collection ref
          const colRef = collection(FIRESTORE_DB, skateSpots[SkateIndex].title)    
          // realtime collection data
            onSnapshot(colRef, (snapshot) => {
              ratings = []
                snapshot.docs.forEach(doc => {
                 // ratings.push({ ...doc.data(), id: doc.id })
                 ratings.push(doc.get('Rating'))
                    })  
              console.log('Data:',ratings);
          })
        }


        //GET DATA FOR RATING AVERAGE
        const getComments = () => {
          // collection ref
        const colRef = collection(FIRESTORE_DB, skateSpots[SkateIndex].title)    
        // realtime collection data
          onSnapshot(colRef, (snapshot) => {
            SRComment = []
              snapshot.docs.forEach(doc => {
              // ratings.push({ ...doc.data(), id: doc.id })
              SRComment.push(doc.get('comment'))
                  })  
            console.log('Data:',SRComment[0]);
        })
        cmt = SRComment[0];
        }

      

      // add new data
      const addData = async () => {
      const doc = addDoc(collection(FIRESTORE_DB, skateSpots[SkateIndex].title), {
        email: USER,
        comment: comment,
        Rating: SKRating
      })
      console.log(doc)
    }

    //GET AVERAGE
     getAverage = () => {
      avg = ratings.reduce((a,b) => a + parseFloat(b),0) / ratings.length;
      console.log('AVERAGE', avg)
    }

    // get rating value
    function ratingCompleted(rating) {
      console.log("Rating is: " + rating)
      setSKRating(rating);
    }
    
    {getComments()};
  return (
    
    <><Header /><View style={styles.container}>

      <Text style={styles.header}>{skateSpots[SkateIndex].title}</Text>

      <Image
        source={skateSpots[SkateIndex].image}
        style={[styles.SkateSpot]}
        resizeMode='cover' /><Text style={styles.desc}>{skateSpots[SkateIndex].description}</Text>


        <View style={styles.review}>
            
            <Text>{SRComment[0]}</Text>
          
        </View>

      <View style={styles.content}>

        <View style={styles.list}>
          <Text style={styles.headerText} bgColor="#FF6000"> Rate:</Text>
          <Rating
            name ='Rating'
            style={styles.con}
            type='star'
            selectedColor='#FF6000'
            unselectColor='lightgray'
            showRating={false}
            ratingCount={5}
            startingValue={0}
            imageSize={25}
            ratingBackgroundColor='#FFA559' 
            onFinishRating={(val)=>ratingCompleted(val)}
            />
        </View>

        <CustomMultiline placeholder={"Leave comments about the place"}
         value={comment} 
        setValue={setComment}
        />

      </View>
      <CustomButton
        text="Submit Rating"
        onPress={() => {addData(); alert('Rating Submitted')}} />
        <CustomButton
        text=" Rating"
        onPress={() => {getDATA(); getAverage();}} />



    
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
  },
  review:{
      color: '#000',
      padding: 16,
      marginTop: 10,
      borderRadius: 10,
      borderStyle: "dashed",
      backgroundColor: "#D6E4E5",
      height: 50,
      width: 320,
      marginBottom: 10
  }
});
