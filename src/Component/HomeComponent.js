import analytics from '@react-native-firebase/analytics';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { iconBackgroundColor, imageBackgroundColor, textColor, whiteColor } from '../utils/color';
import BannerAdService from './BannerAdService';
import Header from './HeaderComponent';
import NativeAdComponent from './NativeAdComponent';
import RewardedAdService from './RewardedAdService';
import ToastServices from './ToastServices';

const { width, height } = Dimensions.get('window');

export default function HomeComponent(props) {
    const { navigation } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const formData = new FormData();
        formData.append('package_name', 'Spin_Master_Test');

        fetch('http://panel.aavakar.com/api/getApp', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(async (data) => {
                console.log('Response:', data.result);
                const { banner_1, native_1, reward_1 } = data.result;
                await Promise.all([
                    AsyncStorage.setItem('banner_1', banner_1),
                    AsyncStorage.setItem('nativeAdID', native_1),
                    AsyncStorage.setItem('rewardAdID', reward_1)
                ])
            })
            .catch(error => {
                console.error('Error:', error);
            });

        const source = Image.resolveAssetSource(require('../assets/Spin&Coin.png'));
        Image.prefetch(source.uri)
            .then(() => setLoading(false))
            .catch(() => setLoading(false));

        analytics().logScreenView({
            screen_name: 'HomeScreen',
            screen_class: 'HomeComponent',
        });

    }, []);

    const onPress = () => {
        analytics().logEvent('Home_Spin_Coin_Pressed').then(() => {
            console.log('Event logged');
        });

        if (RewardedAdService.getLoaded()) {
            navigation.navigate('SpinBonus');
            RewardedAdService.show();
            setTimeout(() => RewardedAdService.load(), 1000);
        } else {
            ToastServices.showToast('Rewarded ad is not loaded yet.', ToastServices.ToastTypes.INFO);
            RewardedAdService.load();
        }
    };

    return (
        <View style={styles.container}>
            <Header title='Coin Master' isHideBack />

            <ScrollView
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity style={styles.mainCard} onPress={onPress} activeOpacity={0.7}>
                    <View style={styles.imageWrapper}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#999" style={styles.mainImage} />
                        ) : (
                            <Image
                                source={require('../assets/Spin&Coin.png')}
                                style={styles.mainImage}
                                resizeMode="contain"
                            />
                        )}
                    </View>
                    <Text style={styles.cardTitle}>Spin & Coin Reward</Text>
                </TouchableOpacity>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.cardButton}
                        activeOpacity={0.7}
                        onPress={() => {
                            analytics().logEvent('invite_friends_clicked');
                        }}
                    >
                        <View style={styles.iconWrapper}>
                            <Feather name="user-plus" size={24} color={whiteColor} />
                        </View>
                        <Text style={styles.buttonText}>Invite Friends</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => {
                            analytics().logEvent('settings_clicked');
                            navigation.navigate('Settings');
                        }}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconWrapper}>
                            <Feather name="settings" size={24} color={whiteColor} />
                        </View>
                        <Text style={styles.buttonText}>Settings</Text>
                    </TouchableOpacity>
                </View>

                <NativeAdComponent />
            </ScrollView>

            <View style={styles.bannerWrapper}>
                <BannerAdService />
            </View>
        </View>
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
        marginTop: height * 0.02,
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
        marginTop: height * 0.02,
        paddingHorizontal: '5%',
        marginBottom: height * 0.03,
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
    bannerWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: imageBackgroundColor,
        alignItems: 'center',
        paddingVertical: 6,
        zIndex: 999,
    },
});
