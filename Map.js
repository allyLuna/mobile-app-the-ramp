import * as  React from 'react';
import MapView, {Callout, Circle, Marker} from 'react-native-maps';
import { Image ,Dimensions, StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';
import skateSpots from './Spots.js'

export default function Map() {

  const [location, setLocation] = React.useState();
  const [address, setAddress] = React.useState('Manila');
  const [pin, setPin] = React.useState({
      latitude: 14.6026439,
      longitude: 121.0029067,
      });

Location.setGoogleApiKey("AIzaSyA4HDbV51yqB8e3uRlTCr1-MbLU_5TNpBY");

//for showing skate spots in map
const showSkateSpots = () => {
  return skateSpots.map((item, index) =>{
    return(
      <Marker
        key={index}
        coordinate={item.location}
        title={item.title}
        description={item.description}
        image={require('./assets/skate.png')}
      />
    )
  })
}

//set input text para dito beh
  const geocode = async () => {
  const geocodedLocation = await Location.geocodeAsync(address);
  console.log("Geocoded Address:");
  console.log(geocodedLocation);
  
  }

  //latlong
const reverseGeocode = async () => {
  const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  }, {
    useGoogleMaps: true
  });
  console.log("Reverse Geocoded Address:");
  console.log(reverseGeocodeAddress);
  
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


  return (
    <>
    <View style={styles.navbar}>
    <Image style={styles.img} source = {require('./assets/minilogo.jpg')} />
      <Text style={styles.appname}>THE RAMP</Text>
    </View>
    
    
    <View style={styles.container}>

      <MapView style={styles.map}
        initialRegion={{
          latitude: 14.6026439,
          longitude: 121.0029067,
          latitudeDelta: 0.005,
          longitudeDelta: 0.05,
        }}

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
          onPress={geocode()}
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
          } }
        ></Marker>

        <Circle center={pin} radius={4000} />
      </MapView>
    </View></>
  );
}

const styles = StyleSheet.create({
  navbar:{
    width: '95%',
    paddingLeft: '5%',
    marginTop: 50,
    marginBottom: 10,
    height: 50,
    position: 'relative',
  },

  img:{
    marginLeft: 10,
    position: 'absolute',
  },

  appname:{
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 16,
    marginLeft: 135,
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
});
