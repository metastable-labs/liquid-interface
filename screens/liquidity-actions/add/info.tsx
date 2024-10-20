import { View, Text } from 'react-native';

import { infoStyles as styles } from './styles';
import { BitcoinConvertIcon, CoinsLGIcon, MoneyTickIcon } from '@/assets/icons';

const icons = {
  primary: <BitcoinConvertIcon />,
  secondary: <MoneyTickIcon />,
  tertiary: <CoinsLGIcon />,
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
