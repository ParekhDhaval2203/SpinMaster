import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeComponent from './src/Component/HomeComponent';
import SpinBonusComponet from './src/Component/SpinBonusComponet';
import OfferDetailsScreen from './src/Component/OfferDetailsScreen';
import SettingScreen from './src/Component/Settings';

const Stack = createNativeStackNavigator();

function App() {
	return (
		// <View style={styles.container}>
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeComponent} />
				<Stack.Screen name="SpinBonus" component={SpinBonusComponet} />
				<Stack.Screen name="OfferDetails" component={OfferDetailsScreen} />
				<Stack.Screen name="Settings" component={SettingScreen} />
			</Stack.Navigator>
		</NavigationContainer>
		// </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
