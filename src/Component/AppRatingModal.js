import React, { useState } from 'react';
import {
    Modal, View, Text,
    TouchableOpacity, StyleSheet,
    Image, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Divider from './Divider';

const { width, height } = Dimensions.get('window');

const AppRatingModal = ({ visible, onClose }) => {
    const [rating, setRating] = useState(5);

    const handleRate = (value) => {
        setRating(value);
        // Optionally redirect to App Store or handle rating submission
        console.log(`User rated: ${value}`);
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Image
                        source={require('../assets/Spin&Coin.jpg')}
                        style={styles.mainImage}
                        resizeMode="contain"
                    />

                    <Text style={styles.title}>Enjoying Spin Master Link?</Text>
                    <Text style={styles.subtitle}>Tap a star to rate it on the App Store.</Text>
                    <Divider />
                    <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map((val) => (
                            <TouchableOpacity key={val} onPress={() => handleRate(val)}>
                                <Icon
                                    name="star"
                                    size={32}
                                    color={val <= rating ? '#0079FF' : '#ccc'}
                                    style={{ marginHorizontal: 4 }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Divider />

                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.notNow}>Not Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AppRatingModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: 300,
        alignItems: 'center',
    },
    cupIcon: {
        textAlign: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 6,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 16,
    },
    stars: {
        flexDirection: 'row',
        marginBottom: '5%',
        marginTop: '5%'
    },
    notNow: {
        color: '#007aff',
        fontSize: 16,
        marginTop: '5%'
    },
    mainImage: {
        width: width * 0.15,
        height: width * 0.15,
        // marginBottom: 10,
    },
});
