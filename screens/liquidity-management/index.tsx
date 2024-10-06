import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import { LQDButton } from '@/components';
import { removeCommasFromNumber } from '@/utils/helpers';
import styles from './styles';

function truncateToDecimals(num: number) {
  const factor = Math.pow(10, 5);
  return (Math.floor(num * factor) / factor).toLocaleString(undefined, {
    maximumFractionDigits: 5,
  });
}

const tabs = ['stake', 'unstake'];

const ICON_PLACEHOLDER =
  'https://res.cloudinary.com/dxnd4k222/image/upload/v1717871583/Avatar_1.0_npmw4c.png';

const LiquidityManagement = ({ id, type }: ILiquidityManagement) => {
  const [tab, setTab] = useState(type);
  const [amount, setAmount] = useState('0');
  const [lpBalance, setLpBalance] = useState(999);
  const [stakedBalance, setStakedBalance] = useState(1060);
  const [pairDetails, setPairDetails] = useState<IPairDetails>();

  const balance = tab === 'stake' ? lpBalance : stakedBalance;

  const detailSubtitles = {
    stake: 'Stake your LP tokens to start earning AERO rewards',
    unstake: 'Unstake your LP tokens to stop earning AERO rewards',
  };

  const invalidAmount =
    (tab === 'stake' &&
      parseFloat(removeCommasFromNumber(amount)) > lpBalance) ||
    (tab === 'unstake' &&
      parseFloat(removeCommasFromNumber(amount)) > stakedBalance);

  const balancePartitions = [
    {
      text: '25%',
      action: () => setAmount(truncateToDecimals(balance * 0.25)),
    },
    {
      text: '50%',
      action: () => setAmount(truncateToDecimals(balance * 0.5)),
    },
    {
      text: '75%',
      action: () => setAmount(truncateToDecimals(balance * 0.75)),
    },
    { text: 'Max', action: () => setAmount(truncateToDecimals(balance)) },
  ];

  const handleAmountChange = (text: string) => {
    const sanitizedText = removeCommasFromNumber(text);

    const numberValue = parseFloat(sanitizedText);

    if (!isNaN(numberValue)) {
      return setAmount(
        numberValue.toLocaleString(undefined, {
          maximumFractionDigits: 5,
        })
      );
    }

    setAmount('');
  };

  const onSubmit = () => {
    const sanitizedAmount = removeCommasFromNumber(amount);

    const value = parseFloat(sanitizedAmount);

    console.log(`Submitting ${tab} request`, { id, value });
  };

  useEffect(() => {
    setPairDetails({
      primaryIconURL:
        'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
      primaryTitle: 'USDC',
      secondaryIconURL:
        'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119032/uwficdtvggd49apjfpt4.png',
      secondaryTitle: 'ETH',
      condition: 'stable',
    });
  }, [id]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentStyle}
    >
      <View style={styles.topContainer}>
        <View style={styles.tabs}>
          {tabs.map((text) => (
            <TouchableOpacity
              key={text}
              style={[
                styles.tab,
                text === tab ? styles.activeTab : styles.inactiveTab,
              ]}
              onPress={() => {
                setTab(text as ILiquidityManagement['type']);
                setAmount('0');
              }}
            >
              <Text
                style={[
                  styles.tabText,
                  text === tab ? styles.activeTabText : styles.inactiveTabText,
                ]}
              >
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.details}>
          <Text style={styles.detailTitle}>{tab}</Text>
          <Text style={styles.detailSubtitle}>{detailSubtitles[tab]}</Text>
        </View>

        <View style={styles.main}>
          <View
            style={[
              styles.inputAndBalance,
              invalidAmount && styles.invalidContainer,
            ]}
          >
            <TextInput
              value={amount}
              keyboardType="decimal-pad"
              style={[styles.input, invalidAmount && styles.invalidText]}
              onChangeText={handleAmountChange}
            />

            <View style={styles.balanceContainer}>
              <View style={styles.pairContainer}>
                <View style={styles.iconContainer}>
                  {[
                    pairDetails?.primaryIconURL,
                    pairDetails?.secondaryIconURL,
                  ]?.map((iconURL, index) => (
                    <View
                      key={index}
                      style={[
                        styles.icon,
                        index === 0 && { position: 'relative', zIndex: 1 },
                      ]}
                    >
                      <Image
                        source={{ uri: iconURL || ICON_PLACEHOLDER }}
                        style={{ width: 20, height: 20 }}
                      />
                    </View>
                  ))}
                </View>

                <Text style={styles.pairText}>
                  {pairDetails?.condition.charAt(0)}AMM -{' '}
                  {pairDetails?.primaryTitle} / {pairDetails?.secondaryTitle}
                </Text>
              </View>

              <View style={styles.balanceInfo}>
                <Text
                  style={[
                    styles.balanceTitle,
                    invalidAmount && styles.invalidText,
                  ]}
                >
                  {tab === 'stake' ? 'LP' : 'Staked'} BAL:
                </Text>
                <Text
                  style={[
                    styles.balanceValue,
                    invalidAmount && styles.invalidText,
                  ]}
                >
                  {balance.toLocaleString()} LP
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.partitions}>
            {balancePartitions.map(({ text, action }, index) => (
              <TouchableOpacity
                key={index}
                style={styles.partition}
                onPress={action}
              >
                <Text style={styles.partitionText}>{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <LQDButton
          title={`${tab.charAt(0).toUpperCase()}${tab.slice(1)}`}
          disabled={!parseFloat(amount) || invalidAmount}
          onPress={onSubmit}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
};

export default LiquidityManagement;
