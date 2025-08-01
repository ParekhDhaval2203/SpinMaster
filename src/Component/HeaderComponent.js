import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { whiteColor } from '../utils/color';

const { width, height } = Dimensions.get('window');

export default function Header(props) {
    const { title, isHideBack = false, isFromSpinBonus = false, onPress } = props;
    const navigation = useNavigation();

    return (
        <LinearGradient
            colors={['#4facfe', '#1976f2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
        >
            <View style={styles.row}>
                {
                    isHideBack ?
                        <Text style={styles.headerText}>{title}</Text>
                        :
                        <TouchableOpacity style={styles.row} onPress={() => navigation.goBack()} activeOpacity={0.7}>
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                            <Text style={styles.headerText}>{title}</Text>
                        </TouchableOpacity>
                }
                {
                    isFromSpinBonus ?
                        <TouchableOpacity activeOpacity={0.7} style={{ marginLeft: 'auto' }} onPress={onPress}>
                            <Ionicons name="search" size={24} color={whiteColor} />
                        </TouchableOpacity>
                        : null
                }
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: height * 0.12,
        justifyContent: 'flex-end',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: whiteColor,
        fontSize: width * 0.06,
        fontWeight: 'bold',
        marginLeft: 6
    },
});
