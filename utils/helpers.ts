import { formatUnits } from 'viem';
import { Platform } from 'react-native';

import { FormattedPool, FormattedPosition, RawPool, RawPosition } from '@/hooks/types';
const formatNumberWithSuffix = (num: number): string => {
  const formatWithPrecision = (value: number) => {
    return value % 1 === 0 ? value.toFixed(0) : value.toFixed(2).replace(/\.?0+$/, '');
  };

  if (num >= 1e9) {
    return formatWithPrecision(num / 1e9) + 'b';
  }
  if (num >= 1e6) {
    return formatWithPrecision(num / 1e6) + 'm';
  }
  if (num >= 1e3) {
    return formatWithPrecision(num / 1e3) + 'k';
  }
  return num?.toString();
};

const truncateDecimal = (amount?: number | string, decimals = 4): number => {
  if (!amount) return 0;

  const factor = Math.pow(10, decimals);
  const truncatedValue = Math.floor(Number(amount) * factor) / factor;
  return truncatedValue;
};

const formatAmountWithWholeAndDecimal = (amount?: number | string, decimals = 4) => {
  if (!amount) return { whole: '0', decimal: '00' };

  const [whole, decimal] = truncateDecimal(amount, decimals).toString().split('.');

  const formattedWhole = Number(whole).toLocaleString();
  return { whole: formattedWhole, decimal: decimal || '00' };
};

function removeCommasFromNumber(text: string): string {
  return text.replace(/,/g, '');
}

const formatWithThousandSeparator = (value: string) => {
  if (!value) return '';
  const numberValue = parseFloat(value.replace(/,/g, ''));
  if (isNaN(numberValue)) return value;
  return numberValue.toLocaleString(undefined, { maximumFractionDigits: 5 });
};

function formatBigInt(value: bigint, decimals: number): string {
  return formatUnits(value, decimals);
}

function formatPercentage(value: bigint): string {
  return (Number(value) / 10000).toFixed(2) + '%';
}

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatPool(pool: RawPool, isStable: boolean): FormattedPool {
  return {
    ...pool,
    lp: formatAddress(pool.lp),
    liquidity: formatBigInt(pool.liquidity, pool.decimals),
    type: pool.type === -1 ? 'CL' : 'V2',
    stable: isStable,
    token0: formatAddress(pool.token0),
    reserve0: formatBigInt(pool.reserve0, pool.decimals),
    staked0: formatBigInt(pool.staked0, pool.decimals),
    token1: formatAddress(pool.token1),
    reserve1: formatBigInt(pool.reserve1, pool.decimals),
    staked1: formatBigInt(pool.staked1, pool.decimals),
    gauge: formatAddress(pool.gauge),
    gauge_liquidity: formatBigInt(pool.gauge_liquidity, pool.decimals),
    fee: formatAddress(pool.fee),
    bribe: formatAddress(pool.bribe),
    factory: formatAddress(pool.factory),
    emissions: formatBigInt(pool.emissions, 18), // Assuming emissions are in 18 decimals
    emissions_token: formatAddress(pool.emissions_token),
    pool_fee: formatPercentage(pool.pool_fee),
    token0_fees: formatBigInt(pool.token0_fees, pool.decimals),
    token1_fees: formatBigInt(pool.token1_fees, pool.decimals),
  };
}

function formatPosition(position: RawPosition, decimals: number): FormattedPosition {
  return {
    id: position.id.toString(),
    lp: formatAddress(position.lp),
    liquidity: formatBigInt(position.liquidity, decimals),
    staked: formatBigInt(position.staked, decimals),
    amount0: formatBigInt(position.amount0, decimals),
    amount1: formatBigInt(position.amount1, decimals),
    staked0: formatBigInt(position.staked0, decimals),
    staked1: formatBigInt(position.staked1, decimals),
    unstaked_earned0: formatBigInt(position.unstaked_earned0, decimals),
    unstaked_earned1: formatBigInt(position.unstaked_earned1, decimals),
    emissions_earned: formatBigInt(position.emissions_earned, 18), // Assuming emissions are in 18 decimals
  };
}

const formatPoolFee = (fee: bigint): string => {
  const feeNumber = Number(fee);
  return (feeNumber / 100).toFixed(2);
};

const adjustFontSizeForIOS = (baseFontSize: number, addition: number): number =>
  Platform.OS === 'ios' ? baseFontSize + addition : baseFontSize;

export {
  formatNumberWithSuffix,
  truncateDecimal,
  formatAmountWithWholeAndDecimal,
  removeCommasFromNumber,
  formatWithThousandSeparator,
  formatBigInt,
  formatPercentage,
  formatAddress,
  formatPool,
  formatPosition,
  formatPoolFee,
  adjustFontSizeForIOS,
};
