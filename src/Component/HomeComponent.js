import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {
    BannerAd, BannerAdSize,
    RewardedAd,
    RewardedAdEventType, TestIds
} from 'react-native-google-mobile-ads';
import Feather from 'react-native-vector-icons/Feather';
import Header from './HeaderComponent';
import NativeAdComponent from './NativeAdComponent';
import ToastServices from './ToastServices';
import Toast from 'react-native-toast-message';
import { iconBackgroundColor, imageBackgroundColor, textColor, whiteColor } from '../utils/color';

const { width, height } = Dimensions.get('window');

export default function HomeComponent(props) {
    const { navigation } = props;

    const [loaded, setLoaded] = useState(false);

    const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
        keywords: ['stockmarket', 'investment', 'trading', 'finance'],
    });

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
            rewarded.load();
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('User earned reward of ', reward);
                rewarded.load();
                // navigation.navigate('SpinBonus');
            },
        );
        rewarded.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
            rewarded.load();
        };
    }, [navigation, rewarded]);

    const onPress = () => {
        if (loaded) {
            navigation.navigate('SpinBonus');
            rewarded.show();
            setTimeout(() => rewarded.load(), 1000);
        } else {
            ToastServices.showToast('Rewarded ad is not loaded yet.', ToastServices.ToastTypes.INFO);
            rewarded.load();
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Toast />

                <Header title='Coin Master' isHideBack />
                {/* Main Card */}
                <TouchableOpacity style={styles.mainCard} onPress={onPress}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={require('../assets/Spin&Reward.png')}
                            style={styles.mainImage}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.cardTitle}>Spin & Coin Reward</Text>
                </TouchableOpacity>

                {/* Bottom Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cardButton}>
                        <View style={styles.iconWrapper}>
                            <Feather name="user-plus" size={24} color={whiteColor} />
                        </View>
                        <Text style={styles.buttonText}>Invite Friends</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('Settings')}>
                        <View style={styles.iconWrapper}>
                            <Feather name="settings" size={24} color={whiteColor} />
                        </View>
                        <Text style={styles.buttonText}>Settings</Text>
                    </TouchableOpacity>
                </View>
                <NativeAdComponent />
                <BannerAd
                    unitId={TestIds.BANNER}
                    size={BannerAdSize.FULL_BANNER}
                />

            </View>
            <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.FULL_BANNER}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: imageBackgroundColor,
    },
    mainCard: {
        backgroundColor: whiteColor,
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 25,
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: height * 0.05,
    },
    mainImage: {
        width: width * 0.25,
        height: width * 0.25,
    },
    cardTitle: {
        fontSize: width * 0.045,
        fontWeight: '600',
        color: textColor,
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.05,
        paddingHorizontal: '5%'
    },
    cardButton: {
        flex: 0.48,
        backgroundColor: whiteColor,
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 16,
        elevation: 3,
    },
    iconWrapper: {
        backgroundColor: iconBackgroundColor,
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    buttonText: {
        fontSize: width * 0.035,
        color: textColor,
        fontWeight: '500',
        textAlign: 'center',
    },
    imageWrapper: {
        backgroundColor: imageBackgroundColor,
        padding: 10,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
