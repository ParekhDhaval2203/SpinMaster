import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Dimensions,
    FlatList,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import { whiteColor } from '../utils/color';
import { getDeviceId } from '../utils/getDeviceId';
import BannerAdService from './BannerAdService';
import Header from './HeaderComponent';
import Loading from './Loading';
import NativeAdComponent from './NativeAdComponent';
import RewardedAdService from './RewardedAdService';
import SpinBonusCard from './SpinBonusCard';
import ToastServices from './ToastServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import NoDataFound from './NoDataFound';

const { width, height } = Dimensions.get('window');

export default function SpinBonusComponent(props) {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [spinBonusData, setSpinBonusData] = useState([]);

    useEffect(() => {
        const fetchSpinBonus = async () => {
            try {
                setIsLoading(true);
                const deviceID = getDeviceId();
                await messaging().requestPermission();
                const deviceToken = await messaging().getToken();
                const url = `https://api.aavakar.com/public/user-coin-links?device_token=${deviceToken}&device_id=${deviceID}`;
                const response = await fetch(url);
                const data = await response.json();
                setSpinBonusData(data.coin_links || []);
                AsyncStorage.setItem('user_id', data.user_id.toString());
            } catch (error) {
                console.error('Error fetching ads:', error);
            }
            setIsLoading(false);
        };

        fetchSpinBonus();
        setTimeout(() => RewardedAdService.load(), 1000);
    }, [props, navigation]);

    const onPress = (item) => {
        if (item.linkDiabled) {
            ToastServices.showToast('This link is currently disabled.', ToastServices.ToastTypes.INFO);
        } else {
            if (RewardedAdService.getLoaded()) {
                navigation.navigate('OfferDetails', { item: item });
                RewardedAdService.show();
                setTimeout(() => RewardedAdService.load(), 1000);
            } else {
                ToastServices.showToast('Rewarded ad is not loaded yet.', ToastServices.ToastTypes.INFO);
                RewardedAdService.load();
            }
        }
    };

    const flatListData = useMemo(() => {
        const dataWithAds = [];
        spinBonusData.forEach((item, index) => {
            if (index !== 0 && index % 3 === 0) {
                dataWithAds.push({ type: 'ad' });
            }
            dataWithAds.push({ ...item, type: 'bonus' });
        });
        return dataWithAds;
    }, [spinBonusData]);

    const renderItem = ({ item, index }) => {
        if (item.type === 'ad') {
            return <NativeAdComponent key={`ad-${index}`} />;
        }

        return (
            <SpinBonusCard
                index={index}
                title={item.title}
                subtitle={item.subtitle}
                dateTime={item.date}
                onPress={() => onPress(item)}
            />
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1E68FF" />
            <Header title="Spin Bonus" isFromSpinBonus={true} />
            <Toast />
            {isLoading ? (
                <Loading />
            ) : spinBonusData.length === 0 ? (
                <NoDataFound message="No spin bonuses available right now." />
            ) : (
                <FlatList
                    data={flatListData}
                    keyExtractor={(item, index) => `${item.type}-${item.id || index}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: 16 }}
                />
            )}
            <BannerAdService />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9F1FF',
    },
    header: {
        width: '100%',
        height: height * 0.12,
        backgroundColor: '#1E68FF',
        borderBottomRightRadius: 30,
        justifyContent: 'flex-end',
        padding: 20,
    },
    headerText: {
        color: 'white',
        fontSize: width * 0.06,
        fontWeight: 'bold',
    },
    mainCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 25,
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: height * 0.05,
    },
    mainImage: {
        width: width * 0.15,
        height: width * 0.15,
    },
    cardTitle: {
        fontSize: width * 0.045,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.05,
        paddingHorizontal: '5%',
    },
    cardButton: {
        flex: 0.48,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 16,
        elevation: 3,
    },
    iconWrapper: {
        backgroundColor: '#1E68FF',
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    buttonText: {
        fontSize: width * 0.035,
        color: '#333',
        fontWeight: '500',
        textAlign: 'center',
    },
    imageWrapper: {
        backgroundColor: '#EFF5FF',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
