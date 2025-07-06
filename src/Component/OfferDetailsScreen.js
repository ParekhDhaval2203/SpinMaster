import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Image, StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from './HeaderComponent';

export default function OfferDetailsScreen(props) {
    const { route } = props;
    const { title, subtitle, dateTime } = route.params;

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1E68FF" />

            <Header title='Offer Details' />

            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/OfferDetails.png')}
                        style={styles.image}
                    />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                    <Text style={styles.time}>{dateTime}</Text>
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
        marginTop: '5%',
        marginHorizontal: '5%',
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


