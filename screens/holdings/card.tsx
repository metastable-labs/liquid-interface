import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { LQDPressAnimation } from '@/components';

const icons = {
  primary: <Ionicons name="wallet-outline" size={18} color="#FFF" />,
  secondary: <Ionicons name="radio-outline" size={18} color="#FFF" />,
  tertiary: <Ionicons name="contract-outline" size={18} color="#FFF" />,
  quaternary: <Ionicons name="logo-usd" size={18} color="#FFF" />,
};

const Card = ({ details, subtitle, title, variant }: IItem) => {
  const { router } = useSystemFunctions();

  const config: ICardConfig = {
    primary: {
      primaryColor: '#EBF1FF',
      secondaryColor: '#162664',
      label: 'Liquid balance',
      action: () => router.navigate('/(tabs)/holdings/assets'),
    },
    secondary: {
      primaryColor: '#FEF7EC',
      secondaryColor: '#693D11',
      label: 'LP balance',
      action: () => router.navigate('/(tabs)/holdings/pools'),
    },
    tertiary: {
      primaryColor: '#EEEBFF',
      secondaryColor: '#2B1664',
      label: 'Aero rewards',
      action: () =>
        router.navigate({
          pathname: '/(tabs)/holdings/rewards',
          params: { type: 'aero' },
        }),
    },
    quaternary: {
      primaryColor: '#EBFAFF',
      secondaryColor: '#164564',
      label: 'Fees earned',
      action: () =>
        router.navigate({
          pathname: '/(tabs)/holdings/rewards',
          params: { type: 'fees' },
        }),
    },
  };

  return (
    <View
      style={{
        ...styles.container,
        borderColor: config[variant].primaryColor,
        backgroundColor: config[variant].primaryColor,
      }}
    >
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <View
            style={{
              ...styles.iconContainer,
              backgroundColor: config[variant].secondaryColor,
            }}
          >
            {icons[variant]}
          </View>

          <View style={styles.labelAndHeader}>
            <Text
              style={{
                ...styles.label,
                color: config[variant].secondaryColor,
              }}
            >
              {config[variant].label}
            </Text>

            <View style={styles.titleAndSubtitle}>
              <Text
                style={{
                  ...styles.title,
                  color: config[variant].secondaryColor,
                }}
              >
                {title}
              </Text>

              <Text
                style={{
                  ...styles.subtitle,
                  color: config[variant].secondaryColor,
                }}
              >
                {subtitle}
              </Text>
            </View>
          </View>
        </View>

        <Ionicons
          name="information-circle-outline"
          size={20}
          color={config[variant].secondaryColor}
        />
      </View>

      <View style={styles.bottom}>
        <View style={styles.details}>
          {details.map((detail, index) => (
            <View key={index} style={styles.detail}>
              <Text
                style={{
                  ...styles.detailTitle,
                  color: config[variant].secondaryColor,
                }}
              >
                {detail.title}
              </Text>

              <Text
                style={{
                  ...styles.detailValue,
                  color: config[variant].secondaryColor,
                }}
              >
                {detail.value}
              </Text>
            </View>
          ))}
        </View>

        <LQDPressAnimation
          onPress={config[variant].action}
          style={styles.actionContainer}
        >
          <Text
            style={{
              ...styles.actionText,
              color: config[variant].secondaryColor,
            }}
          >
            {variant === 'primary' ? 'View assets' : 'See all'}
          </Text>

          <Ionicons
            name="chevron-forward-outline"
            size={14}
            color={config[variant].secondaryColor}
          />
        </LQDPressAnimation>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'stretch',
    padding: 16,
    gap: 16,
    borderRadius: 12,
    borderWidth: 1,
  },

  top: {
    alignSelf: 'stretch',
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  iconContainer: {
    width: 30,
    height: 30,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
  },

  labelAndHeader: {
    alignSelf: 'stretch',
    gap: 4,
  },

  label: {
    fontSize: 14,
    lineHeight: 18.48,
  },

  titleAndSubtitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  title: {
    fontSize: 18,
    lineHeight: 27,
    letterSpacing: -0.36,
    fontFamily: 'ClashDisplaySemibold',
    fontWeight: '600',
  },

  subtitle: {
    fontSize: 12,
    lineHeight: 15.84,
  },

  bottom: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },

  detail: {
    justifyContent: 'center',
    gap: 4,
  },

  detailTitle: {
    fontSize: 11,
    lineHeight: 13.64,
  },

  detailValue: {
    fontSize: 14,
    lineHeight: 18.48,
    fontWeight: '500',
  },

  actionContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  actionText: {
    fontSize: 13,
    lineHeight: 16.12,
  },
});
