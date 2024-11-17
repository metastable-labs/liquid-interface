import { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { publicClient } from '@/init/client';
import { PublicClient } from 'viem';

import { LQDButton } from '@/components';
import { formatInputAmount, removeCommasFromNumber } from '@/utils/helpers';
import { CircleAddIcon } from '@/assets/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { defaultToken } from '@/store/account/types';
import { AddLiquidityWithSwapParams, Token } from '@/hooks/types';
import { useLiquidity } from '@/hooks/useLiquid';
import PaymentMethodSelection from './method-selection';
import CoinSelectorInput from './coin-selector-input';
import Info from './info';
import { styles } from './styles';
import Loading from './loading';
import ErrorMessage from './error';
import SelectPool from './pool-selector';
import { Pool } from '@/store/pools/types';

const AddLiquidity = () => {
  const { accountState, smartAccountState, poolsState } = useSystemFunctions();
  const { addLiquidity } = useLiquidity(publicClient as PublicClient);

  const [method, setMethod] = useState<Method>('liquid');
  const [defaultTokens, setDefaultTokens] = useState<{ tokenA: TokenItem; tokenB: TokenItem }>();

  const [pools, setPools] = useState<Pool[]>([]);
  const [tokenA, setTokenA] = useState<TokenValue>({
    asset: undefined,
    value: '',
  });
  const [tokenB, setTokenB] = useState<TokenValue>({
    asset: undefined,
    value: '',
  });
  const [error, setError] = useState<ErrorState>(undefined);
  const [loading, setLoading] = useState(false);

  const { tokens } = accountState;
  const { selectedPool } = poolsState;

  const errors: ErrorsArray = useMemo(() => {
    return {
      insufficientBalance: {
        title: `Swap ${tokenA.asset?.symbol} to ${tokenB.asset?.symbol}?`,
        description: (
          <Text style={styles.errorText}>
            You don’t have enough value. We’d balance the pool by swapping half of the{' '}
            <Text style={[styles.errorText, { fontFamily: 'AeonikMedium' }]}>{tokenA?.asset?.symbol}</Text> value to{' '}
            <Text style={[styles.errorText, { fontFamily: 'AeonikMedium' }]}>{tokenB?.asset?.symbol}</Text>.
          </Text>
        ),
        swap: {
          from: `(${1500}) ${tokenA?.asset?.symbol}`,
          for: `(${0.1}) ${tokenB?.asset?.symbol}`,
        },
      },

      insufficientLiquidBalance: {
        title: 'Proceed with debit card?',
        description: 'You don’t have enough balances in your Liquid account, you can proceed to pay with your debit card',
      },

      noMatchingPools: {
        title: 'No matching pools',
        description: `There's no available pool for ${tokenA.asset?.symbol} / ${tokenB.asset?.symbol}. Try selecting ${tokenB.asset?.symbol} as the first token and ${tokenA.asset?.symbol} as the second.`,
      },
    };
  }, []);

  const infos: Array<Info> = [
    {
      icon: 'primary',
      title: `1 ${tokenA.asset?.symbol} to ${tokenB.asset?.symbol}`,
      value: `${0.805} ${tokenB.asset?.symbol}`,
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

  const didUserChangeToken = !defaultToken
    ? false
    : tokenA.asset?.address !== defaultTokens?.tokenA?.address || tokenB.asset?.address !== defaultTokens?.tokenB?.address;

  const handleTokenChange = async (address: string, token: 'tokenA' | 'tokenB') => {
    const asset = tokens?.data?.find((asset) => asset.address === address);

    if (!asset) return;

    if (token === 'tokenA') setTokenA({ ...tokenA, asset: { ...tokenA.asset, ...asset } });
    if (token === 'tokenB') setTokenB({ ...tokenB, asset: { ...tokenB.asset, ...asset } });
  };

  const handleValueChange = (value: string, token: 'tokenA' | 'tokenB') => {
    const formatedValue = formatInputAmount(value);

    if (token === 'tokenA') {
      return setTokenA({ ...tokenA, value: formatedValue });
    }

    return setTokenB({ ...tokenB, value: formatedValue });
  };

  const onSubmit = async () => {
    if (!smartAccountState.address) return;

    const tokenAParams: Token = {
      address: tokenA.asset?.address!,
      balance: tokenA.asset?.balance!,
      decimals: tokenA.asset?.decimals!,
      isListed: tokenA.asset?.isListed!,
      logoUrl: tokenA.asset?.logoUrl!,
      symbol: tokenA.asset?.symbol!,
      usdPrice: tokenA.asset?.usdPrice!,
    };

    const tokenBParams: Token = {
      address: tokenB.asset?.address!,
      balance: tokenB.asset?.balance!,
      decimals: tokenB.asset?.decimals!,
      isListed: tokenB.asset?.isListed!,
      logoUrl: tokenB.asset?.logoUrl!,
      symbol: tokenB.asset?.symbol!,
      usdPrice: tokenB.asset?.usdPrice!,
    };

    const param: AddLiquidityWithSwapParams = {
      tokenA: tokenAParams,
      tokenB: tokenBParams,
      amountAIn: tokenA.value,
      amountBIn: tokenB.value,
      deadline: BigInt(Math.floor(Date.now() / 1000) + 3600),
      stable: selectedPool?.isStable!,
      to: smartAccountState.address,
    };

    setLoading(true);

    if (method === 'liquid') {
      const response = await addLiquidity(param, { waitForReceipt: true });

      console.log(selectedPool, 'selected pool');

      console.log('Submitting liquidity request', { tokenA, tokenB });
    }

    if (method === 'coinbase') {
      console.log('Submitting coinbase request', { tokenA, tokenB });
    }

    if (method === 'debit') {
      console.log('Submitting debit request', { tokenA, tokenB });
    }
  };

  useEffect(
    function initializeTokenData() {
      if (!tokens.data || !selectedPool) return;

      const tokenAData = tokens.data.find((token) => token.address === selectedPool.token0.address);
      const tokenBData = tokens.data.find((token) => token.address === selectedPool.token1.address);

      if (!tokenAData || !tokenBData) return;

      setTokenA({ ...tokenA, asset: { ...tokenAData } });
      setTokenB({ ...tokenB, asset: { ...tokenBData } });

      if (!defaultTokens) setDefaultTokens({ tokenA: { ...tokenAData }, tokenB: { ...tokenBData } });
    },
    [tokens, selectedPool]
  );

  useEffect(
    function listenForErrors() {
      const tokenAAmountInIsInvalid = parseFloat(removeCommasFromNumber(tokenA.value)) > Number(tokenA.asset?.balance)!;
      const tokenBAmountInIsInvalid = parseFloat(removeCommasFromNumber(tokenB.value)) > Number(tokenB.asset?.balance)!;

      if (tokenAAmountInIsInvalid && tokenBAmountInIsInvalid) return setError('insufficientLiquidBalance');

      if (tokenBAmountInIsInvalid) return setError('insufficientBalance');

      return setError(undefined);
    },
    [tokenA.value, tokenB.value, tokenA.asset?.balance, tokenB.asset?.balance]
  );

  useEffect(
    function checkMatchingPools() {
      if (!tokens.data) return setPools([]);

      if (!tokenA.asset || !tokenB.asset || !didUserChangeToken) return setPools([]);

      const response = poolsState.pools.data.filter((pool) => {
        const tokenHasCl = pool.symbol.toLowerCase().includes('cl');
        const tokenAAddress = tokenA.asset?.address;
        const tokenBAddress = tokenB.asset?.address;

        return pool.token0.address === tokenAAddress && pool.token1.address === tokenBAddress && !tokenHasCl;
      });

      if (response.length === 0) setError('noMatchingPools');

      return setPools(response);
    },
    [tokenA.asset, tokenB.asset]
  );

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

        {error && <ErrorMessage title={errors[error].title} description={errors[error].description} swap={errors[error].swap} />}

        {<Info infos={infos} />}

        {didUserChangeToken && pools.length > 0 && <SelectPool pools={pools} />}
      </View>

      <View style={styles.bottomContainer}>
        <LQDButton title="Proceed" disabled={disableButton} onPress={onSubmit} variant="secondary" />
      </View>
    </ScrollView>
  );
};

export default AddLiquidity;
