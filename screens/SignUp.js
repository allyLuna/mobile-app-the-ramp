import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Alert,StyleSheet, Text, View, Image, useWindowDimensions, ScrollView, Dimensions, KeyboardAvoidingView} from 'react-native';
import Logo from '../assets/logo.jpg'; 
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
  <ScrollView>  
    <KeyboardAvoidingView style={styles.container}>
    
      <Image 
        source={Logo} 
        style={[styles.logo, {height: 150}]}
        resizeMode='contain'
      />  
      <Text style={styles.textHeader}> Create New Account </Text>

      <CustomInput 
        placeholder="Name"
        value={name} 
        setValue={setName}  
        />
      <CustomInput 
        placeholder="Username"
        value={username} 
        setValue={setUsername} 
        />
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
        text="Sign Up"
        onPress={()=>handleSignUp(email,password)} />

      <CustomButton
        text="Login"
        onPress={()=>handleLogin(email,password)}
      />
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
    </ScrollView>  
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 20,
    padding: 20,
  },

  textHeader: {
    color: '#FF6000',
    marginBottom: 20,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    padding:  10,
  }
});
