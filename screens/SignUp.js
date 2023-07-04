import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Alert,StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, Dimensions, KeyboardAvoidingView} from 'react-native';
import Logo from '../assets/logo.png'; 
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/header'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import {firebase} from '../config'


export default function SignUp() {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH
  const {height} = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
 /*const onSignUpPressed = () => {
    console.warn("Sign Up");
  }
  const onSignInPressed = () => {
    console.warn("Sign In")};
  */

     const handleSignUp = async () => {
      //setLoading(true);
       try{
         const response =  await createUserWithEmailAndPassword(auth, email, password);
         console.log(response);
         alert('Check Emails')
       } catch (error){
         console.log(error);
         alert('Sign up failed ' + error.message)
       } finally {
         //setLoading(false);
       }
    }

  const handleLogin = async () => {
    try{
      const response = await signInWithEmailAndPassword(auth,email, password);
      console.log(response);
    } catch (error){
      console.log(error);
      alert('Sign in failed' + error.message)
    } 
}



  return (
  
    <KeyboardAvoidingView style={styles.container}>
    
      <Image 
        source={Logo} 
        style={[styles.logo, {height: 175}]}
        resizeMode='contain'
      />  
      <Text style={styles.textHeader}> NO RULES. JUST SKATE. </Text>

      <CustomInput 
        placeholder="E-mail"
        value={email} 
        setValue={setEmail} />
      <CustomInput 
        placeholder="Password"
        value={password} 
        setValue={setPassword}
        secureTextEntry={true} />
       
      

      <CustomButton
        text="Login"
        onPress={()=>handleLogin(email,password)}
      />

    <CustomButton 
        text="Sign Up"
        bgColor="black"
        onPress={()=>handleSignUp(email,password)} />
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
    
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },

  textHeader: {
    color: '#FFA559',
    marginBottom: 40,
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    padding:  10,
    fontWeight: '700'
  },
  btn:{
   marginTop: 10,
  },
  logo:{
    marginTop: 60
  },
  con2:{
    alignItems:'center',
    marginTop: 50
  }
});
