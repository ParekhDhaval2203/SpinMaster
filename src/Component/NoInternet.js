import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const NoInternetWrapper = ({ children, isOnline }) => {
    if (!isOnline) {
        return (
            <View style={styles.wrapper}>
                <View style={styles.card}>
                    <MaterialIcons
                        name="signal-wifi-statusbar-connected-no-internet-4"
                        size={50}
                        color="#FF5E5E"
                        style={styles.icon}
                    />
                    <Text style={styles.title}>You're Offline</Text>
                    <Text style={styles.subtitle}>
                        It looks like there’s no internet connection. Please check your network and try again.
                    </Text>
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
        backgroundColor: '#FCECED',
        paddingHorizontal: 20,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        padding: 30,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    icon: {
        marginBottom: height * 0.02,
    },
    title: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#D32F2F',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: width * 0.042,
        color: '#555',
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default NoInternetWrapper;
