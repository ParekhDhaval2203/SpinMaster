import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { whiteColor } from '../utils/color';
import BannerAdService from './BannerAdService';
import Header from './HeaderComponent';
import NativeAdComponent from './NativeAdComponent';

export default function OfferDetailsScreen(props) {
    const { route } = props;
    const { title, subtitle, dateTime } = route.params;

    const navigation = useNavigation();

    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        const source = Image.resolveAssetSource(require('../assets/SpinBonus.png'));
        Image.prefetch(source.uri)
            .then(() => setImageLoading(false))
            .catch(() => setImageLoading(false));
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1E68FF" />

            <Header title='Offer Details' />

            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    {imageLoading ? (
                        <ActivityIndicator size="small" color="#999" style={styles.image} />
                    ) : (
                        <Image
                            source={require('../assets/SpinBonus.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    )}
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <Text style={styles.time}>{dateTime}</Text>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#4facfe', '#1976f2']}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.buttonText}>Claim Now</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

            <NativeAdComponent />
            <BannerAdService />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: '5%',
        marginHorizontal: '5%',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    imageContainer: {
        width: 120,
        backgroundColor: '#EFF5FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 60,
    },
    image: {
        width: 90,
        height: 90,
    },
    detailsContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1976f2',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#444',
        marginBottom: 6,
    },
    time: {
        fontSize: 12,
        color: '#888',
        marginBottom: 10,
    },
    buttonText: {
        color: whiteColor,
        fontWeight: '600',
        fontSize: 14,
    },
    gradientButton: {
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
    },
});
