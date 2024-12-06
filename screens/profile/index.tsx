import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LQDFeedCard, LQDFlatlist, LQDImage } from '@/components';
import { CopyIcon, LinkIcon, UserOctagonIcon, XIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { SceneMap } from 'react-native-tab-view';
import useCustomTabView from '@/hooks/useCustomTabview';
import { feeds } from '../home';
const image = 'https://pics.craiyon.com/2023-08-02/7a951cac85bd4aa2b0e70dbaabb8404e.webp';
const Profile = () => {
  const { CustomTabView } = useCustomTabView();

  const FirstRoute = () => {
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
  const SecondRoute = () => {
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
  const ThirdRoute = () => {
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
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const [routes] = React.useState([
    { key: 'first', title: 'My Strategies' },
    { key: 'second', title: 'Deposits' },
    { key: 'third', title: 'Likes' },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <LQDImage edit height={56} width={56} src={image} />
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
            <CopyIcon fill="#64748B" />
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
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
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
