import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function Header(){
    return(
    <View style={styles.header}>
            <Text style={styles.headerText}> THE RAMP </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 38,
        borderBottomWidth: 0.5,
        borderBottomColor: '#777',
        alignItems: 'center',
    },
     headerText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
     }
});