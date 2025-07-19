import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useMemo, useState } from 'react';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { whiteColor } from '../utils/color';
import { getDeviceId } from '../utils/getDeviceId';
import BannerAdService from './BannerAdService';
import Header from './HeaderComponent';
import Loading from './Loading';
import NativeAdComponent from './NativeAdComponent';
import NoDataFound from './NoDataFound';
import RewardedAdService from './RewardedAdService';
import SpinBonusCard from './SpinBonusCard';
import ToastServices from './ToastServices';

export default function SpinBonusComponent(props) {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [spinBonusData, setSpinBonusData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

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
        const sourceData = filteredData.length > 0 ? filteredData : spinBonusData;
        const dataWithAds = [];
        sourceData.forEach((item, index) => {
            if (index !== 0 && index % 3 === 0) {
                dataWithAds.push({ type: 'ad' });
            }
            dataWithAds.push({ ...item, type: 'bonus' });
        });
        return dataWithAds;
    }, [spinBonusData, filteredData]);

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

    const onSearchPress = () => {
        setShowSearch(!showSearch);
        setSearchQuery('');
        setFilteredData([]);
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.trim() === '') {
            setFilteredData([]);
            return;
        }

        const filtered = spinBonusData.filter((item) =>
            item.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1E68FF" />
            <Header title="Spin Bonus" isFromSpinBonus={true} onPress={onSearchPress} />
            <Toast />

            {showSearch && (
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search by title"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={handleSearch}
                        autoFocus
                        placeholderTextColor="#888"
                    />
                </View>
            )}

            {isLoading ? (
                <Loading />
            ) : (filteredData.length === 0 && searchQuery !== '') ? (
                <NoDataFound message="No matching spin bonuses found." />
            ) : (spinBonusData.length === 0) ? (
                <NoDataFound message="No spin bonuses available right now." />
            ) : (
                <FlatList
                    data={flatListData}
                    keyExtractor={(item, index) => `${item.type}-${item.id || index}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: 16 }}
                    keyboardShouldPersistTaps="handled"
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
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#F0F4FF',
    },
    searchInput: {
        backgroundColor: whiteColor,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
        elevation: 2,
    },
});
