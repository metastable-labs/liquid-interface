import { LPSugarABI, OffchainOracleABI } from '@/constants/abis';
import { LP_SUGAR_ADDRESS, CONNECTORS_BASE, OFFCHAIN_ORACLE_ADDRESS, USDC_ADDRESS } from '@/constants/addresses';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { PublicClient, Address, formatUnits } from 'viem';
import { Token } from './types';
import { useContract } from './useContract';

export function useToken(publicClient: PublicClient, account: Address, oracle: Address, refreshInterval: number = 60000) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number>(0);

  const lpSugarContract = useContract(LP_SUGAR_ADDRESS, LPSugarABI, publicClient);
  const offchainOracleContract = useContract(OFFCHAIN_ORACLE_ADDRESS, OffchainOracleABI, publicClient);

  const formatBalance = useCallback((balance: bigint, decimals: number): string => {
    return formatUnits(balance, decimals);
  }, []);

  const getUsdPrice = useCallback(
    async (tokenAddress: Address): Promise<string> => {
      try {
        const rate: any = await offchainOracleContract.read.getRate([
          tokenAddress,
          USDC_ADDRESS,
          true, // useWrappers
        ]);

        return formatUnits(rate, 6);
      } catch (error) {
        console.error(`Error fetching USD price for token ${tokenAddress}:`, error);
        return '0';
      }
    },
    [offchainOracleContract]
  );

  const fetchTokens = useCallback(
    async (forceRefresh: boolean = false) => {
      const now = Date.now();
      if (!forceRefresh && tokens.length > 0 && now - lastUpdated < refreshInterval) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const fetchedTokens = (await lpSugarContract.read.tokens([BigInt(1000), BigInt(0), account, oracle, CONNECTORS_BASE])) as Omit<
          Token,
          'usd_price'
        >[];

        const tokensWithPrices = await Promise.all(
          fetchedTokens.map(async (token) => {
            const usd_price = await getUsdPrice(token.token_address);
            return {
              ...token,
              account_balance: formatBalance(token.account_balance as unknown as bigint, token.decimals),
              usd_price,
            };
          })
        );

        setTokens(tokensWithPrices);
        setLastUpdated(now);
      } catch (err) {
        console.error('Error fetching tokens:', err);
        setError('Failed to fetch tokens');
      } finally {
        setLoading(false);
      }
    },
    [lpSugarContract, account, oracle, refreshInterval, lastUpdated, tokens.length, formatBalance, getUsdPrice]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTokens();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [fetchTokens, refreshInterval]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  const refreshTokens = useCallback(() => {
    fetchTokens(true);
  }, [fetchTokens]);

  const getTokenByAddress = useCallback(
    (address: Address): Token | undefined => {
      return tokens.find((token) => token.token_address.toLowerCase() === address.toLowerCase());
    },
    [tokens]
  );

  const memoizedReturnValue = useMemo(
    () => ({
      tokens,
      loading,
      error,
      refreshTokens,
      lastUpdated,
      getTokenByAddress,
    }),
    [tokens, loading, error, refreshTokens, lastUpdated, getTokenByAddress]
  );

  return memoizedReturnValue;
}
