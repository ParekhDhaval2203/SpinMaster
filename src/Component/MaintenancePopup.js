import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MaintenancePopup = ({ children, maintenance }) => {
    if (maintenance) {
        return (
            <View style={styles.wrapper}>
                <View style={styles.card}>
                    <MaterialCommunityIcons
                        name="tools"
                        size={80}
                        color="#1E68FF"
                        style={styles.icon}
                    />
                    <Text style={styles.title}>We’ll Be Right Back!</Text>
                    <Text style={styles.subtitle}>
                        Our app is currently undergoing scheduled maintenance to serve you better.
                    </Text>
                    <Text style={styles.subtitle}>
                        We appreciate your patience and will be back shortly.
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
        backgroundColor: '#B3E5FC',
        padding: 24,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#ffffff',
        paddingVertical: 32,
        paddingHorizontal: 24,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    icon: {
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1E68FF',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 22,
    },
});

export default MaintenancePopup;
