import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { whiteColor } from '../utils/color';

const { width } = Dimensions.get('window');
const SIZE = width * 0.25;

export default function CoinLoader() {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            })
        ).start();
    }, [rotateAnim]);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.imageWrapper, { transform: [{ rotate: spin }] }]}>
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
        backgroundColor: '#eaf1ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageWrapper: {
        width: SIZE,
        height: SIZE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: SIZE / 1.5,
        height: SIZE / 1.5,
        borderRadius: SIZE / 2,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: whiteColor,
        backgroundColor: whiteColor,
        elevation: 10,
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
    },
});
