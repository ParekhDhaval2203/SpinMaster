import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { rewardedAdKeywords } from '../utils/const';

class RewardedAdService {
    constructor() {
        this.rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
            keywords: rewardedAdKeywords,
        });
        this.isLoaded = false;
        this.load();
    }

    load() {
        this.rewarded.load();
        this.rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            this.isLoaded = true;
        });

        // this.rewarded.addAdEventListener(RewardedAdEventType.CLOSED, () => {
        //     this.isLoaded = false;
        //     this.rewarded.load(); // Reload for next time
        // });

        this.rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
            console.log('User earned reward:', reward);
        });
    }

    show() {
        if (this.isLoaded) {
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
