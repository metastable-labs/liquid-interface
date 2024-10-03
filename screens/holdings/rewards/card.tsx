import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const RewardCard = ({
  condition,
  fee,
  id,
  primaryIconURL,
  primaryTitle,
  secondaryIconURL,
  secondaryTitle,
  variant,
  aero,
  fees,
}: IRewardCard) => {
  const conditionColors = {
    stable: '#B47818',
    volatile: '#AF1D38',
  };

  const rewards = {
    fees: {
      label: 'Fees Earned',
      render: (
        <View style={{ alignItems: 'center', gap: 5, flexDirection: 'row' }}>
          <Text style={styles.rewardValue}>
            {fees?.primaryValue.toLocaleString()} {fees?.primaryName}
          </Text>
          <View style={styles.separatorAlt}>
            <View style={styles.separatorCircleAlt} />
          </View>
          <Text style={styles.rewardValue}>
            {fees?.secondaryValue.toLocaleString()} {fees?.secondaryName}
          </Text>
        </View>
      ),
    },
    aero: {
      label: 'AERO rewards:',
      render: (
        <Text style={styles.rewardValue}>{aero?.toLocaleString()} AERO</Text>
      ),
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.iconContainer}>
          {[primaryIconURL, secondaryIconURL].map((iconURL, index) => (
            <View
              key={index}
              style={[
                styles.icon,
                index === 0 && { position: 'relative', zIndex: 1 },
              ]}
            >
              <Image
                source={{ uri: iconURL }}
                style={{ width: 24, height: 24 }}
              />
            </View>
          ))}
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.detailHeader}>
            {condition.charAt(0)}AMM - {primaryTitle} / {secondaryTitle}
          </Text>

          <View style={styles.details}>
            <Text
              style={[
                styles.detailText,
                {
                  color: conditionColors[condition],
                  textTransform: 'capitalize',
                },
              ]}
            >
              Basic {condition}
            </Text>

            <View style={styles.separator}>
              <View style={styles.separatorCircle} />
            </View>

            <Text style={[styles.detailText, { color: '#64748B' }]}>
              {fee}% Fee
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardLabel}>{rewards[variant].label}</Text>
          {rewards[variant].render}
        </View>

        <TouchableOpacity>
          <View style={styles.action}>
            <Text style={styles.actionText}>Claim</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RewardCard;

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
  },

  fee: {
    color: '#64748B',
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

  bottomContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  separatorAlt: {
    position: 'relative',
    width: 14,
    height: 1,
    backgroundColor: '#7FB3FE66',
  },

  separatorCircleAlt: {
    width: 6,
    height: 6,
    borderRadius: 9999,
    backgroundColor: '#7FB3FE',
    position: 'absolute',
    top: -2.5,
    left: '26%',
  },

  rewardContainer: {
    justifyContent: 'center',
    gap: 5,
  },

  rewardLabel: {
    color: '#64748B',
    fontSize: 11,
    lineHeight: 13.64,
  },

  rewardValue: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 16.12,
    fontWeight: '500',
  },

  action: {
    height: 30,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4691FE',
  },

  actionText: {
    color: '#FFF',
    fontSize: 11,
    lineHeight: 13.64,
    textTransform: 'capitalize',
  },
});
