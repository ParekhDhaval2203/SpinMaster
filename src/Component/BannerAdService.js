import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
    BannerAd,
    BannerAdSize
} from 'react-native-google-mobile-ads';
import { imageBackgroundColor } from '../utils/color';

const { width, height } = Dimensions.get('window');

export default function BannerAdService(props) {
    const [bannerID, setBannerID] = useState(null);

    useEffect(() => {
        const getBannerAdID = async () => {
            try {
                const id = await AsyncStorage.getItem('banner_1');
                setBannerID(id);
            } catch (error) {
                // setBannerID(TestIds.BANNER);
            }
        };

        getBannerAdID();
    }, []);

    return (
        <View>
            {
                bannerID && (
                    <View style={styles.bannerWrapper}>
                        <BannerAd
                            unitId={bannerID}
                            size={BannerAdSize.FULL_BANNER}
                            requestOptions={{
                                requestNonPersonalizedAdsOnly: true,
                            }}
                            onAdFailedToLoad={(err) => console.log('🚫 Ad failed:', err)}
                        />
                    </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
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
