import {
    BannerAd, BannerAdSize,
    TestIds
} from 'react-native-google-mobile-ads';

export default function BannerAdService() {
    return (
        <BannerAd
            unitId={TestIds.BANNER}
            size={BannerAdSize.FULL_BANNER}
        />
    );
}