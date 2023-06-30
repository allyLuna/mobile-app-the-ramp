import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, TextInput} from 'react-native';

export default function CustomInput({value, setValue, placeholder, secureTextEntry}) {
    return (
      <View style={styles.container}>
        <TextInput
            value={value}
            onChangeText={setValue} 
            placeholder={placeholder} 
            style={styles.input}
            secureTextEntry={secureTextEntry}    
        />
        <StatusBar style="auto" />
      </View>
    );
  }
  
  
const styles = StyleSheet.create({
    container:{
        width: '100%',
        borderColor: '#1E1F27',
        borderWidth: 2,
        borderRadius: 30,
        paddingHorizontal: 10,
        marginVertical: 10,
    },

    input:{
        padding: 10,
        color: '#1E1F27',
        fontWeight: 'bold',
    }
  });
