import { formatUnits } from 'viem';
import { Platform } from 'react-native';

const formatAmount = (amount?: number | string, decimals = 4): number => {
  if (!amount) return 0;

  const factor = Math.pow(10, decimals);
  const truncatedValue = Math.floor(Number(amount) * factor) / factor;
  return truncatedValue;
};

const formatNumberWithSuffix = (num: number | string | undefined): string => {
  if (!num) return '0';

  const numValue = typeof num === 'string' ? Number(num) : num;

  if (isNaN(numValue)) return '0';

  const formatWithPrecision = (value: number) => {
    return value % 1 === 0 ? value.toFixed(0) : value.toFixed(2).replace(/\.?0+$/, '');
  };

  if (numValue >= 1e12) {
    return formatWithPrecision(numValue / 1e12) + 't';
  }
  if (numValue >= 1e9) {
    return formatWithPrecision(numValue / 1e9) + 'b';
  }
  if (numValue >= 1e6) {
    return formatWithPrecision(numValue / 1e6) + 'm';
  }
  if (numValue >= 1e3) {
    return formatWithPrecision(numValue / 1e3) + 'k';
  }
  return numValue.toFixed(2).toString();
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

const formatPoolFee = (fee: bigint): string => {
  const feeNumber = Number(fee) / 100;
  return feeNumber % 1 === 0 ? feeNumber.toFixed(0) : feeNumber.toString();
};

const adjustFontSizeForIOS = (baseFontSize: number, addition: number): number =>
  Platform.OS === 'ios' ? baseFontSize + addition : baseFontSize;

const emailIsValid = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

const truncate = (text: string, startChars = 5, endChars = 5) => {
  if (text.length <= startChars + endChars) {
    return text;
  }
  return `${text.substring(0, startChars)}...${text.substring(text.length - endChars)}`;
};
const roundUp = (num: number, decimals: number = 1): number => {
  if (num >= 1) {
    return Math.ceil(num);
  }

  if (num <= 0) return 0;

  // For decimals, find next significant value
  if (num < 0.5) return 0.3;
  return 1;
};
export {
  formatNumberWithSuffix,
  truncateDecimal,
  formatAmountWithWholeAndDecimal,
  removeCommasFromNumber,
  formatWithThousandSeparator,
  formatBigInt,
  formatPercentage,
  formatAddress,
  formatPoolFee,
  adjustFontSizeForIOS,
  formatAmount,
  emailIsValid,
  truncate,
  roundUp,
};
