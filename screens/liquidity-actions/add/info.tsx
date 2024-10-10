import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { infoStyles as styles } from './styles';

const icons = {
  primary: <Ionicons name="swap-horizontal" color="#64748B" size={20} />,
  secondary: <Ionicons name="save-outline" color="#64748B" size={20} />,
  tertiary: <Ionicons name="airplane-outline" color="#64748B" size={20} />,
};

const Info = ({ infos }: IInfo) => {
  return (
    <View style={styles.container}>
      {infos.map((info, index) => (
        <View key={index} style={styles.info}>
          <View style={styles.iconAndTitle}>
            {icons[info.icon]}

            <Text style={styles.title}>{info.title}</Text>
          </View>

          <Text style={styles.value}>{info.value}</Text>
        </View>
      ))}
    </View>
  );
};

export default Info;
