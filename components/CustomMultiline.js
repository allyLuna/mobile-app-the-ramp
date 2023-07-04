import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, TextInput} from 'react-native';

export default function CustomMultiline({value, setValue, placeholder}) {
    return (
      <View style={styles.container}>
        <TextInput
            multiline={true}
            value={value}
            onChangeText={setValue} 
            placeholder={placeholder} 
            style={styles.input}   
        />
        <StatusBar style="auto" />
      </View>
    );
  }
  
  
const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 60,
        maxHeight: 300,
        borderColor: '#1E1F27',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        marginBottom: 20,
    },

    input:{
        padding: 10,
        color: '#1E1F27',
        fontWeight: 'bold',
    }
  });
