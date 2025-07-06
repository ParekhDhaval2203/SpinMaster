import DeviceInfo from 'react-native-device-info';

export const getDeviceId = async () => {
    try {
        const id = await DeviceInfo.getUniqueId();
        return id;
    } catch (error) {
        console.error('Failed to get device ID:', error);
        return null;
    }
};
