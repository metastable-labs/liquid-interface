import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LQDButton, LQDInput } from '@/components';
import { useForm } from 'react-hook-form';
import { CautionIcon, FaceIDIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';

const RecepientAddress = () => {
  const { control, watch, reset } = useForm();
  const searchValue = watch('search');

  const onSubmit = () => {};
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <LQDInput
          control={control}
          name="search"
          rules={{ required: true }}
          inputProps={{
            keyboardType: 'default',
            autoCapitalize: 'none',
            placeholder: 'Recepient address',
          }}
          variant="wallet"
          iconPosition="right"
        />

        <View style={styles.toastWrapper}>
          <CautionIcon />
          <Text style={styles.toastTitle}>Make sure the address supports USDC</Text>
        </View>
      </View>

      <View style={styles.action}>
        {searchValue && (
          <Pressable style={styles.faceIDBtn}>
            <FaceIDIcon />
            <Text style={styles.faceIDText}>Authenticate Using Face ID</Text>
          </Pressable>
        )}
        <LQDButton title="Hold to confirm" onLongPress={onSubmit} disabled={!searchValue} variant="secondary" />
      </View>
    </View>
  );
};

export default RecepientAddress;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flex: 1,
  },

  action: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'stretch',
    gap: 50,
  },

  toastWrapper: {
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EBF1FF',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },

  toastTitle: {
    fontSize: adjustFontSizeForIOS(14, 1),
    fontFamily: 'AeonikRegular',
    fontWeight: '400',
  },

  faceIDBtn: {
    backgroundColor: '#007AFF',
    height: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
  },

  faceIDText: {
    fontSize: adjustFontSizeForIOS(17, 1),
    lineHeight: 22,
    fontFamily: 'AeonikMedium',
    fontWeight: '400',
    color: '#fff',
  },
});
