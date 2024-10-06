import { Image, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const backgroundColors = ['#FDEAEA', '#EFFAF6'];
const textColors = ['#A4262C', '#156146'];

const LQDPoolPairCard = ({
  change,
  increased,
  primaryIconURL,
  primaryTitle,
  secondaryIconURL,
  secondaryTitle,
}: ILQDPoolPairCard) => {
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

        <View
          style={[
            styles.changeContainer,
            { backgroundColor: backgroundColors[+increased] },
          ]}
        >
          <Ionicons
            name={increased ? 'arrow-up' : 'arrow-down'}
            size={12}
            color={textColors[+increased]}
          />
          <Text style={[styles.change, { color: textColors[+increased] }]}>
            {change}%
          </Text>
        </View>
      </View>

      <Text style={styles.title}>
        {primaryTitle} / {secondaryTitle}
      </Text>
    </View>
  );
};

export default LQDPoolPairCard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    gap: 16,
  },

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18 + 6,
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

  title: {
    color: '#1E293B',
    fontSize: 15,
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  changeContainer: {
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    borderRadius: 8,
  },

  change: {
    fontSize: 11,
    lineHeight: 13.64,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
});
