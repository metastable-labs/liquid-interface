import { useState, useCallback, useEffect, useMemo } from 'react';
import { PublicClient, Address, formatUnits } from 'viem';
import { Token } from './types';
import { useLpSugarContract, useOffchainOracleContract } from './useContract';
import { LP_SUGAR_ADDRESS, CONNECTORS_BASE, OFFCHAIN_ORACLE_ADDRESS, USDC_ADDRESS } from '@/constants/addresses';

export function useToken(publicClient: PublicClient, account: Address, refreshInterval: number = 60000) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number>(0);
  const [chainId, setChainId] = useState<string | null>(null);

  // Memoize contract instances
  const lpSugar = useMemo(() => useLpSugarContract(LP_SUGAR_ADDRESS, publicClient), [publicClient]);

  const offchainOracle = useMemo(() => useOffchainOracleContract(OFFCHAIN_ORACLE_ADDRESS, publicClient), [publicClient]);

  const formatBalance = useCallback((balance: bigint, decimals: number): string => {
    return formatUnits(balance, decimals);
  }, []);

  const fetchUsdPrice = useCallback(
    async (tokenAddress: Address): Promise<string> => {
      try {
        const rate = await offchainOracle.getRate(tokenAddress, USDC_ADDRESS, true);
        if (typeof rate === 'bigint') {
          return formatUnits(rate, 6);
        } else {
          console.error(`Unexpected rate type for token ${tokenAddress}:`, typeof rate);
          return '0';
        }
      } catch (error) {
        console.error(`Error fetching USD price for token ${tokenAddress}:`, error);
        return '0';
      }
    },
    [offchainOracle]
  );

  const getLogoUrl = useCallback(
    (tokenAddress: Address): string => {
      if (!chainId) {
        console.warn('ChainId not available, unable to construct logo URL');
        return '';
      }
      return `https://assets.smold.app/api/token/${chainId}/${tokenAddress}/logo-32.png`;
    },
    [chainId]
  );

  const fetchChainId = useCallback(async () => {
    try {
      const id = await publicClient.getChainId();
      setChainId(id.toString());
    } catch (error) {
      console.error('Error fetching chainId:', error);
      setError('Failed to fetch chainId');
    }
  }, [publicClient]);

  const fetchTokens = useCallback(
    async (forceRefresh: boolean = false) => {
      const now = Date.now();
      if (!forceRefresh && tokens.length > 0 && now - lastUpdated < refreshInterval) {
        return;
      }

      if (!chainId) {
        await fetchChainId();
      }

      setLoading(true);
      setError(null);

      try {
        const fetchedTokens = await lpSugar.getTokens(1000, 0, account, CONNECTORS_BASE);

        const tokensWithPricesAndLogos = await Promise.all(
          (
            fetchedTokens as { token_address: `0x${string}`; symbol: string; decimals: number; account_balance: bigint; listed: boolean }[]
          ).map(async (token) => {
            const usd_price = await fetchUsdPrice(token.token_address);
            const logo_url = getLogoUrl(token.token_address);
            return {
              ...token,
              account_balance: formatBalance(token.account_balance, token.decimals),
              usd_price,
              logo_url,
            };
          })
        );

        setTokens(
          tokensWithPricesAndLogos.map((token) => ({
            ...token,
          }))
        );
        setLastUpdated(now);
      } catch (err) {
        console.error('Error fetching tokens:', err);
        setError('Failed to fetch tokens');
      } finally {
        setLoading(false);
      }
    },
    [lpSugar, account, chainId, refreshInterval, lastUpdated, tokens.length, formatBalance, fetchUsdPrice, getLogoUrl, fetchChainId]
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
      return tokens.find((token) => token.token_address.toLowerCase() === address.toLowerCase());
    },
    [tokens]
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
