import React from 'react';
import {
    View, Text, Image, StatusBar,
    StyleSheet, TouchableOpacity,
    FlatList, Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './HeaderComponent';
import formatDateTime from '../utils/DateTime';
import LinearGradient from 'react-native-linear-gradient';

export default function OfferDetailsScreen() {
    const navigation = useNavigation();

    const offers = [
        {
            id: '1',
            title: '100 Spin Bonus',
            subtitle: 'Collect 100 Spin Bonus',
            date: new Date(),
        },
        {
            id: '2',
            title: '50 Coin Reward',
            subtitle: 'Claim your 50 bonus coins now!',
            date: new Date(),
        },
    ];

    const renderOffer = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/OfferDetails.png')}
                    style={styles.image}
                />
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Text style={styles.time}>{formatDateTime(item.date)}</Text>
                <TouchableOpacity>
                    <LinearGradient
                        colors={['#4facfe', '#1976f2']}

                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>Claim Now</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </View>
    );


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1E68FF" />

            <Header title='Offer Details' />

            <FlatList
                data={offers}
                keyExtractor={(item) => item.id}
                renderItem={renderOffer}
                contentContainerStyle={{ padding: 16 }}
            />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title="Settings"
                    onPress={() => navigation.navigate('Settings')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaf1ff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1976f2',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backArrow: {
        fontSize: 24,
        color: 'white',
        marginRight: 10,
    },
    headerText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    imageContainer: {
        width: 120,
        backgroundColor: '#EFF5FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 60,
    },
    image: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },
    detailsContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1976f2',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#444',
        marginBottom: 6,
    },
    time: {
        fontSize: 12,
        color: '#888',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#1976f2',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 24,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    gradientButton: {
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%'
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
});


