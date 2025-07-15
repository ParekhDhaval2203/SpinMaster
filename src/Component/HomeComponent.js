import React from 'react';
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import Feather from 'react-native-vector-icons/Feather';
import Header from './HeaderComponent';

const { width, height } = Dimensions.get('window');

export default function HomeComponent(props) {
    const { navigation } = props;

    const onPress = () => {
        navigation.navigate('SpinBonus');
    };

    return (
        <>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#1E68FF" />

                <Header title='Coin Master' isHideBack />
                {/* Main Card */}
                <TouchableOpacity style={styles.mainCard} onPress={onPress}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={require('../assets/Spin&Reward.png')}
                            style={styles.mainImage}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.cardTitle}>Spin & Coin Reward</Text>
                </TouchableOpacity>

                {/* Bottom Buttons */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.cardButton}>
                        <View style={styles.iconWrapper}>
                            <Feather name="user-plus" size={24} color="#FFFFFF" />
                        </View>
                        <Text style={styles.buttonText}>Invite Friends</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('Settings')}>
                        <View style={styles.iconWrapper}>
                            <Feather name="settings" size={24} color="#FFFFFF" />
                        </View>
                        <Text style={styles.buttonText}>Settings</Text>
                    </TouchableOpacity>
                </View>
                <BannerAd
                    unitId={TestIds.BANNER}
                    size={BannerAdSize.FULL_BANNER}
                />

            </View>
            <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.FULL_BANNER}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9F1FF',
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
        width: width * 0.25,
        height: width * 0.25,
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
        paddingHorizontal: '5%'
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
        padding: 10,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
