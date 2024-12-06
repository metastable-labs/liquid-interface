import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LQDFeedCard, LQDFlatlist, LQDImage } from '@/components';
import { CopyIcon, FamcasterIcon, LinkIcon, UserOctagonIcon, XIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { SceneMap } from 'react-native-tab-view';
import useCustomTabView from '@/hooks/useCustomTabview';
import { feeds } from '../home';
import useSystemFunctions from '@/hooks/useSystemFunctions';
const Profile = () => {
  const { CustomTabView } = useCustomTabView();
  const { router } = useSystemFunctions();

  const StrategyRoute = () => {
    return (
      <LQDFlatlist
        data={feeds}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <LQDFeedCard feed={item} />}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: '#fff' }}
        onRefresh={() => {}}
      />
    );
  };

  const DepositRoute = () => {
    return (
      <LQDFlatlist
        data={feeds}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <LQDFeedCard feed={item} />}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: '#fff' }}
        onRefresh={() => {}}
      />
    );
  };

  const LikesRoute = () => {
    return (
      <LQDFlatlist
        data={feeds}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <LQDFeedCard feed={item} />}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: '#fff' }}
        onRefresh={() => {}}
      />
    );
  };

  const renderScene = SceneMap({
    strategy: StrategyRoute,
    deposit: DepositRoute,
    like: LikesRoute,
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
        <View style={{ flexDirection: 'row', gap: 7 }}>
          <Text style={styles.address}>0xc57...13d4f</Text>
          <CopyIcon fill="#64748B" />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 15, marginBottom: 20 }}>
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
          <Pressable style={styles.actionBtn}>
            <LinkIcon />
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
