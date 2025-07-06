import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getDeviceId } from '../utils/getDeviceId';

const { width, height } = Dimensions.get('window');

export default function Header(props) {
    const { title, isHideBack = false } = props;
    const navigation = useNavigation();
    const [deviceID, setDeviceID] = useState('');

    useEffect(() => {
        setDeviceID(getDeviceId())
    }, []);

    return (
        <LinearGradient
            colors={['#4facfe', '#1976f2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
        >
            <View style={styles.row}>
                <Text>{deviceID}</Text>
                {
                    isHideBack ?
                        <Text style={styles.headerText}>{title}</Text>
                        :
                        <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                            <Text style={styles.headerText}>{title}</Text>
                        </TouchableOpacity>
                }
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: height * 0.12,
        borderBottomRightRadius: 30,
        justifyContent: 'flex-end',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: width * 0.06,
        fontWeight: 'bold',
        marginLeft: 6
    },
});
