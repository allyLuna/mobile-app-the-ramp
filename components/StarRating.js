import * as  React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const StarRating = (props) => {
  
    let stars = [];

    for (var i=1; i <= 5; i++){
        let name = 'star-sharp';

        if (i > props.ratings){
            name = 'star-outline';
        }

        stars.push((<Ionicons name={name} size={15} style={styles.star} key={i} />))
    }

    return (
        <View style={ styles.container }>
            { stars }
            <Text style={styles.text}></Text>
        </View>
    );
	
}

export default StarRating;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	star: {
		color: '#FF8C00'
	},
	text: {
		fontSize: 12,
        marginLeft: 5,
        color: '#444',
	}
});