import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, FlatList, Pressable, TouchableHighlight, KeyboardAvoidingView} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomMultiline from '../components/CustomMultiline';
import reviewItem from '../components/reviewItem';
import Header from '../components/header';
import skateSpots from '../Spots';
import { SkateIndex } from  './Map.js';
import { FIRESTORE_DB } from '../FirebaseConfig';
import {Rating} from 'react-native-ratings';
import {collection, addDoc, onSnapshot, QuerySnapshot, getDoc, doc, DocumentSnapshot} from 'firebase/firestore'
import { ref, onValue} from 'firebase/database';
import {USER} from './SignUp'
import { useNavigation } from '@react-navigation/core';

export let avg;
//export let SKTitle;
var comment1 = " ";
var comment2 = " ";
export default function Rate() {
  const colRef = collection(FIRESTORE_DB, skateSpots[SkateIndex].title)    

  const [comment, setComment] = useState('');
  const [SKRating, setSKRating] = useState();
  const navigation = useNavigation();
  var [ratings, setRating] = useState([]);
  var [SRComment, setSRComment] = useState([]);
  
      //getComments
      const  getComments =  () => {
          // realtime collection data
         // useEffect(() =>{
            onSnapshot(colRef, (snapshot) => {
              SRComment = []
                  snapshot.docs.forEach(doc => {
                  // ratings.push({ ...doc.data(), id: doc.id })(doc.get('comment'))
                    SRComment.push(doc.get("comment"))
                      })  
                  console.log('Data Comment:', SRComment[0]);
                  comment1 = SRComment[0];
                  comment2 = SRComment[1];
                  console.log('Data Comment1:', comment1);
                })
               // },[])
              }

              {getComments();}

            //GET DATA FOR RATING AVERAGE
        const getDATA = () => {
              // realtime collection data
              onSnapshot(colRef, (snapshot) => {
                ratings = []
                  snapshot.docs.forEach(doc => {
                  // ratings.push({ ...doc.data(), id: doc.id })
                    ratings.push(doc.get('Rating'))
                      })  
                  console.log('Data:',ratings);
                  //console.log('tHISIS:',  SRComment[0]);
              })
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
        const getAverage = () => {
          avg = ratings.reduce((a,b) => a + parseFloat(b),0) / ratings.length;
          console.log('AVERAGE', avg)
        }

        // get rating value
        function ratingCompleted(rating) {
          console.log("Rating is: " + rating)
          setSKRating(rating);
        }
 
    
   return (
    
    <><Header /><KeyboardAvoidingView style={styles.container}>

      <Text style={styles.header}>{skateSpots[SkateIndex].title}</Text>

      <Image
        source={skateSpots[SkateIndex].image}
        style={[styles.SkateSpot]}
        resizeMode='cover' /><Text style={styles.desc}>{skateSpots[SkateIndex].description}</Text>


        <View style={styles.review}>
         <Text style={styles.cmt}> {comment1} </Text>
        </View>
        <View style={styles.review}>
         <Text style={styles.cmt}>{comment2}</Text>
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
        onPress={() => {addData(); alert('Rating Submitted');getDATA(); getAverage(); navigation.navigate('Home')}} />
     <StatusBar style="auto" />
    </KeyboardAvoidingView></>
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
      marginTop: 5,
      borderRadius: 10,
      borderStyle: "dashed",
      backgroundColor: "#D6E4E5",
      height: 50,
      width: 320,
      marginBottom: 10
  },
  cmt:{
    fontStyle: 'italic'
  }
});
