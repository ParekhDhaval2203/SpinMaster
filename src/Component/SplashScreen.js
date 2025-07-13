import React, { useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const NUM_LINES = 30; // Number of rays

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Home');
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigation]);

    const renderBurstLines = () => {
        const lines = [];
        for (let i = 0; i < NUM_LINES; i++) {
            const rotate = (360 / NUM_LINES) * i;
            lines.push(
                <LinearGradient
                    key={i}
                    colors={['rgba(135, 206, 235, 0.6)', 'rgba(135, 206, 235, 0.3)', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[
                        styles.line,
                        {
                            transform: [
                                { rotate: `${rotate}deg` },
                                { translateY: -height * 0.25 }, // moves line outward from center
                            ],
                        },
                    ]}
                />
            );
        }
        return lines;
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />

            <View style={styles.burstContainer}>{renderBurstLines()}</View>

            {/* Centered logo card */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/Spin&Coin.jpg')}
                    style={styles.logo}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b82f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    burstContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        position: 'absolute',
        width: 2,
        height: height * 0.7,
        borderRadius: 4,
    },
    logoContainer: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 8,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 8 },
        elevation: 15,
        zIndex: 10,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
});