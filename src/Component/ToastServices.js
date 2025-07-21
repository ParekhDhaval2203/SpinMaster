import Toast from 'react-native-toast-message';

const DEFAULT_OPTIONS = {
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
};

const ToastTypes = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning',
};

const showToast = (text1, type = 'sucess') =>
    Toast.show({
        type: type,
        text1,
        ...DEFAULT_OPTIONS,
    });

const showCustom = (type, text1, text2 = '', customOptions = {}) =>
    Toast.show({
        type,
        text1,
        text2,
        ...DEFAULT_OPTIONS,
        ...customOptions,
    });

export default {
    showToast,
    showCustom,
    ToastTypes
};
