import React from 'react';
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import Header from './HeaderComponent';
import SpinBonusCard from './SpinBonusCard';

const { width, height } = Dimensions.get('window');

export default function SpinBonusComponet(props) {
    const { navigation } = props;

    const bonusData = [{
        title: '100 Spin Bonus',
        subtitle: 'Collect 100 Spin Bonus',
        dateTime: new Date(),
    }, {
        title: '50 Spin Bonus',
        subtitle: 'Collect 50 Spin Bonus',
        dateTime: new Date(),
    }]

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1E68FF" />

            <Header title='Spin Bonus' />

            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ marginVertical: 16 }}>
                    {bonusData.map((item, index) => (
                        <SpinBonusCard
                            key={index}
                            title={item.title}
                            subtitle={item.subtitle}
                            dateTime={item.dateTime}
                            navigation={navigation}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9F1FF',
        // paddingHorizontal: 20,
    },
    header: {
        width: '100%',
        height: height * 0.12,
        backgroundColor: '#1E68FF',
        // borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'flex-end',
        padding: 20,
    },
    headerText: {
        color: 'white',
        fontSize: width * 0.06,
        fontWeight: 'bold',
    },
    mainCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        // width: '100%',
        alignItems: 'center',
        paddingVertical: 25,
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: height * 0.05,
        // // elevation: 5
    },
    mainImage: {
        width: width * 0.15,
        height: width * 0.15,
        // marginBottom: 10,
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
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 10,
    },
});
