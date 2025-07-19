import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const NoInternetWrapper = ({ children, isOnline }) => {
    if (!isOnline) {
        return (
            <View style={styles.wrapper}>
                <View style={styles.card}>
                    <Text style={styles.title}>No Internet Connection</Text>
                    <Text style={styles.subtitle}>Please check your network settings and try again.</Text>
                </View>
            </View>
        );
    }

    return children;
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F6FF',
        paddingHorizontal: 20,
    },
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    title: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#1E68FF',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: width * 0.04,
        color: '#555',
        textAlign: 'center',
    },
});

export default NoInternetWrapper;
