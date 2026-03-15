import { Typography } from '@/components/typography';
import Viewlayout from '@/layouts/view/ViewLayout';
import React from 'react';
import { View, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import CFormProvider from '@/components/form/form-provider/CFormProvider';
import { CTextInput } from '@/components/form/text-input/CTextInput';

const LoginScreen = () => {
  const methods = useForm({ defaultValues: { email: '', password: '' } });

  const onSubmit = (data: any) => {
    console.log('Login data:', data);
    // Handle login logic here
  };

  return (
    <CFormProvider methods={methods}>
      <Viewlayout>
        <View style={{ padding: 20, gap: 20 }}>
          <Typography variant="h1" weight="bold" children="Đăng nhập" />
          <CTextInput
            name="email"
            label="Email"
            placeholder="Nhập email của bạn"
            keyboardType="email-address"
          />
          <CTextInput
            name="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            keyboardType="default"
          />
          <Pressable onPress={methods.handleSubmit(onSubmit)} style={{ backgroundColor: '#A855F7', padding: 15, borderRadius: 10, alignItems: 'center' }}>
            <Typography variant="subtitle" weight="bold" color="#fff" children="Đăng nhập" />
          </Pressable>
        </View>
      </Viewlayout>
    </CFormProvider>
  );
};

export default LoginScreen;
