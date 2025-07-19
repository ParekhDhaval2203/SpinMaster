import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    NativeAd,
    NativeAdView,
    NativeAsset,
    NativeAssetType
} from 'react-native-google-mobile-ads';
import { titleColor, whiteColor } from '../utils/color';

const { width } = Dimensions.get('window');

const NativeAdComponent = () => {
    const [nativeAd, setNativeAd] = useState(null);

    useEffect(() => {
        const loadNativeAd = async () => {
            try {
                const adUnitId = await AsyncStorage.getItem('nativeAdID');

                if (adUnitId) {
                    const ad = await NativeAd.createForAdRequest(adUnitId);
                    setNativeAd(ad);
                } else {
                    console.warn('⚠️ No nativeAdID found in AsyncStorage.');
                }
            } catch (error) {
                console.error('❌ Error loading native ad:', error);
            }
        };

        loadNativeAd();
    }, []);

    if (!nativeAd) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="small" color="#000" />
            </View>
        );
    }

    return (
        <NativeAdView nativeAd={nativeAd} style={styles.adContainer}>
            <View style={styles.content}>
                <NativeAsset assetType={NativeAssetType.HEADLINE}>
                    <Text style={styles.headline}>{nativeAd.headline}</Text>
                </NativeAsset>

                {nativeAd.bodyText && (
                    <NativeAsset assetType={NativeAssetType.BODY_TEXT}>
                        <Text style={styles.body}>{nativeAd.bodyText}</Text>
                    </NativeAsset>
                )}

                {nativeAd.callToActionText && (
                    <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION_TEXT}>
                        <Text style={styles.cta}>{nativeAd.callToActionText}</Text>
                    </NativeAsset>
                )}
            </View>
        </NativeAdView>
    );
};

const styles = StyleSheet.create({
    adContainer: {
        width: width - 32,
        backgroundColor: whiteColor,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        marginVertical: 16,
        alignSelf: 'center',
    },
    loaderContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12, // ✅ Fixed typo: borderRadious ➝ borderRadius
    },
    content: {
        flexDirection: 'column',
    },
    headline: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1c1c1e',
        marginBottom: 6,
    },
    body: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    cta: {
        fontSize: 14,
        fontWeight: '600',
        color: titleColor,
        marginTop: 8,
    },
});

export default NativeAdComponent;
