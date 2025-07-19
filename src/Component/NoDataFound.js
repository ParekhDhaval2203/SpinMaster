import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

export default function NoDataFound({ message = 'No Data Found' }) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Icon name="inbox" size={60} color="#1E68FF" style={styles.icon} />
                <Text style={styles.text}>{message}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E9F1FF',
    },
    card: {
        backgroundColor: '#EFF5FF',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    icon: {
        marginBottom: 20,
    },
    text: {
        fontSize: width * 0.045,
        color: '#1E68FF',
        fontWeight: '600',
        textAlign: 'center',
    },
});
