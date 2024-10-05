import { useState } from 'react';
import { ToastAndroid, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const useCopy = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = (text: string) => {
    Clipboard.setString(text);
    setHasCopied(true);

    Platform.OS === 'android' &&
      ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);

    setTimeout(() => {
      setHasCopied(false);
    }, 3000);
  };

  return { handleCopy, hasCopied };
};

export default useCopy;
