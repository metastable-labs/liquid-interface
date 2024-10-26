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
  };
  // const fetchTokens = useCallback(async () => {
  //   if (!account) return;

  //   try {
  //     setLoading(true);
  //     setError(null);

  //     let allTokens: Token[] = [];
  //     let offset = 0;
  //     let hasMore = true;

  //     while (hasMore) {
  //       const batch = await lpSugar.getTokens(BATCH_SIZE, offset, account, CONNECTORS_BASE);
  //       if (batch.length === 0) {
  //         hasMore = false;
  //         break;
  //       }

  //       // Create multicall contract calls for price fetching
  //       const priceCallRequests = batch.map((token) => ({
  //         ...oracle,
  //         functionName: 'getRateToUSD',
  //         args: [token.token_address, true],
  //       }));

  //       // Execute multicall
  //       const priceResults = await publicClient.multicall({
  //         contracts: priceCallRequests.map((request) => ({
  //           address: OFFCHAIN_ORACLE_ADDRESS,
  //           abi: OffchainOracle.abi,
  //           functionName: request.functionName,
  //           args: request.args,
  //         })),
  //       });

  //       // Map the results to tokens
  //       const tokensWithPrice = batch.map((token, index) => {
  //         const priceResult = priceResults[index];
  //         return {
  //           address: token.token_address,
  //           symbol: token.symbol,
  //           decimals: Number(token.decimals),
  //           balance: formatUnits(token.account_balance, token.decimals),
  //           isListed: token.listed,
  //           usdPrice: priceResult.status === 'success' ? formatUnits(priceResult.result as unknown as bigint, 6) : '0',
  //         };
  //       });

  //       allTokens = [...allTokens, ...tokensWithPrice];
  //       offset += BATCH_SIZE;
  //     }

  //     setTokens(allTokens);
  //   } catch (err) {
  //     console.error('Error fetching tokens:', err);
  //     setError(err instanceof Error ? err : new Error('Failed to fetch tokens'));
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [lpSugar, oracle, account, publicClient]);

  return {
    tokens,
    loading,
    error,
  };
}
