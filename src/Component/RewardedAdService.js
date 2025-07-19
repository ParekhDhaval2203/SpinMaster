import { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rewardedAdKeywords } from '../utils/const';

class RewardedAdService {
    constructor() {
        this.rewarded = null;
        this.isLoaded = false;
        this.init();
    }

    async init() {
        try {
            const adUnitId = await AsyncStorage.getItem('rewardAdID');
            if (!adUnitId) {
                console.warn('RewardedAdService: No rewardAdID found in AsyncStorage.');
                return;
            }

            this.rewarded = RewardedAd.createForAdRequest(adUnitId, {
                keywords: rewardedAdKeywords,
            });

            this.rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
                this.isLoaded = true;
                console.log('Rewarded ad loaded.');
            });

            this.rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
                console.log('User earned reward:', reward);
            });

            this.rewarded.load();

        } catch (err) {
            console.error('RewardedAdService: Failed to initialize:', err);
        }
    }

    load() {
        if (this.rewarded) {
            this.rewarded.load();
        }
    }

    show() {
        if (this.isLoaded && this.rewarded) {
            this.rewarded.show();
        } else {
            console.warn('RewardedAd not loaded yet');
        }
    }

    getLoaded() {
        return this.isLoaded;
    }
}

const instance = new RewardedAdService();
export default instance;
