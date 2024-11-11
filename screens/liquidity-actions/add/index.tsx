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
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { defaultToken, TokenItem } from '@/store/account/types';

const AddLiquidity = () => {
  const { accountState } = useSystemFunctions();
  const { tokens } = accountState;
  const [method, setMethod] = useState<Method>('liquid');
  const [tokenA, setTokenA] = useState<TokenValue>({
    asset: defaultToken.data[0],
    value: '',
  });
  const [tokenB, setTokenB] = useState<TokenValue>({
    asset: defaultToken.data[1],
    value: '',
  });
  const [error, setError] = useState<ErrorState>(undefined);
  const [showInfo, setShowInfo] = useState(true);
  const [loading, setLoading] = useState(false);

  const errors: ErrorsArray = {
    primary: {
      title: `Swap ${tokenA.asset?.symbol} to ${tokenB.asset?.symbol}?`,
      description: (
        <Text style={styles.errorText}>
          You don’t have enough cbBTC. We’d balance the pool by swapping half of the{' '}
          <Text style={[styles.errorText, { fontFamily: 'AeonikMedium' }]}>{tokenA?.asset?.symbol}</Text> value to{' '}
          <Text style={[styles.errorText, { fontFamily: 'AeonikMedium' }]}>{tokenB?.asset?.symbol}</Text>.
        </Text>
      ),
      swap: {
        from: `(${1500}) ${tokenA?.asset?.symbol}`,
        for: `(${0.1}) ${tokenB?.asset?.symbol}`,
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
      title: `1 ${tokenA.asset?.symbol} to ${tokenB.asset?.symbol}`,
      value: `${0.805} ${tokenB.asset?.symbol}`,
    },
    {
      icon: 'secondary',
      title: "You'll pay:",
      value: `$${6000}`,
    },
    {
      icon: 'secondary',
      title: "You'll get:",
      value: `${6000} ${tokenA.asset?.symbol}`,
    },
    {
      icon: 'tertiary',
      title: 'Fees',
      value: `Free`,
    },
  ];

  const disableButton = !parseFloat(removeCommasFromNumber(tokenA.value)) || !parseFloat(removeCommasFromNumber(tokenB.value));

  const loadingViewStyle = useAnimatedStyle(() => ({
    opacity: withTiming(loading ? 1 : 0, { duration: 500 }),
  }));

  const handleTokenChange = (address: string, token: 'tokenA' | 'tokenB') => {
    const asset = tokens?.data?.find((asset) => asset.address === address);

    if (!asset) return;

    if (token === 'tokenA') setTokenA({ ...tokenA, asset: { ...tokenA.asset, ...asset } });
    if (token === 'tokenB') setTokenB({ ...tokenB, asset: { ...tokenB.asset, ...asset } });
  };

  const handleValueChange = (value: string, token: 'tokenA' | 'tokenB') => {
    const sanitizedValue = removeCommasFromNumber(value);
    const numberValue = parseFloat(sanitizedValue);
    let newValue = numberValue.toLocaleString(undefined, {
      maximumFractionDigits: 5,
    });

    if (isNaN(numberValue)) newValue = '';

    if (token === 'tokenA') {
      return setTokenA({ ...tokenA, value: newValue });
    }

    return setTokenB({ ...tokenB, value: newValue });
  };

  const onSubmit = () => {
    setLoading(true);
    console.log('Submitting liquidity request', { tokenA, tokenB });
  };

  useEffect(
    function initializeTokenData() {
      if (!tokens.data) return;

      const data = tokens.data;

      setTokenA({ ...tokenA, asset: { ...tokenA.asset, ...data[0] } });
      setTokenB({ ...tokenB, asset: { ...tokenB.asset, ...data[1] } });
    },
    [tokens]
  );

  useEffect(() => {
    const primaryIsInvalid = parseFloat(removeCommasFromNumber(tokenA.value)) > Number(tokenA.asset?.balance)!;
    const secondaryIsInvalid = parseFloat(removeCommasFromNumber(tokenB.value)) > Number(tokenB.asset?.balance)!;

    if (primaryIsInvalid && secondaryIsInvalid) return setError('secondary');

    if (secondaryIsInvalid) return setError('primary');
  }, [tokenA.value, tokenB.value, tokenA.asset?.balance, tokenB.asset?.balance]);

  if (loading) {
    return (
      <Animated.View style={[loadingViewStyle, styles.root, { flex: 1 }]}>
        <Loading primaryTitle={tokenA.asset?.symbol!} secondaryTitle={tokenB.asset?.symbol!} />
      </Animated.View>
    );
  }

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.contentStyle}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Liquidity</Text>
          <Text style={styles.subtitle}>Deposit liquidity to Earn trading fees </Text>
        </View>

        <PaymentMethodSelection method={method} setMethod={setMethod} />

        <View style={styles.inputs}>
          <CoinSelectorInput
            address={tokenA?.asset?.address}
            selectedToken={(address) => handleTokenChange(address, 'tokenA')}
            value={tokenA.value}
            onChange={(value) => handleValueChange(value, 'tokenA')}
          />

          <View style={styles.inputDivider}>
            <CircleAddIcon />
          </View>

          <CoinSelectorInput
            address={tokenB?.asset?.address}
            selectedToken={(address) => handleTokenChange(address, 'tokenB')}
            value={tokenB.value}
            onChange={(value) => handleValueChange(value, 'tokenB')}
          />
        </View>

        {/* {error && <ErrorMessage title={errors[error].title} description={errors[error].description} swap={errors[error].swap} />} */}

        {showInfo && <Info infos={infos} />}
      </View>

      <View style={styles.bottomContainer}>
        <LQDButton title="Proceed" disabled={disableButton} onPress={onSubmit} variant="secondary" />
      </View>
    </ScrollView>
  );
};

export default AddLiquidity;
