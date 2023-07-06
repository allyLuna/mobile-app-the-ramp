import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User} from 'firebase/auth'
import Home from './screens/Home.js';
import Map from './screens/Map.js';
import SignUp from './screens/SignUp.js';
import Rate from './screens/Rate.js';
import Directions from './screens/Directions.js';
import { FIREBASE_AUTH } from './FirebaseConfig.ts';


const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();


function InsideLayout(){
    return(
      <InsideStack.Navigator>
        <InsideStack.Screen 
          name="Home" component={Home} options={{headerShown:false}} />
          <InsideStack.Screen 
          name="Map" component={Map} options={{headerShown:false}} />
           <InsideStack.Screen 
          name="Rate" component={Rate} options={{headerShown:false}} />
           <InsideStack.Screen 
          name="Directions" component={Directions} options={{headerShown:false}} />
      </InsideStack.Navigator>
      
    )
}

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
        console.log('user', user);
        setUser(user);
        //USER = user.email;
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
