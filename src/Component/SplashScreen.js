import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    Image,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import { whiteColor } from '../utils/color';

export default function SplashScreen({ navigation }) {
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            navigation.navigate('Home');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation, scaleValue]);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <Image
                source={require('../assets/vector_lines.png')}
                style={{ position: 'absolute' }}
            />

            <Animated.View style={[styles.logoCard, { transform: [{ scale: scaleValue }] }]}>
                <Image
                    source={require('../assets/Spin&Coin.jpg')}
                    style={styles.logo}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2189ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoCard: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: whiteColor,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        zIndex: 10,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});
