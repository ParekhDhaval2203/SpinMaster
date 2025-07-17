import React, { useState } from 'react';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppRatingModal from './AppRatingModal';
import BannerAdService from './BannerAdService';
import Header from './HeaderComponent';
import NativeAdComponent from './NativeAdComponent';

export default function SettingScreen() {
    const [showModal, setShowModal] = useState(false);

    const onRatingClick = () => {
        setShowModal(true);
    };

    const infoOptions = [{
        id: '1',
        title: 'Rate this app',
        icon: 'star-rate',
        iconLib: 'MaterialIcons',
        onClick: onRatingClick,
    }, {
        id: '2',
        title: 'Privacy Policy',
        icon: 'privacy-tip',
        iconLib: 'MaterialIcons',
    }, {
        id: '3',
        title: 'Terms and Conditions',
        icon: 'document-text-outline',
        iconLib: 'Ionicons',
    }, {
        id: '4',
        title: 'Share',
        icon: 'share-social-outline',
        iconLib: 'Ionicons',
    }];

    const renderItem = ({ item }) => {
        const IconComponent =
            item.iconLib === 'Ionicons' ? Ionicons : MaterialIcons;

        return (
            <TouchableOpacity style={styles.card} onPress={item.onClick} activeOpacity={0.7}>
                <View style={styles.iconWrapper} >
                    <IconComponent name={item.icon} size={24} color="#1976f2" />
                </View>
                <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1E68FF" />

            <Header title='Settings' />
            <FlatList
                data={infoOptions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
            />
            <NativeAdComponent />
            <BannerAdService />
            <AppRatingModal visible={showModal} onClose={() => setShowModal(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaf1ff',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#ddecfb',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
    },
});
