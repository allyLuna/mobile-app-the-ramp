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
import { ref, onValue} from 'firebase/database';
import {USER} from './SignUp'
import { useNavigation } from '@react-navigation/core';
export let avg;
var SRComment = [];
  var cmt =[];
const FetchData = () =>{
    /*const [newData, setNewData] = useState([]);
    useEffect(() => {
        const starCountRef = ref(FIRESTORE_DB, skateSpots[SkateIndex].title);
        onValue(starCountRef, (snapshot) =>{
          const data = snapshot.val();
          const newRatings = Object.keys(data).map(key =>({
            id: key,
            ...data[key]
          }));
          console.log(newRatings);
          setNewData(newRatings);
        });
    },[]);*/
//GETCOMMENTS

  // collection ref
const colRef = collection(FIRESTORE_DB, skateSpots[SkateIndex].title)    
// realtime collection data
  onSnapshot(colRef, (snapshot) => {
    SRComment = []
      snapshot.docs.forEach(doc => {
      // ratings.push({ ...doc.data(), id: doc.id })(doc.get('comment'))
      SRComment.push(doc.get('comment'))
          })  
    console.log('Data:',SRComment);
})
cmt = SRComment;

    return(
        <View style={styles.container}>
        
        <Text>hello{SRComment[0]}</Text>
            
        
      </View>
    )
  }

  export default FetchData;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
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
  