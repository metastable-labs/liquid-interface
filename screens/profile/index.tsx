import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import { LQDImage } from '@/components';
import { CopyIcon, FamcasterIcon, FillCheckIcon, LinkIcon, UserOctagonIcon, XIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import useCustomTabView from '@/hooks/useCustomTabview';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import UserStrategies from './user-strategies';
import UserLikedStrategies from './user-liked-strategies';
import UserRepostStrategies from './user-repost-strategies';

const Profile = () => {
  const { CustomTabView } = useCustomTabView();
  const { router } = useSystemFunctions();
  const [copyProfileLink, setCopyProfileLink] = useState(false);

  const handleCopyPL = () => {
    setCopyProfileLink((prev) => !prev);

    setTimeout(() => {
      setCopyProfileLink(false);
    }, 3000);
  };

  const renderScene = SceneMap({
    strategy: UserStrategies,
    deposit: UserRepostStrategies,
    like: UserLikedStrategies,
  });

  const [routes] = React.useState([
    { key: 'strategy', title: 'My Strategies' },
    { key: 'deposit', title: 'Deposits' },
    { key: 'like', title: 'Likes' },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <LQDImage action={() => router.push(`/(tabs)/profile/edit-profile`)} edit height={56} width={56} />
        <Text style={styles.username}>@jeffing.eth</Text>
        <View style={styles.addressWrapper}>
          <Text style={styles.address}>0xc57...13d4f</Text>
          <CopyIcon fill="#64748B" />
        </View>
        <View style={styles.actionBtnWrapper}>
          <Pressable style={styles.actionBtn}>
            <UserOctagonIcon />
            <Text style={styles.joinDate}>Joined NOV 2024</Text>
          </Pressable>
          <Pressable style={styles.actionBtn}>
            <XIcon height={19} width={18} />
          </Pressable>
          <Pressable style={styles.actionBtn}>
            <FamcasterIcon />
          </Pressable>
          <Pressable onPress={handleCopyPL} style={styles.actionBtn}>
            {copyProfileLink ? <FillCheckIcon /> : <LinkIcon />}
          </Pressable>
        </View>
      </View>

      <CustomTabView renderScene={renderScene} routes={routes} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  topWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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
  actionBtnWrapper: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 15, marginBottom: 20 },
  addressWrapper: { flexDirection: 'row', gap: 7 },
  username: {
    fontSize: adjustFontSizeForIOS(16, 1),
    fontFamily: 'ClashDisplayBold',
    fontWeight: '500',
    color: '#1E293B',
    lineHeight: 19.2,
    marginTop: 6,
    marginBottom: 5,
  },
  address: {
    fontSize: adjustFontSizeForIOS(13, 2),
    fontFamily: 'Aeonik',
    fontWeight: '400',
    color: '#64748B',
    lineHeight: 16.12,
  },
  joinDate: {
    fontSize: adjustFontSizeForIOS(14, 2),
    fontFamily: 'Aeonik',
    fontWeight: '500',
    color: '#1E293B',
  },
});
