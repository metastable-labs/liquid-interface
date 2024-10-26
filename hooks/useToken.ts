import { useState, useCallback, useEffect, useMemo } from 'react';
import { PublicClient, Address, formatUnits, getAddress } from 'viem';
import { Token } from './types';
import { useLpSugarContract, useOffchainOracleContract } from './useContract';
import { LP_SUGAR_ADDRESS, CONNECTORS_BASE, OFFCHAIN_ORACLE_ADDRESS, USDC_ADDRESS } from '@/constants/addresses';

export function useToken(publicClient: PublicClient, account: Address, refreshInterval: number = 60000) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [tokenMap, setTokenMap] = useState<Map<string, Token>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number>(0);

  // Memoize contract instances
  const lpSugar = useMemo(() => useLpSugarContract(LP_SUGAR_ADDRESS, publicClient), [publicClient]);

  const offchainOracle = useMemo(() => useOffchainOracleContract(OFFCHAIN_ORACLE_ADDRESS, publicClient), [publicClient]);

  const formatBalance = useCallback((balance: bigint, decimals: number): string => {
    return formatUnits(balance, decimals);
  }, []);

  const fetchUsdPrice = useCallback(
    async (tokenAddress: Address): Promise<string> => {
      try {
        return await offchainOracle.getUsdPrice(tokenAddress);
      } catch (error) {
        console.error(`Error fetching USD price for token ${tokenAddress}:`, error);
        return '0';
      }
    },
    [offchainOracle]
  );

  const getLogoUrl = useCallback((tokenAddress: Address): string => {
    return `https://assets.smold.app/api/token/8543/${tokenAddress}/logo-32.png`;
  }, []);

  // Update token map whenever tokens array changes
  useEffect(() => {
    const newMap = new Map<string, Token>();
    tokens.forEach((token) => {
      try {
        const checksummedAddress = getAddress(token.token_address);
        newMap.set(checksummedAddress.toLowerCase(), token);
      } catch (err) {
        console.error(`Invalid token address: ${token.token_address}`);
      }
    });
    setTokenMap(newMap);
  }, [tokens]);

  const fetchTokens = useCallback(
    async (forceRefresh: boolean = false) => {
      const now = Date.now();
      if (!forceRefresh && tokens.length > 0 && now - lastUpdated < refreshInterval) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const fetchedTokens = await lpSugar.getTokens(100, 0, account, CONNECTORS_BASE);
        console.log(fetchedTokens, 'tokens');

        const tokensWithPricesAndLogos = await Promise.all(
          (
            fetchedTokens as { token_address: `0x${string}`; symbol: string; decimals: number; account_balance: bigint; listed: boolean }[]
          ).map(async (token) => {
            const checksummedAddress = getAddress(token.token_address);
            const usd_price = await fetchUsdPrice(token.token_address);
            const logo_url = getLogoUrl(token.token_address);
            return {
              ...token,
              token_address: checksummedAddress,
              account_balance: formatBalance(token.account_balance, token.decimals),
              usd_price,
              logo_url,
            };
          })
        );

        const validTokens = tokensWithPricesAndLogos.filter(Boolean) as Token[];
        console.log('Processed tokens:', validTokens);

        setTokens(validTokens);
        setLastUpdated(now);
      } catch (err) {
        console.error('Error fetching tokens:', err);
        setError('Failed to fetch tokens');
      } finally {
        setLoading(false);
      }
    },
    [lpSugar, account, refreshInterval, lastUpdated, tokens.length, formatBalance, fetchUsdPrice, getLogoUrl]
  );

  // Initial fetch
  useEffect(() => {
    if (publicClient && account) {
      fetchTokens();
    }
  }, [publicClient, account, fetchTokens]);

  // Set up refresh interval
  useEffect(() => {
    if (!publicClient || !account) return;

    const intervalId = setInterval(() => {
      fetchTokens();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [publicClient, account, fetchTokens, refreshInterval]);

  const refreshTokens = useCallback(() => {
    fetchTokens(true);
  }, [fetchTokens]);

  const getTokenByAddress = useCallback(
    (address: Address): Token | undefined => {
      try {
        // Normalize the input address
        const normalizedAddress = getAddress(address).toLowerCase();
        const token = tokenMap.get(normalizedAddress);

        if (!token) {
          console.debug(`Token not found in map for address ${address}. Available tokens:`, Array.from(tokenMap.keys()));
        }

        return token;
      } catch (err) {
        console.error(`Error looking up token ${address}:`, err);
        return undefined;
      }
    },
    [tokenMap]
  );

  return useMemo(
    () => ({
      tokens,
      loading,
      error,
      refreshTokens,
      lastUpdated,
      getTokenByAddress,
      getUsdPrice: fetchUsdPrice,
    }),
    [tokens, loading, error, refreshTokens, lastUpdated, getTokenByAddress, fetchUsdPrice]
  );
}
