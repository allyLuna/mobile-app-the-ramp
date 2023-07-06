import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import skateSpots from '../Spots';
import {SkateIndex} from  './Map.js';
import Header from '../components/header';
//specific marker for locations (e.g., individual skate locations)

const Directions = () => {
    
    const [coordinates] = useState([
        {
          latitude: 14.5747352,
          longitude: 121.0976571,
        },
        {
          latitude: 14.629195,
          longitude: 121.076739,
        },
      ]);
      
      const [state, setState] = useState({
        time: 0,
        distance: 0,
       
    })
      
      const [pin, setPin] = React.useState({
        latitude: 14.6026439,
        longitude: 121.0029067,
        });

    //PERMISSION ACCESS TO LOCATION
    useEffect(() => {
        (async () => {
            
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            setPin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);

    const fetchTime = (d, t) => {
        updateState({
            distance: d,
            time: t
        })}

        const {time, distance} = state;
        const updateState = (data) => setState((state) => ({ ...state, ...data }));
  
  
  //MAIN SCREEN
        return ( 
        <><Header /><View style={styles.container}>



                <MapView
                    style={styles.maps}
                    showsUserLocation={true}

                    initialRegion={{
                        latitude: coordinates[0].latitude,
                        longitude: coordinates[0].longitude,
                        latitudeDelta: 0.0622,
                        longitudeDelta: 0.0121,
                    }}>
                    <MapViewDirections
                        origin={pin}
                        destination={skateSpots[SkateIndex].location}
                        apikey={""} // insert your API Key here
                        strokeWidth={4}
                        strokeColor="#111111"
                        timePrecision='now'
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`);
                            console.log(`Duration: ${result.duration} min.`);
                            fetchTime(result.distance, result.duration);
                        } }
                        mode='DRIVING' />
                    <Marker coordinate={pin}
                        pinColor='gold' />
                    <Marker coordinate={skateSpots[SkateIndex].location}
                        image={require('../assets/skate.png')}
                        title={skateSpots[SkateIndex].title}
                        description={skateSpots[SkateIndex].description} />
                </MapView>

                <View style={styles.condesc}>
                    {distance !== 0 && time !== 0 && (<View style={styles.desc}>
                        <Text style={[styles.txtdesc, { fontSize: 18 }]}>{skateSpots[SkateIndex].title} </Text>
                        <Text style={[styles.txtdesc, { fontStyle: 'italic' }]}>{distance.toFixed(0)}KM ({time.toFixed(0)} Mins)</Text>

                    </View>)}
                </View>

            </View></>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  maps: {
    flex: 2,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  desc:{
    position:'absolute',
    marginTop: 25,
    marginLeft: 25,
  },
  condesc:{
    position:'absolute',
    alignItems: 'center' ,
    width: 300,
    height: 100,
    backgroundColor: 'white',
    alignItems:'center',
    marginTop:550,
    marginLeft: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FF6000'
  },
  txtdesc:{
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
export default Directions;