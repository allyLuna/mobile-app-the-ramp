import * as  React from 'react';
import MapView, {Callout, Circle, Marker} from 'react-native-maps';
import { Image ,Dimensions, StyleSheet, View, Text, TextInput, Button, Animated, ScrollView, Pressable,  TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import skateSpots from '../Spots.js'
import StarRating from '../components/StarRating.js';
import { useNavigation } from '@react-navigation/core';
import Header from '../components/header';



const { width, height } = Dimensions.get("window");
export const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export let SkateIndex = 0;



export default function Map() {
  const navigation = useNavigation();
  const [spot, setSpot] = React.useState(0);
  const [address, setAddress] = React.useState('');
  const [pin, setPin] = React.useState({
      latitude: 14.6026439,
      longitude: 121.0029067,
      });

    Location.setGoogleApiKey("AIzaSyA4HDbV51yqB8e3uRlTCr1-MbLU_5TNpBY");

        const Spot = (x) => {
            setSpot(x);console.log(spot)
            SkateIndex = x;
            return spot;
            
          }
          
          

      //set input text para dito beh
        const geocode = async () => {
        const geocodedLocation = await Location.geocodeAsync(address);
        console.log("Geocoded Address:");
        console.log(geocodedLocation);
        // setPin({
        // latitude: geocodedLocation[0].latitude,
          //longitude: geocodedLocation[0].longitude,
        //});
        }


      //PERMISSION ACCESS TO LOCATION
      React.useEffect(() => {
          (async () => {
              let { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== "granted") {
                  console.log("Permission to access location was denied");
                  return;
              }

              let location = await Location.getCurrentPositionAsync({});
              console.log(location);
              setPin({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
              });
              
          })();
      }, []);

 
      let mapIndex = 0;
      let mapAnimation = new Animated.Value(0);

      React.useEffect(() => {
        mapAnimation.addListener(({ value }) => {
          let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
          if (index >= skateSpots.length) {
            index = skateSpots.length - 1;
          }
          if (index <= 0) {
            index = 0;
          }
          clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const { location } = skateSpots[index];
          _map.current.animateToRegion(
            {
              ...location,
              latitudeDelta: 0.005,
              longitudeDelta: 0.06,
            },
            350
          );
        }
      }, 10);
    });
  });
        
          //UPON PRESS CARD POSITION WILL BE RENDERED
          const onMarkerPress = (mapEventData) => {
          const markerID = mapEventData._targetInst.return.key;

          let x = (markerID * CARD_WIDTH) + (markerID * 20); 
          if (Platform.OS === 'android') {
          x = x - SPACING_FOR_CARD_INSET;
          }

         _scrollView.current.scrollTo({x: x, y: 0, animated: true});
        }

        const _map = React.useRef(null);
        const _scrollView = React.useRef(null);
          
        //SHOWING SKATE SPOTS 
          const showSkateSpots = () => {
            return skateSpots.map((item, index) =>{
            
              return(
                  
                <Marker
                key={index}
                  coordinate={item.location}
                title={item.title}
                  description={item.description}
                  onPress={(e)=>onMarkerPress(e)} 
                  style={styles.marker}
                image={require('../assets/skate.png')}
                />
              )
            })
          }

        
          
        //MAIN VIEW
          return (
            <>
            <Header/>

            <View style={styles.container}>
              <MapView style={styles.map}
               ref={_map}
                initialRegion={{ 
                  latitude: 14.6026439,
                  longitude: 121.0029067,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.06,}}
                showsUserLocation={true}
                onUserLocationChange={(e) => {
              console.log("onUserLocationChange", e.nativeEvent.coordinate);
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            } }
              >
             
              {showSkateSpots()}
                
                <Marker
                  coordinate={pin}
                  pinColor="gold"
                  draggable
                  onDragStart={(e) => {
                    console.log("Drag Start", e.nativeEvent.coordinate);
                  } }
                  onDragEnd={(e) => {
                    console.log("Drag End", e.nativeEvent.coordinate);

                    setPin({
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    });
                  }}
                ></Marker>

                <Circle center={pin} radius={4000} />
              </MapView>
              
              
              <View style={styles.obj1}>
              <Text style={styles.obj1txt}>Find Skate Spots Near You</Text>
              </View>
              

                <View style={styles.obj3}>
                  <Animated.ScrollView
                   ref={_scrollView}
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH + 20}
                    snapToAlignment="center"
                    style={styles.scrollView}
                    contentInset={{
                      top: 0,
                      left: SPACING_FOR_CARD_INSET,
                      bottom: 0,
                      right: SPACING_FOR_CARD_INSET
                      }}
                    contentContainerStyle={{
                      paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                      }}
                      
                    >
                    
                    {skateSpots.map((marker, index) =>(
                      
                      
                    <View style={styles.card} key={index}>
                      <Image 
                        source={marker.image}
                        style={styles.cardImage}
                        resizeMode="cover"
                      />
                      <View style={styles.textContent}>
                        <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                        <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                        <StarRating ratings={marker.rating}/>
                        <Pressable style={styles.btnstyle}
                                  onPress={ () => { navigation.navigate('Directions'); {Spot(index)}}} >
                           <Text style={styles.btnTitle}>Directions</Text>
                              </Pressable>
                              <Pressable style={[styles.btnstyle, {position:'absolute', marginLeft: 200, marginTop: 55}]} 
                                  onPress={ () => { navigation.navigate('Rate'); {Spot(index)}}} > 
                           <Text style={styles.btnTitle}>Rate</Text>
                              </Pressable>
                      </View>

                    </View>
                  ))}
                </Animated.ScrollView>
                </View>

            </View></>
  );
}


const styles = StyleSheet.create({
  
  btnstyle: {
    alignItems: 'center',
   height: 25,
    borderRadius: 10,
    elevation: 1,
    backgroundColor: '#FFA559',
    position:'absolute',
    width: 80,
    marginLeft: 115, 
    marginTop: 55
  },

  img:{
    marginLeft: 10,
    position: 'absolute',
    width: 35,
    height: 35,
  },

  appname:{
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 18,
    marginLeft: 145,
    marginTop: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  map: {
    width:'100%',
    height: '100%',
    
  },

  obj1:{
    flex: 1,
    width: '65%',
    marginTop: 10,
    marginBottom: 10,
    height: 45,
    position: 'absolute',
    backgroundColor: '#FFA559',
    borderRadius: 15,
  },

  obj1txt:{

    fontSize: 14,
    textAlign: 'center',
    marginTop: 13,
    fontWeight: 'bold'
  },

  obj2:{
    flex: 1,
    width: '65%',
    marginTop: 65,
    marginBottom: 10,
    height: 75,
    position: 'absolute',
    backgroundColor: '#497174',
    borderRadius: 15,
  },

  obj2txt:{
   
    fontSize: 14,
    textAlign: 'left',
    marginTop: 13,
    marginLeft: 10,
    color:'#fff',
    fontWeight: 'bold'
  },

  input1:{
  borderWidth: 1,
  borderColor:'#777',
  padding: 8,
  marginTop: 5,
  width: 200,
  height: 30,
  marginLeft: 10,
  backgroundColor: '#fff'
  },

  obj3:{
    flex: 1,
    width: "100%",
    marginTop: 430,
    height: 200,
    position: 'absolute',
    backgroundColor: 'rgba(100, 100, 100, 0.0)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding:5
  },
  card:{
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    backgroundColor:'#fff',
    width:CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 5,
  },

  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
   textContent: {
    flex: 2,
    padding: 10,
    marginBottom: 35
  },
  cardtitle: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
 btnTitle: {
  fontSize: 12,
  fontWeight: 'bold',
  marginTop:3.5
}
});
