import { Typography } from '@/components/typography';
import ScrollViewLayout from '@/layouts/scroll-view/ScrollViewLayout';
import React from 'react';
import { View } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollViewLayout>
      <View>
        <Typography children={'HomeScreen'}/>
      </View>
    </ScrollViewLayout>
  );
};

export default HomeScreen;
