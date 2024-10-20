import { View, Text } from 'react-native';

import { SwapHorizontalIcon } from '@/assets/icons';
import { errorStyles as styles } from './styles';

const ErrorMessage = ({ description, swap, title }: IErrorMessage) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>{title}</Text>
        {typeof description === 'string' ? <Text style={styles.text}>{description}</Text> : description}
      </View>

      {swap && (
        <View style={styles.bottom}>
          <Text style={[styles.title, { fontFamily: 'AeonikMedium' }]}>Swap {swap.from}</Text>

          <SwapHorizontalIcon fill="#693D11" />

          <Text style={[styles.title, { fontFamily: 'AeonikMedium' }]}>For {swap.from}?</Text>
        </View>
      )}
    </View>
  );
};

export default ErrorMessage;
