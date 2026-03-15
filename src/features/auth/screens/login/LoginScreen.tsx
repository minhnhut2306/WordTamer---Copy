import { Typography } from '@/components/typography';
import Viewlayout from '@/layouts/view/ViewLayout';
import React from 'react';
import { View } from 'react-native';

const LoginScreen = () => {
  return (
    <Viewlayout>
      <View>
        <Typography children={'LoginScreen'}/>
      </View>
    </Viewlayout>
  );
};

export default LoginScreen;
