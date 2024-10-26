import { useCallback, useEffect, useRef, useState } from 'react';
import { Address, formatUnits, PublicClient } from 'viem';
import { useLpSugarContract, useOffchainOracleContract } from './useContract';
import { Token, Pool } from './types';
import { CONNECTORS_BASE, LP_SUGAR_ADDRESS, OFFCHAIN_ORACLE_ADDRESS } from '@/constants/addresses';
import { OffchainOracle } from '@/constants/abis/OffchainOracle';

// Constants for optimization
const BATCH_SIZE = 100; // Number of tokens to fetch at once
const PRICE_BATCH_SIZE = 20; // Number of prices to fetch in one multicall
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

// TODO: 1. Persist cache to localStorage
// TODO: 2. Add priority queuing for important tokens
interface CachedPrice {
  price: string;
  timestamp: number;
}

interface PriceCache {
  [tokenAddress: string]: CachedPrice;
}

// Utility function to chunk array into smaller arrays
const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) => array.slice(index * size, (index + 1) * size));
};

export function useToken(publicClient: PublicClient, account?: Address) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const priceCache = useRef<PriceCache>({});

  const lpSugar = useLpSugarContract(LP_SUGAR_ADDRESS, publicClient);
  const oracle = useOffchainOracleContract(OFFCHAIN_ORACLE_ADDRESS, publicClient);

  // Function to check if cached price is still valid
  const isValidCache = (cachedPrice: CachedPrice): boolean => {
    return Date.now() - cachedPrice.timestamp < CACHE_DURATION;
  };

  const fetchTokens = async () => {
    setLoading(true);
    setError(null);

    let allTokens: Token[] = [];
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const batch = await lpSugar.getTokens(BATCH_SIZE, offset, account!, CONNECTORS_BASE);
      if (batch.length === 0) {
        hasMore = false;
        break;
      }

      // Filter tokens that need price update
      const tokensNeedingPrice = batch.filter(
        (token) =>
          !priceCache.current[token.token_address.toLowerCase()] || !isValidCache(priceCache.current[token.token_address.toLowerCase()])
      );

      // Only fetch prices for tokens not in cache or with expired cache
      if (tokensNeedingPrice.length > 0) {
        const tokenAddresses = tokensNeedingPrice.map((token) => token.token_address);
        const prices = await oracle.getRateToUSDBatched(tokenAddresses, true);

        // Update cache with new prices
        tokensNeedingPrice.forEach((token, index) => {
          priceCache.current[token.token_address.toLowerCase()] = {
            price: prices[index].toString(),
            timestamp: Date.now(),
          };
        });
      }
      // Map tokens with prices (either from cache or newly fetched)
      const tokensWithPrice = batch.map((token) => {
        const cachedData = priceCache.current[token.token_address.toLowerCase()];
        return {
          address: token.token_address,
          symbol: token.symbol,
          decimals: Number(token.decimals),
          balance: formatUnits(BigInt(token.account_balance), token.decimals),
          isListed: token.listed,
          usdPrice: cachedData ? formatUnits(BigInt(cachedData.price), 6) : '0',
        };
      });

      allTokens = [...allTokens, ...tokensWithPrice];
      offset += BATCH_SIZE;

      setTokens(allTokens);
      setLoading(false);
    }
  };

  // Clean up expired cache entries periodically
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      Object.keys(priceCache.current).forEach((key) => {
        if (!isValidCache(priceCache.current[key])) {
          delete priceCache.current[key];
        }
      });
    }, CACHE_DURATION);

    return () => clearInterval(cleanup);
  }, []);

  return {
    tokens,
    loading,
    error,
    fetchTokens,
  };
}
