import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const SIZE = width * 0.25;
const NUM_RAYS = 50;

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

    const renderShineLines = () => {
        return Array.from({ length: NUM_RAYS }).map((_, i) => {
            const angle = (360 / NUM_RAYS) * i;
            return (
                <View
                    key={i}
                    style={[
                        styles.shineRay,
                        {
                            transform: [
                                { rotate: `${angle}deg` },
                                { translateY: -SIZE * 0.45 },
                            ],
                            opacity: i / NUM_RAYS,
                        },
                    ]}
                />
            );
        });
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.coin, { transform: [{ rotate: spin }] }]}>
                {renderShineLines()}

                <View style={styles.coinFace}>
                    <Text style={styles.coinText}>💰</Text>
                </View>
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
    coin: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: '#FFD700',
        borderColor: '#e6b800',
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    coinFace: {
        position: 'absolute',
        width: SIZE * 0.6,
        height: SIZE * 0.6,
        borderRadius: (SIZE * 0.6) / 2,
        backgroundColor: '#ffec99',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#d4af37',
    },
    coinText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#a87400',
    },
    shineRay: {
        position: 'absolute',
        width: 3,
        height: 20,
        backgroundColor: '#fff7c2',
        borderRadius: 2,
    },
});
