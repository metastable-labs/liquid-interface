import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LQDBottomSheet, LQDImage, LQDScrollView, LQShrimeLoader } from '@/components';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { ConncetWalletProps } from '../types';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const ConncetWallet = ({ openCloseComment, showCommentSection, data }: ConncetWalletProps) => {
  const { router } = useSystemFunctions();

  const handleNavigate = () => {
    router.push('/deposit/connected-wallet');
    openCloseComment();
  };

  return (
    <View>
      <LQDBottomSheet show={showCommentSection} title="Connect a Wallet" sizeMode="contain" onClose={openCloseComment}>
        <View style={styles.cardContainer}>
          <LQDScrollView>
            {data.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.children.map((child) => (
                  <Pressable onPress={handleNavigate} key={child.id} style={styles.childContainer}>
                    <LQDImage height={35} width={35} borderRadius={9} />
                    <Text style={styles.childText}>{child.title}</Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </LQDScrollView>
        </View>

        <View style={styles.bottomWrapper}>
          <Text style={styles.bottomTitle}>New to ethereum wallets?</Text>
          <Pressable>
            <Text style={styles.bottomSubTitle}>Learn More</Text>
          </Pressable>
        </View>
      </LQDBottomSheet>
    </View>
  );
};

export default ConncetWallet;

const styles = StyleSheet.create({
  bottomTitle: {
    color: '#475569',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    textAlign: 'left',
    fontFamily: 'AeonikRegular',
  },
  bottomSubTitle: {
    color: '#4691FE',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    textAlign: 'left',
    fontWeight: '600',
    fontFamily: 'AeonikBold',
  },
  bottomWrapper: {
    height: 60,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },

  cardContainer: {
    alignSelf: 'stretch',
    flex: 1,
    height: 320,
    maxHeight: 450,
  },
  itemContainer: {
    gap: 10,
    marginBottom: 10,
  },
  itemTitle: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(15, 2),
    fontWeight: '600',
    fontFamily: 'AeonikMedium',
  },
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  childText: {
    color: '#020617',
    fontSize: adjustFontSizeForIOS(14, 2),
    fontWeight: '400',
    fontFamily: 'AeonikBold',
  },
});
