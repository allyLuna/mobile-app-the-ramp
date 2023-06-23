import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Home.js';
import Map from './Map.js';
import Map2 from './Map2.js';

export default function App() {
  return (
   // <View style={styles.container}>
    //  <StatusBar style="auto" />
     // <Home />
   // </View> 

    <Map />
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
