import { decodeAbiParameters, formatUnits, Hex, hexToBigInt } from 'viem';
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

const formatInputAmount = (value: string): string => {
  let newValue = '';
  const valueWithoutComma = value.replace(/,/g, '');

  if (valueWithoutComma.length === 0) {
    newValue = '';
  } else {
    // Check if the input is a valid number (including decimals)
    const isMatch = valueWithoutComma.match(/^(\d+\.?\d*|\.\d+)$/);

    if (!isMatch) return;

    if (isNaN(Number(valueWithoutComma))) return;

    // Format the number with local thousand separators
    // Temporarily remove the decimal part to format the integer part
    const parts = valueWithoutComma.split('.');
    const integerFormatted = parseInt(parts[0]).toLocaleString();

    // Reconstruct the number including the decimal part if it exists
    newValue = parts.length > 1 ? `${integerFormatted}.${parts[1]}` : integerFormatted;
  }

  return newValue;
};

export const formatSymbol = (symbol: string, showFullSymbol?: boolean) => {
  if (!showFullSymbol) {
    return symbol.split('-')[1].replace('/', ' / ');
  }

  if (symbol.toLowerCase().includes('volatile')) {
    return `vAMM - ${symbol.split('-')[1].replace('/', ' / ')}`;
  }

  if (symbol.toLowerCase().includes('stable')) {
    return `sAMM - ${symbol.split('-')[1].replace('/', ' / ')}`;
  }

  return symbol;
};

const createArrayWithIndexes = (length: number): number[] => {
  return Array.from({ length }, (_, index) => index);
};

function splitSignature(signature: string): { r: bigint; s: bigint } {
  console.log(signature, 'from splitting');
  let [r, s] = decodeAbiParameters([{ type: 'uint256' }, { type: 'uint256' }], signature as Hex);
  const n = hexToBigInt('0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551');
  if (s > n / 2n) {
    s = n - s;
  }
  return { r, s };
}

export const findQuoteIndices = (input: string): { beforeType: bigint; beforeChallenge: bigint } => {
  const beforeTypeIndex = BigInt(input.lastIndexOf('"type":"webauthn.get"'));
  const beforeChallengeIndex = BigInt(input.indexOf('"challenge'));
  return {
    beforeType: beforeTypeIndex,
    beforeChallenge: beforeChallengeIndex,
  };
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
  formatInputAmount,
  formatSymbol,
  createArrayWithIndexes,
  splitSignature,
};
