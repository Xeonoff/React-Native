import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ProductCard({ navigation, ...props }) {
    const handlePress = () => {
        navigation.navigate('Информация о получателе', { id: props.id });
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={handlePress}>
                <Image style={styles.image} source={{ uri: props.img }} resizeMode='contain'/>
                <Text style={styles.full_name}>{props.full_name}</Text>
                <Text style={styles.full_name}>{props.phone}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: 300,
        height: 300,
        marginTop: 15,
        marginBottom: 15,
        borderColor: '#d8d8d8',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 125,
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
    },
    full_name: {
        fontSize: 16,
        color: '#006bd5',
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 1,
    },
    price: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginTop: 15,
    },
});