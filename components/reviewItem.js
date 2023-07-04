import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function reviewItem({item}){
    return(
        <TouchableOpacity onPress={''}>
            <Text style={styles.item}>{item.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        color: '#000',
        padding: 16,
        marginTop: 16,
        borderRadius: 10,
        borderStyle: "dashed",
        backgroundColor: "#D6E4E5",
    }
})