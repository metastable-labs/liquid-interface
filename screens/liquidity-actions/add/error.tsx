import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { errorStyles as styles } from './styles';

const ErrorMessage = ({ description, swap, title }: IErrorMessage) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>{title}</Text>
        {typeof description === 'string' ? (
          <Text style={styles.text}>{description}</Text>
        ) : (
          description
        )}
      </View>

      {swap && (
        <View style={styles.bottom}>
          <Text style={[styles.title, { fontFamily: 'AeonikMedium' }]}>
            Swap {swap.from}
          </Text>

          <Ionicons name="swap-horizontal" color="#693D11" size={16} />

          <Text style={[styles.title, { fontFamily: 'AeonikMedium' }]}>
            For {swap.from}?
          </Text>
        </View>
      )}
    </View>
  );
};

export default ErrorMessage;
