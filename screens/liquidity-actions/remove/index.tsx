import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { LQDButton, LQDPoolImages, LQDTokenImage } from '@/components';
import { adjustFontSizeForIOS, formatSymbol } from '@/utils/helpers';
import { styles } from './styles';
import PercentageSetter from './percentage-setter';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { TokenItem } from '@/store/account/types';

const ICON_PLACEHOLDER = 'https://res.cloudinary.com/dxnd4k222/image/upload/v1717871583/Avatar_1.0_npmw4c.png';

const dummy = {
  primaryIconURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
  primaryTitle: 'USDC',
  secondaryIconURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119032/uwficdtvggd49apjfpt4.png',
  secondaryTitle: 'ETH',
  condition: 'stable',
};

const RemoveLiquidity = () => {
  const { poolsState, accountState } = useSystemFunctions();

  const [percentage, setPercentage] = useState(25);
  const [tokenA, setTokenA] = useState<TokenItem>();
  const [tokenB, setTokenB] = useState<TokenItem>();

  const { selectedPool } = poolsState;
  const { tokens } = accountState;

  const tokenAIconUrl = selectedPool?.token0?.logoUrl;
  const tokenBIconUrl = selectedPool?.token1?.logoUrl;
  const symbol = formatSymbol(selectedPool?.symbol || '', true);

  const onSubmit = () => {
    console.log('Submitting liquidity request');
  };

  const depositions = [
    {
      iconURL: tokenA?.logoUrl,
      title: tokenA?.symbol,
      value: 0,
    },
    {
      iconURL: tokenB?.logoUrl,
      title: tokenB?.symbol,
      value: 0,
    },
  ];

  const receive = [
    {
      iconURL: tokenA?.logoUrl,
      title: tokenA?.symbol,
      nativeValue: 0,
      usdValue: 0,
    },
    {
      iconURL: tokenB?.logoUrl,
      title: tokenB?.symbol,
      nativeValue: 0,
      usdValue: 0,
    },
  ];

  useEffect(
    function initializeTokenData() {
      if (!tokens.data || !selectedPool) return;

      const tokenAData = tokens.data.find((token) => token.address === selectedPool.token0.address);
      const tokenBData = tokens.data.find((token) => token.address === selectedPool.token1.address);

      if (!tokenAData || !tokenBData) return;

      setTokenA({ ...tokenAData });
      setTokenB({ ...tokenBData });
    },
    [tokens, selectedPool]
  );

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.contentStyle}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Remove liquidity</Text>
          <Text style={styles.subtitle}>Remove liquidity from pool</Text>
        </View>

        <View style={styles.pairContainer}>
          <LQDPoolImages tokenAIconURL={tokenAIconUrl} tokenBIconURL={tokenBIconUrl} />

          <Text style={styles.pairText}>{symbol}</Text>
        </View>

        <View style={styles.percentageSetterContainer}>
          <PercentageSetter setPercentage={setPercentage} />

          <View style={styles.depositions}>
            {depositions.map(({ iconURL, title, value }, index) => (
              <View style={styles.spacedContainer} key={index}>
                <View style={styles.depositionLeft}>
                  <LQDTokenImage iconURL={iconURL} />

                  <Text style={styles.coinTitle}>{title}</Text>
                </View>

                <View style={styles.depositionRight}>
                  <Text style={styles.depositionBase}>Deposited:</Text>
                  <Text style={styles.depositionValue}>
                    {value.toLocaleString()} {title}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.receiveContainer}>
          <Text style={styles.receiveTitle}>You’ll receive at least:</Text>

          {receive.map(({ iconURL, nativeValue, usdValue, title }, index) => (
            <View style={styles.spacedContainer} key={index}>
              <View style={styles.depositionLeft}>
                <LQDTokenImage iconURL={iconURL} />

                <Text style={[styles.coinTitle, { fontSize: adjustFontSizeForIOS(16, 2), lineHeight: 19.2 }]}>{title}</Text>
              </View>

              <Text style={styles.receivePrimaryValue}>
                {nativeValue.toLocaleString()} {title} <Text style={styles.receiveSecondaryValue}>${usdValue.toLocaleString()}</Text>
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <LQDButton title="Hold to confirm" onPress={onSubmit} variant="secondary" />
      </View>
    </ScrollView>
  );
};

export default RemoveLiquidity;
