import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { LQDButton } from '@/components';
import { removeCommasFromNumber } from '@/utils/helpers';
import { assets } from '@/screens/withdraw/dummy';
import PaymentMethodSelection from './method-selection';
import CoinSelectorInput from './coin-selector-input';
import ErrorMessage from './error';
import Info from './info';
import { styles } from './styles';
import Loading from './loading';
import { CircleAddIcon } from '@/assets/icons';

const AddLiquidity = () => {
  const [method, setMethod] = useState<Method>('liquid');
  const [primary, setPrimary] = useState<TokenValue>({
    asset: assets[0],
    value: '0',
  });
  const [secondary, setSecondary] = useState<TokenValue>({
    asset: assets[1],
    value: '0',
  });
  const [error, setError] = useState<ErrorState>(undefined);
  const [showInfo, setShowInfo] = useState(true);
  const [loading, setLoading] = useState(false);

  const errors: ErrorsArray = {
    primary: {
      title: `Swap ${primary.asset?.symbol} to ${secondary.asset?.symbol}?`,
      description: (
        <Text style={styles.errorText}>
          You don’t have enough cbBTC. We’d balance the pool by swapping half of the{' '}
          <Text style={[styles.errorText, { fontFamily: 'AeonikMedium' }]}>{primary?.asset?.symbol}</Text> value to{' '}
          <Text style={[styles.errorText, { fontFamily: 'AeonikMedium' }]}>{secondary?.asset?.symbol}</Text>.
        </Text>
      ),
      swap: {
        from: `(${1500}) ${primary?.asset?.symbol}`,
        for: `(${0.1}) ${secondary?.asset?.symbol}`,
      },
    },

    secondary: {
      title: 'Proceed with debit card?',
      description: 'You don’t have enough balances in your Liquid account, you can proceed to pay with your debit card',
    },
  };

  const infos: Array<Info> = [
    {
      icon: 'primary',
      title: `1 ${primary.asset?.symbol} to ${secondary.asset?.symbol}`,
      value: `${0.805} ${secondary.asset?.symbol}`,
    },
    {
      icon: 'secondary',
      title: "You'll pay:",
      value: `$${6000}`,
    },
    {
      icon: 'secondary',
      title: "You'll get:",
      value: `${6000} ${primary.asset?.symbol}`,
    },
    {
      icon: 'tertiary',
      title: 'Fees',
      value: `Free`,
    },
  ];

  const disableButton = !parseFloat(removeCommasFromNumber(primary.value)) || !parseFloat(removeCommasFromNumber(secondary.value));

  const loadingViewStyle = useAnimatedStyle(() => ({
    opacity: withTiming(loading ? 1 : 0, { duration: 500 }),
  }));

  const handleTokenChange = (id: string, token: 'primary' | 'secondary') => {
    const asset = assets.find((asset) => asset.id === id);
    if (asset) {
      if (token === 'primary') setPrimary({ ...primary, asset });
      if (token === 'secondary') setSecondary({ ...secondary, asset });
    }
  };

  const handleValueChange = (value: string, token: 'primary' | 'secondary') => {
    const sanitizedValue = removeCommasFromNumber(value);
    const numberValue = parseFloat(sanitizedValue);
    let newValue = numberValue.toLocaleString(undefined, {
      maximumFractionDigits: 5,
    });

    if (isNaN(numberValue)) newValue = '';

    if (token === 'primary') {
      return setPrimary({ ...primary, value: newValue });
    } else {
      return setSecondary({ ...secondary, value: newValue });
    }
  };

  const onSubmit = () => {
    setLoading(true);
    console.log('Submitting liquidity request', { primary, secondary });
  };

  useEffect(() => {
    const primaryIsInvalid = parseFloat(removeCommasFromNumber(primary.value)) > primary.asset?.balance!;
    const secondaryIsInvalid = parseFloat(removeCommasFromNumber(secondary.value)) > secondary.asset?.balance!;

    if (primaryIsInvalid && secondaryIsInvalid) return setError('secondary');

    if (secondaryIsInvalid) return setError('primary');
  }, [primary.value, secondary.value, primary.asset?.balance, secondary.asset?.balance]);

  return (
    <>
      {!loading && (
        <ScrollView style={styles.root} contentContainerStyle={styles.contentStyle}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Add Liquidity</Text>
              <Text style={styles.subtitle}>Deposit liquidity to Earn trading fees </Text>
            </View>

            <PaymentMethodSelection method={method} setMethod={setMethod} />

            <View style={styles.inputs}>
              <CoinSelectorInput
                tokenId={primary?.asset?.id}
                setTokenId={(id) => handleTokenChange(id, 'primary')}
                value={primary.value}
                onChange={(value) => handleValueChange(value, 'primary')}
              />

              <View style={styles.inputDivider}>
                <CircleAddIcon />
              </View>

              <CoinSelectorInput
                tokenId={secondary?.asset?.id}
                setTokenId={(id) => handleTokenChange(id, 'secondary')}
                value={secondary.value}
                onChange={(value) => handleValueChange(value, 'secondary')}
              />
            </View>

            {error && <ErrorMessage title={errors[error].title} description={errors[error].description} swap={errors[error].swap} />}

            {showInfo && <Info infos={infos} />}
          </View>

          <View style={styles.bottomContainer}>
            <LQDButton title="Proceed" disabled={disableButton} onPress={onSubmit} variant="secondary" />
          </View>
        </ScrollView>
      )}

      {loading && (
        <Animated.View style={[loadingViewStyle, styles.root, { flex: 1 }]}>
          <Loading primaryTitle={primary.asset?.symbol!} secondaryTitle={secondary.asset?.symbol!} />
        </Animated.View>
      )}
    </>
  );
};

export default AddLiquidity;
