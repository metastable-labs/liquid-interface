import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import PoolCardAction from './action';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const PoolCard = ({
  fees,
  id,
  lpBalance,
  primaryIconURL,
  primaryTitle,
  secondaryIconURL,
  secondaryTitle,
  stakedBalance,
  variant = 'stable',
}: IPoolCard) => {
  const { router } = useSystemFunctions();
  const flagColors = {
    stable: '#B47818',
    volatile: '#AF1D38',
  };

  const actions: Array<IPoolCardAction> = [
    { disabled: lpBalance <= 0, id, type: 'stake' },
    { disabled: stakedBalance <= 0, id, type: 'unstake' },
  ];

  return (
    <Pressable style={styles.container} onPress={() => router.push(`/holdings/${id}`)}>
      <View style={styles.topContainer}>
        <View style={styles.topLeftContainer}>
          <View style={styles.iconContainer}>
            {[primaryIconURL, secondaryIconURL].map((iconURL, index) => (
              <View key={index} style={[styles.icon, index === 0 && { position: 'relative', zIndex: 1 }]}>
                <Image source={{ uri: iconURL }} style={{ width: 24, height: 24 }} />
              </View>
            ))}
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.detailHeader}>
              {variant.charAt(0)}AMM - {primaryTitle} / {secondaryTitle}
            </Text>

            <View style={styles.details}>
              <Text style={[styles.detailText, { color: flagColors[variant], textTransform: 'capitalize' }]}>Basic {variant}</Text>

              <View style={styles.separator}>
                <View style={styles.separatorCircle} />
              </View>

              <Text style={[styles.detailText, { color: '#64748B' }]}>{fees}% Fee</Text>
            </View>
          </View>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>LP Balance:</Text>
          <Text style={styles.balanceValue}>{lpBalance.toLocaleString()} AERO-LP</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.actions}>
          {actions.map((action, index) => (
            <PoolCardAction key={index} {...action} />
          ))}
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Staked Balance:</Text>
          <Text style={styles.balanceValue}>{stakedBalance.toLocaleString()} AERO-LP</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PoolCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignSelf: 'stretch',
    gap: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEEF4',
  },

  topContainer: {
    paddingVertical: 2,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },

  topLeftContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 10 + 6,
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    marginRight: -6,
  },

  detailContainer: {
    justifyContent: 'center',
    gap: 4,
  },

  detailHeader: {
    color: '#1E293B',
    fontSize: 14,
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  details: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 4,
  },

  detailText: {
    fontSize: 11,
    lineHeight: 13.64,
    fontFamily: 'AeonikRegular',
  },

  fee: {
    color: '#64748B',
    fontFamily: 'AeonikRegular',
  },

  separator: {
    position: 'relative',
    width: 7,
    height: 0.5,
    backgroundColor: '#0C050766',
  },

  separatorCircle: {
    width: 3,
    height: 3,
    borderRadius: 9999,
    backgroundColor: '#0C0507',
    position: 'absolute',
    top: -1.35,
    left: '26%',
  },

  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 5,
  },

  balanceLabel: {
    color: '#64748B',
    fontSize: 11,
    lineHeight: 13.64,
    fontFamily: 'AeonikRegular',
  },

  balanceValue: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 16.12,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  bottomContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  actions: {
    flexDirection: 'row',
    gap: 16,
    height: 30,
  },
});
