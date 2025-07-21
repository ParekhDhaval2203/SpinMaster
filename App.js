import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeComponent from './src/Component/HomeComponent';
import OfferDetailsScreen from './src/Component/OfferDetailsScreen';
import SettingScreen from './src/Component/Settings';
import SpinBonusComponet from './src/Component/SpinBonusComponet';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import { useEffect, useState } from 'react';
import SplashScreen from './src/Component/SplashScreen';
import NoInternetWrapper from './src/Component/NoInternet';
import MaintenancePopup from './src/Component/MaintenancePopup';
import Toast from 'react-native-toast-message';
import ToastServices from './src/Component/ToastServices';
// import firebase from '@react-native-firebase/app';

const Stack = createNativeStackNavigator();

// const firebaseConfig = {
// 	apiKey: "AIzaSyAKp6--RmbcpnlyBMlX2B51C0VTQTj6qso",
// 	projectId: "spinmaster-2203",
// 	storageBucket: "spinmaster-2203.firebasestorage.app",
// 	messagingSenderId: "540396704560",
// 	appId: "1:540396704560:android:15b1f28ddd6371814d6ef5"
// };

function App() {
	const [adsInitialized, setAdsInitialized] = useState(false);
	const [isOnline, setIsOnline] = useState(true);
	const [maintenance, setMaintenance] = useState(false);

	const checkConnection = (callback) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = () => callback(true);
		xhr.onerror = () => callback(false);
		xhr.open('GET', 'https://clients3.google.com/generate_204', true);
		xhr.send();
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			checkConnection((isConnected) => {
				setIsOnline(isConnected);
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);


	useEffect(() => {
		// firebase.initializeApp(firebaseConfig);
		mobileAds()
			.setRequestConfiguration({
				maxAdContentRating: MaxAdContentRating.PG,
				tagForChildDirectedTreatment: true,
				tagForUnderAgeOfConsent: true,
			})
			.then(() => mobileAds().initialize()
				.then(() => {
					setAdsInitialized(true);
				})
			)
	}, []);

	return (
		<MaintenancePopup maintenance={maintenance}>
			<NoInternetWrapper isOnline={isOnline}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
						<Stack.Screen name="SplashScreen">
							{props => <SplashScreen {...props} adsInitialized={adsInitialized} />}
						</Stack.Screen>
						<Stack.Screen name="Home">
							{props => <HomeComponent {...props} adsInitialized={adsInitialized} />}
						</Stack.Screen>
						<Stack.Screen name="SpinBonus">
							{props => <SpinBonusComponet {...props} adsInitialized={adsInitialized} />}
						</Stack.Screen>
						<Stack.Screen name="OfferDetails">
							{props => <OfferDetailsScreen {...props} adsInitialized={adsInitialized} />}
						</Stack.Screen>
						<Stack.Screen name="Settings">
							{props => <SettingScreen {...props} adsInitialized={adsInitialized} />}
						</Stack.Screen>
					</Stack.Navigator>
				</NavigationContainer>
				<Toast />
			</NoInternetWrapper>
		</MaintenancePopup>
	);
}

export default App;
