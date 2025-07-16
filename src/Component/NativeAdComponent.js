import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import {
    NativeAdView,
    NativeAd,
    NativeAsset,
    NativeAssetType,
    TestIds,
} from 'react-native-google-mobile-ads';
import { titleColor, whiteColor } from '../utils/color';

const { width } = Dimensions.get('window');

const NativeAdComponent = () => {
    const [nativeAd, setNativeAd] = useState(null);

    useEffect(() => {
        NativeAd.createForAdRequest(TestIds.NATIVE)
            .then(setNativeAd)
            .catch(console.error);
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
