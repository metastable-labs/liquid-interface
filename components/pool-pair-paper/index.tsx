import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Href } from 'expo-router';

import { formatNumberWithSuffix } from '@/utils/helpers';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const LQDPoolPairPaper = ({
  apr,
  capital,
  fees,
  id,
  primaryIconURL,
  primaryTitle,
  secondaryIconURL,
  secondaryTitle,
  capitalMetric = 'vol',
  navigationVariant = 'primary',
}: ILQDPoolPairPaper) => {
  const { router } = useSystemFunctions();

  const paths = {
    primary: `/(tabs)/home/${id}` as Href<string>,
    secondary: `/(tabs)/holdings/${id}` as Href<string>,
  };

  const handlePress = () => router.push(paths[navigationVariant]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.leftContainer}>
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
            {primaryTitle} / {secondaryTitle}
          </Text>

          <View style={styles.details}>
            <Text style={styles.detailText}>{apr}% APR</Text>

            <View style={styles.separator}>
              <View style={styles.separatorCircle} />
            </View>

            <Text style={styles.detailText}>{fees}% Fees</Text>
          </View>
        </View>
      </View>

      <Text style={styles.volumeText}>
        ${formatNumberWithSuffix(capital)} {capitalMetric}
      </Text>
    </TouchableOpacity>
  );
};

export default LQDPoolPairPaper;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftContainer: {
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
    color: '#64748B',
    fontSize: 11,
    lineHeight: 13.64,
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

  volumeText: {
    color: '#156146',
    fontSize: 13,
    lineHeight: 16.12,
    fontWeight: '500',
    textTransform: 'uppercase',
    fontFamily: 'AeonikMedium',
  },
});
