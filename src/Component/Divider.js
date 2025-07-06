import React from 'react';
import { View } from 'react-native';

const Divider = ({ color = '#D3D3D3', thickness = 1 }) => {
    return (
        <View style={{
            backgroundColor: color,
            height: thickness,
            width: '85%'
        }} />
    );
};

export default Divider;
