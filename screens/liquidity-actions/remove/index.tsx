import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { LQDButton } from '@/components';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { styles } from './styles';
import PercentageSetter from './percentage-setter';

const ICON_PLACEHOLDER = 'https://res.cloudinary.com/dxnd4k222/image/upload/v1717871583/Avatar_1.0_npmw4c.png';

const dummy = {
  primaryIconURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
  primaryTitle: 'USDC',
  secondaryIconURL: 'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119032/uwficdtvggd49apjfpt4.png',
  secondaryTitle: 'ETH',
  condition: 'stable',
};

const RemoveLiquidity = () => {
  const [percentage, setPercentage] = useState(25);
  const onSubmit = () => {
    console.log('Submitting liquidity request');
  };

  const depositions = [
    {
      iconURL: dummy.primaryIconURL,
      title: dummy.primaryTitle,
      value: 3_600,
    },
    {
      iconURL: dummy.secondaryIconURL,
      title: dummy.secondaryTitle,
      value: 1,
    },
  ];

  const receive = [
    {
      iconURL: dummy.primaryIconURL,
      title: dummy.primaryTitle,
      primaryValue: 600,
      secondaryValue: 601,
    },
    {
      iconURL: dummy.secondaryIconURL,
      title: dummy.secondaryTitle,
      primaryValue: 0.4,
      secondaryValue: 601,
    },
  ];

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.contentStyle}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Remove liquidity</Text>
          <Text style={styles.subtitle}>Remove liquidity from pool</Text>
        </View>

        <View style={styles.pairContainer}>
          <View style={styles.iconContainer}>
            {[dummy?.primaryIconURL, dummy?.secondaryIconURL]?.map((iconURL, index) => (
              <View key={index} style={[styles.icon, index === 0 && { position: 'relative', zIndex: 1 }]}>
                <Image source={{ uri: iconURL || ICON_PLACEHOLDER }} style={{ width: 29.5, height: 29.5 }} />
              </View>
            ))}
          </View>

          <Text style={styles.pairText}>
            {dummy?.condition.charAt(0)}AMM - {dummy?.primaryTitle} / {dummy?.secondaryTitle}
          </Text>
        </View>

        <View style={styles.percentageSetterContainer}>
          <PercentageSetter setPercentage={setPercentage} />

          <View style={styles.depositions}>
            {depositions.map(({ iconURL, title, value }, index) => (
              <View style={styles.spacedContainer} key={index}>
                <View style={styles.depositionLeft}>
                  <View style={styles.secondaryIcon}>
                    <Image source={{ uri: iconURL || ICON_PLACEHOLDER }} style={{ width: 18, height: 18 }} />
                  </View>

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

          {receive.map(({ iconURL, primaryValue, secondaryValue, title }, index) => (
            <View style={styles.spacedContainer} key={index}>
              <View style={styles.depositionLeft}>
                <View style={styles.secondaryIcon}>
                  <Image source={{ uri: iconURL || ICON_PLACEHOLDER }} style={{ width: 18, height: 18 }} />
                </View>

                <Text style={[styles.coinTitle, { fontSize: adjustFontSizeForIOS(16, 2), lineHeight: 19.2 }]}>{title}</Text>
              </View>

              <Text style={styles.receivePrimaryValue}>
                {primaryValue.toLocaleString()} {title} <Text style={styles.receiveSecondaryValue}>${secondaryValue.toLocaleString()}</Text>
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
