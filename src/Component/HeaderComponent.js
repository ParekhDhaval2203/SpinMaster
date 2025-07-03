import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Ionicons } from '@expo/vector-icons'; // optional, or use any back icon

const { width, height } = Dimensions.get('window');

export default function Header(props) {
    const { title, onBack } = props;

    return (
        <LinearGradient
            colors={['#4facfe', '#1976f2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
        >
            <View style={styles.row}>
                {/* {onBack && (
                    <TouchableOpacity onPress={onBack}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                )} */}
                <Text style={styles.headerText}>{title}</Text>
                <View style={{ width: 24 }} /> {/* Placeholder for spacing */}
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
        justifyContent: 'space-between',
    },
    headerText: {
        color: 'white',
        fontSize: width * 0.06,
        fontWeight: 'bold',
    },
});
