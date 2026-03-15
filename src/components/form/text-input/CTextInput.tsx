import { useFormContext, Controller } from 'react-hook-form';
import {
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { Typography } from '../../typography';
import { ReactNode, useState } from 'react';
import { styles } from './styles';

type Props = {
  name: string;
  editable?: boolean;
  label?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  keyboardType?: KeyboardTypeOptions;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
};

export const CTextInput = ({
  name,
  label,
  editable = true,
  leftIcon,
  rightIcon,
  keyboardType = 'default',
  style,
  placeholder,
}: Props) => {
  const { control } = useFormContext();
  const [focused, setFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        const showClear =
          value?.trim() !== '' && value !== undefined && editable;

        return (
          <View style={[styles.container, editable && styles.uneditable]}>
            {label && <Typography children={label} variant="caption" />}
            <View
              style={[
                styles.viewInput,
                style,
                focused && styles.forcus,
                error && styles.error,
              ]}
            >
              {leftIcon}
              <TextInput
                keyboardType={keyboardType}
                editable={editable}
                placeholder={placeholder || ''}
                value={value}
                onBlur={() => {
                  onBlur();
                  setFocused(false);
                }}
                onFocus={() => {
                  setFocused(true);
                }}
                onChangeText={text => onChange(text)}
                selectionColor="blue"
                style={styles.textInput}
              />
              {showClear && (
                <TouchableOpacity
                  style={styles.btnClear}
                  onPress={() => onChange('')}
                >
                  <Typography children="X" />
                </TouchableOpacity>
              )}
              {rightIcon}
            </View>
            {error?.message && (
              <Typography children={error.message} color="red" />
            )}
          </View>
        );
      }}
    />
  );
};
