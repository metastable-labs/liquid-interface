import { Image, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const backgroundColors = ['rgba(255, 9, 9, 0.05)', 'rgba(9, 195, 127, 0.05)'];
const textColors = ['#D95D5D', '#09C37F'];

const Gainers = ({
  change,
  increased,
  primaryIconURL,
  primaryTitle,
  secondaryIconURL,
  secondaryTitle,
}: IGainers) => {
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
            name={increased ? 'caret-up' : 'caret-down'}
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

export default Gainers;

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
  },
});
