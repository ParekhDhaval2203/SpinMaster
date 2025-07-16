import React, { useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    StatusBar,
} from 'react-native';
import { whiteColor } from '../utils/color';

const { width, height } = Dimensions.get('window');
const NUM_RAYS = 60;

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Home');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigation]);

    const renderRays = () => {
        const rays = [];
        for (let i = 0; i < NUM_RAYS; i++) {
            const rotate = (360 / NUM_RAYS) * i;
            rays.push(
                <View
                    key={i}
                    style={[
                        styles.ray,
                        {
                            transform: [
                                { rotate: `${rotate}deg` },
                                { translateY: -height * 0.25 },
                            ],
                        },
                    ]}
                />
            );
        }
        return rays;
    };

    return (
        <View style={styles.container}>
            <View style={styles.raysContainer}>{renderRays()}</View>

            <View style={styles.logoCard}>
                <Image
                    source={require('../assets/Spin&Coin.jpg')} // <-- Replace with your image
                    style={styles.logo}
                />
            </View>
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
    raysContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ray: {
        position: 'absolute',
        width: 2,
        height: height * 0.5,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
        transform: [{ scaleX: 1 }], // You can scale X here if you want taper
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
