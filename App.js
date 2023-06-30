import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User} from 'firebase/auth'
import Home from './screens/Home.js';
import Map from './screens/Map.js';
import SignUp from './screens/SignUp.js';
import Rating from './Rating.js';
import Rating2 from './Rating2.js';
import { FIREBASE_AUTH } from './FirebaseConfig.ts';
import {firebase} from './config'

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();


function InsideLayout(){
    return(
      <InsideStack.Navigator>
        <InsideStack.Screen 
          name="Home" component={Home} options={{headerShown:false}} />
          <InsideStack.Screen 
          name="Map" component={Map} options={{headerShown:false}} />
      </InsideStack.Navigator>
      
    )
}

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
        console.log('user', user);
        setUser(user);
      })
  }, [])

  return (
    <NavigationContainer>
    <Stack.Navigator>
      {user ? (<Stack.Screen options={{ headerShown: false }} name="Inside" component={InsideLayout} />
      ) : (<Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />)}
    </Stack.Navigator>
  </NavigationContainer>
    // <View style={styles.container}>
    //  <StatusBar style="auto" />
    // <Home />
   // </View> 
    //<Map />
    //<SignUp />
    //<Rating2 />
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
