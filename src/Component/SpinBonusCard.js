import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import formatDateTime from '../utils/DateTime';
import { blackColor, imageBackgroundColor, whiteColor } from '../utils/color';

export default function SpinBonusCard(props) {
    const { index, title, subtitle, dateTime, onPress } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const source = Image.resolveAssetSource(require('../assets/Spin&Coin.png'));
        Image.prefetch(source.uri)
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, []);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7} key={index}>
            <View style={styles.imageWrapper}>
                {loading ? (
                    <ActivityIndicator size="small" color="#999" style={styles.image} />
                ) : (
                    <Image
                        source={require('../assets/Spin&Coin.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
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
        backgroundColor: whiteColor,
        borderRadius: 20,
        padding: 14,
        marginHorizontal: 16,
        marginBottom: 12,
        alignItems: 'center',
        shadowColor: blackColor,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 3,
    },
    imageWrapper: {
        backgroundColor: imageBackgroundColor,
        borderTopLeftRadius: 14,
        borderBottomLeftRadius: 14,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    image: {
        width: 55,
        height: 55,
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
