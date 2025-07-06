import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import formatDateTime from '../utils/DateTime';

export default function SpinBonusCard(props) {
    const { navigation, title, subtitle, dateTime } = props;

    return (
        <TouchableOpacity style={styles.card}
            onPress={() => {
                navigation.navigate('OfferDetails', {
                    title: title,
                    subtitle: subtitle,
                    dateTime: formatDateTime(dateTime)
                })
            }}>
            <View style={styles.imageWrapper}>
                <Image
                    source={require('../assets/Spin&Coin.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <Text style={styles.dateTime}>{formatDateTime(dateTime)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 14,
        marginHorizontal: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 3,
    },
    imageWrapper: {
        backgroundColor: '#EFF5FF',
        borderTopLeftRadius: 14,
        borderBottomLeftRadius: 14,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    image: {
        width: 48,
        height: 48,
    },
    textWrapper: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0047AB',
    },
    subtitle: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
    dateTime: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
});
