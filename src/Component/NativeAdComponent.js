import React, { useState } from 'react';
// import {
//     NativeAdView,
//     // HeadlineView,
//     // CallToActionView,
//     // TaglineView,
// } from 'react-native-google-mobile-ads';
import {
    NativeAdView,
    HeadlineView,
    TaglineView,
    CallToActionView,
} from 'react-native-admob-native-ads';
import { View, Text, StyleSheet } from 'react-native';

export default function NativeAdComponent({ adsInitialized }) {
    const [adLoaded, setAdLoaded] = useState(false);

    if (!adsInitialized) {
        return <Text>Loading Ad SDK...</Text>;
    }
    return (
        <View style={styles.adContainer}>
            {/* <NativeAdView
                adUnitID="ca-app-pub-3940256099942544/2247696110"
                onAdLoaded={() => {
                    setAdLoaded(true);
                }}
                onAdFailedToLoad={() => {
                    setAdLoaded(false);
                }}
                style={{ width: '100%', minHeight: 100 }}
            >
                {adLoaded ? (
                    <>
                        <HeadlineView style={styles.headline} />
                        <TaglineView style={styles.tagline} />
                        <CallToActionView style={styles.ctaButton} />
                    </>
                ) : (
                    <View style={{ minHeight: 60, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Loading Ad...</Text>
                    </View>
                )}
            </NativeAdView> */}
            <NativeAdView
                adUnitID="ca-app-pub-3940256099942544/2247696110"
                onAdLoaded={() => setAdLoaded(true)}
                onAdFailedToLoad={() => setAdLoaded(false)}
                style={{ width: '100%', minHeight: 100 }}
            >
                {adLoaded ? (
                    <>
                        <HeadlineView style={styles.headline} />
                        <TaglineView style={styles.tagline} />
                        <CallToActionView style={styles.ctaButton}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Click</Text>
                        </CallToActionView>
                    </>
                ) : (
                    <Text>Loading Ad...</Text>
                )}
            </NativeAdView>
        </View>
    );
}

const styles = StyleSheet.create({
    adContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    tagline: {
        fontSize: 14,
        color: '#666',
    },
    ctaButton: {
        marginTop: 10,
        backgroundColor: '#007bff',
        padding: 8,
        color: 'white',
        borderRadius: 4,
        textAlign: 'center',
    },
});
