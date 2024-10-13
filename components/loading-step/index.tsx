import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const LQDLoadingStep = ({
  icon,
  isCompleted,
  subtitle,
  title,
}: ILQDLoadingStep) => {
  const opacityValue = useSharedValue(0);
  const connectorHeight = useSharedValue(0);

  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacityValue.value, { duration: 500 }),
    };
  });

  const animatedConnectorStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(connectorHeight.value, {
        damping: 10,
        stiffness: 100,
      }),
    };
  });

  useEffect(() => {
    if (isCompleted) connectorHeight.value = 36;

    opacityValue.value = 1;
  }, [isCompleted]);

  return (
    <Animated.View style={[styles.container, animatedOpacityStyle]}>
      <View style={styles.connectorWrap}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={24} color="#4691FE" />
        </View>

        <Animated.View style={[styles.connector, animatedConnectorStyle]} />
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Animated.View>
  );
};

export default LQDLoadingStep;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    gap: 16,
  },

  connectorWrap: {
    alignSelf: 'stretch',
    paddingBottom: 4,
    alignItems: 'center',
    gap: 4,
  },

  iconContainer: {
    width: 48,
    height: 48,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#EAECF0',
    backgroundColor: '#FFF',
    shadowColor: 'rgba(16, 24, 40, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },

  connector: {
    width: 2,
    borderRadius: 2,
    backgroundColor: '#4691FE',
  },

  details: {
    flex: 1,
    paddingBottom: 32,
    gap: 2,
  },

  title: {
    color: '#0F172A',
    fontSize: 18,
    lineHeight: 23.76,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  subtitle: {
    color: '#64748B',
    fontSize: 16,
    lineHeight: 19.84,
    fontFamily: 'AeonikRegular',
  },
});
