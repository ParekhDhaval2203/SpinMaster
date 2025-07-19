import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Linking,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { imageBackgroundColor, whiteColor } from '../utils/color';
import formatDateTime from '../utils/DateTime';
import BannerAdService from './BannerAdService';
import Header from './HeaderComponent';
import NativeAdComponent from './NativeAdComponent';
import ToastServices from './ToastServices';
import Toast from 'react-native-toast-message';
import SendIntentAndroid from 'react-native-send-intent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function OfferDetailsScreen(props) {
    const {
        route: {
            params: {
                item: { id, title, subtitle, date, link }
            }
        }
    } = props;

    const navigation = useNavigation();

    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        const source = Image.resolveAssetSource(require('../assets/OfferDetails.png'));
        Image.prefetch(source.uri)
            .then(() => setImageLoading(false))
            .catch(() => setImageLoading(false));
    }, []);


    const onClaimNowPress = async () => {
        const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.moonactive.coinmaster';

        try {
            const canOpen = await Linking.canOpenURL(`https://${link}`);
            if (canOpen) {
                const userID = Number(await AsyncStorage.getItem('user_id'));
                const URL = `https://api.aavakar.com/public/user-coin-mapping?user_id=${userID}&coin_link_id=${id}`;
                console.log("🚀 ~ onClaimNowPress ~ URL:", URL)
                fetch(`https://api.aavakar.com/public/user-coin-mapping?user_id=${userID}&coin_link_id=${id}`)
                    .then(response => response.json())
                    .then((res) => {
                        console.log('Coin mapping response:', res);
                    })
                navigation.navigate('SpinBonus');
                await Linking.openURL(link);
            } else {
                const wasOpened = await SendIntentAndroid.openApp('com.moonactive.coinmaster');
                if (!wasOpened) {
                    ToastServices.showToast(
                        'Coin Master app is not installed. Redirecting to Play Store...',
                        ToastServices.ToastTypes.ERROR
                    );
                    await Linking.openURL(fallbackUrl);
                }
            }
        } catch (error) {
            console.log('Error in onClaimNowPress:', error);
            ToastServices.showToast(
                'Something went wrong trying to open the app.',
                ToastServices.ToastTypes.ERROR
            );
            await Linking.openURL(fallbackUrl);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1E68FF" />

            <Toast />
            <Header title='Offer Details' />
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    {imageLoading ? (
                        <ActivityIndicator size="small" color="#999" style={styles.image} />
                    ) : (
                        <Image
                            source={require('../assets/OfferDetails.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                    )}
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <Text style={styles.time}>{formatDateTime(date)}</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => onClaimNowPress()}>
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
        </View >
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
    bannerWrapper: {
        position: 'absolute',
        bottom: height * 0.05,
        left: 0,
        right: 0,
        backgroundColor: imageBackgroundColor,
        alignItems: 'center',
        paddingBottom: 4,
        zIndex: 999,
    }
});
