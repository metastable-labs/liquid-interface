import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { LQDButton, LQDImage } from '@/components';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { FamcasterIcon, XIcon } from '@/assets/icons';

const EditProfile = () => {
  const [username, setUsername] = useState('');

  const handleTagChange = (value: string) => {
    setUsername(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <LQDImage height={56} width={56} />
        <Text style={styles.title}>Upload photo</Text>
        <Text style={styles.subTitle}>Remove photo</Text>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <View style={[styles.inputWrapper]}>
          <Text style={styles.lable}>Username</Text>
          <TextInput
            style={[styles.input]}
            value={username}
            onChangeText={handleTagChange}
            placeholder="email"
            placeholderTextColor="#94A3B8"
            autoComplete="off"
            autoCorrect={false}
            autoCapitalize="none"
            spellCheck={false}
            inputMode="email"
          />
        </View>

        <View style={styles.bottomWrapper}>
          <Text style={styles.accountTitle}>X account</Text>
          <Text style={styles.accountSubTitle}>Verify your X account to display it on your profile and kep it real</Text>
          <View style={styles.btnWrapper}>
            <View style={styles.xIconFlex}>
              <Pressable style={styles.actionBtn}>
                <XIcon height={19} width={18} />
              </Pressable>
              <Text style={styles.username}>@Jeffing.eth</Text>
            </View>
            <Pressable style={styles.actionBtn}>
              <Text style={styles.disconnet}>Disconnect</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.bottomWrapper}>
          <Text style={styles.accountTitle}>Farcaster</Text>
          <Text style={styles.accountSubTitle}>Verify your Farcaster account to display it on your profile and kep it real</Text>
          <View style={styles.btnWrapper}>
            <View style={styles.xIconFlex}>
              <Pressable style={styles.actionBtn}>
                <FamcasterIcon />
              </Pressable>
              <Text style={styles.username}>@Jeffing.eth</Text>
            </View>
            <Pressable style={styles.actionBtn}>
              <Text style={styles.disconnet}>Connect</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.btnBottomWrapper}>
          <LQDButton title="Save" variant="secondary" />
          <Pressable>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  bottomWrapper: {
    marginTop: 24,
  },
  title: {
    fontSize: adjustFontSizeForIOS(12, 1),
    fontFamily: 'ClashDisplayMedium',
    fontWeight: '500',
    color: '#4691FE',
    lineHeight: 19.2,
    marginTop: 6,
    marginBottom: 3,
  },
  subTitle: {
    fontSize: adjustFontSizeForIOS(12, 1),
    fontFamily: 'ClashDisplayMedium',
    fontWeight: '500',
    color: '#AF1D38',
    lineHeight: 16.2,
  },
  accountTitle: {
    fontSize: adjustFontSizeForIOS(14, 1),
    fontFamily: 'Aeonik',
    fontWeight: '500',
    color: '#1E293B',
    lineHeight: 15.2,
    marginTop: 6,
    marginBottom: 3,
  },
  accountSubTitle: {
    fontSize: adjustFontSizeForIOS(12, 1),
    fontFamily: 'Aeonik',
    fontWeight: '400',
    color: '#64748B',
    lineHeight: 19.2,
  },
  lable: {
    fontSize: adjustFontSizeForIOS(13, 1),
    fontFamily: 'Aeonik',
    fontWeight: '500',
    color: '#1E293B',
    lineHeight: 19.2,
    marginBottom: 5,
  },
  username: {
    fontSize: adjustFontSizeForIOS(14, 1),
    fontFamily: 'Aeonik',
    fontWeight: '500',
    color: '#1E293B',
    lineHeight: 19.2,
  },
  disconnet: {
    fontSize: adjustFontSizeForIOS(14, 1),
    fontFamily: 'Aeonik',
    fontWeight: '500',
    color: '#475569',
    lineHeight: 19.2,
  },
  inputWrapper: {
    borderBottomWidth: 1,
    paddingBottom: 24,
    borderColor: '#F1F5F9',
    marginTop: 20,
  },
  input: {
    alignSelf: 'stretch',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderColor: '#EAEEF4',
    color: '#020617',
    fontSize: adjustFontSizeForIOS(14, 2),
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
    borderWidth: 1,
  },
  actionBtn: {
    flexDirection: 'row',
    gap: 7,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 15 },
  xIconFlex: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  cancel: {
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 16,
    color: '#64748B',
    fontFamily: 'QuantaGroteskProSemiBold',
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 20,
  },
  btnBottomWrapper: {
    marginTop: 40,
  },
});
