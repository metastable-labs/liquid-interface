import { useCallback, useEffect, useRef, useState } from 'react';
import { Address, formatUnits, PublicClient } from 'viem';
import { useLpSugarContract, useOffchainOracleContract } from './useContract';
import { Token, Pool } from './types';
import { CONNECTORS_BASE, LP_SUGAR_ADDRESS, OFFCHAIN_ORACLE_ADDRESS } from '@/constants/addresses';
import { OffchainOracle } from '@/constants/abis/OffchainOracle';

// Constants for optimization
const BATCH_SIZE = 50; // Number of tokens to fetch at once

/* 
TODO: 1. Add price caching and Persist cache to localStorage 
TODO: 2. Add priority queuing for important tokens      
TODO: 3. Should get the max length of tokens and stop calls after it hits it
*/

export function useToken(publicClient: PublicClient, account?: Address) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [tokenMap, setTokenMap] = useState<Map<string, Token>>(new Map());

  const lpSugar = useLpSugarContract(LP_SUGAR_ADDRESS, publicClient);
  const oracle = useOffchainOracleContract(OFFCHAIN_ORACLE_ADDRESS, publicClient);

  // Update token map when tokens change
  useEffect(() => {
    const newTokenMap = new Map(tokens.map((token) => [token.address.toLowerCase(), token]));
    setTokenMap(newTokenMap);
  }, [tokens]);

  const fetchTokens = async (BATCH_SIZE: number, offset: number) => {
    setLoading(true);
    setError(null);

    let allTokens: Token[] = [];
    const batch = await lpSugar.getTokens(BATCH_SIZE, offset, account!, CONNECTORS_BASE);

    if (batch.length > 0) {
      const tokenAddresses = batch.map((token) => token.token_address);
      const tokenDecimals = batch.map((token) => token.decimals);
      const prices = await oracle.getRateToUSD(tokenAddresses, tokenDecimals, true);

      // Map tokens with prices
      const tokensWithPrice = batch.map((token, index) => ({
        address: token.token_address,
        symbol: token.symbol,
        decimals: Number(token.decimals),
        balance: formatUnits(token.account_balance, token.decimals),
        isListed: token.listed,
        usdPrice: prices[index],
        logoUrl: `https://assets.smold.app/api/token/8453/${token.token_address}/logo-32.png`,
      }));

      allTokens = [...allTokens, ...tokensWithPrice];
      offset += BATCH_SIZE;
    }

    setTokens(allTokens);
    setLoading(false);
  };
  // Get token by address - case insensitive
  const getTokenByAddress = useCallback(
    (address: Address | string) => {
      return tokenMap.get(address.toLowerCase());
    },
    [tokenMap]
  );

  // Get multiple tokens by addresses
  const getTokensByAddresses = useCallback(
    (addresses: (Address | string)[]) => {
      return addresses.map((address) => tokenMap.get(address.toLowerCase())).filter(Boolean) as Token[];
    },
    [tokenMap]
  );

  // Get token price by address
  const getTokenPrice = useCallback(
    (address: Address | string) => {
      const token = tokenMap.get(address.toLowerCase());
      return token?.usdPrice || 0;
    },
    [tokenMap]
  );

  return {
    tokens,
    loading,
    error,
    fetchTokens,
    getTokenPrice,
    getTokensByAddresses,
    getTokenByAddress,
  };
}
