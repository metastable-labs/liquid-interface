import { useCallback, useEffect, useState } from 'react';
import { Address, formatUnits, PublicClient } from 'viem';
import { CONNECTORS_BASE, LP_SUGAR_ADDRESS, OFFCHAIN_ORACLE_ADDRESS, WETH_ADDRESS } from '@/constants/addresses';
import { useLpSugarContract, useOffchainOracleContract } from './useContract';
import { LPSugarToken, LPSugarTokenResponse, Token } from './types';
import useSystemFunctions from './useSystemFunctions';
import { OffchainOracleABI } from '@/constants/abis';

export function useToken(publicClient: PublicClient) {
  const { smartAccountState } = useSystemFunctions();
  const account = smartAccountState?.address;

  const [tokens, setTokens] = useState<Token[]>([]);
  const [tokenMap, setTokenMap] = useState<Map<string, Token>>(new Map());

  const lpSugar = useLpSugarContract(LP_SUGAR_ADDRESS, publicClient);
  const oracle = useOffchainOracleContract(OFFCHAIN_ORACLE_ADDRESS, publicClient);

  const fetchTokens = async (BATCH_SIZE: number, offset: number): Promise<Token[]> => {
    if (!account) {
      return [];
    }

    let allTokens: Token[] = [];
    const batch: LPSugarTokenResponse = await lpSugar.getTokens(BATCH_SIZE, offset, account!, CONNECTORS_BASE);

    if (batch.length > 0) {
      const tokenAddresses = batch.map((token: LPSugarToken) => token.token_address);
      const tokenDecimals = batch.map((token: LPSugarToken) => token.decimals);
      const prices = await oracle.getRateToUSD(tokenAddresses, tokenDecimals, true);

      const ethBalance = await publicClient.getBalance({ address: account });
      const wethPrice = await oracle.getRateToUSD([WETH_ADDRESS], [18], true);

      const tokensWithPrice = batch.map((token: LPSugarToken, index: number) => {
        return {
          address: token.token_address,
          symbol: token.symbol,
          decimals: Number(token.decimals),
          balance: formatUnits(token.account_balance, token.decimals),
          isListed: token.listed,
          usdPrice: prices[index],
          logoUrl: `https://assets.smold.app/api/token/8453/${token.token_address}/logo-128.png`,
        };
      });

      // Add ETH to the tokens list
      const ethToken: Token = {
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // Common convention for native ETH
        symbol: 'ETH',
        decimals: 18,
        balance: formatUnits(ethBalance, 18),
        isListed: true,
        usdPrice: wethPrice[0],
        logoUrl: `https://assets.smold.app/api/token/8453/${WETH_ADDRESS}/logo-128.png`, // Using WETH logo for ETH
      };

      allTokens = [ethToken, ...allTokens, ...tokensWithPrice];
      offset += BATCH_SIZE;
    }

    setTokens(allTokens);
    return allTokens;
  };

  const getTokenByAddress = useCallback(
    (address: Address | string) => {
      return tokenMap.get(address.toLowerCase());
    },
    [tokenMap]
  );

  const getTokensByAddresses = useCallback(
    (addresses: (Address | string)[]) => {
      return addresses.map((address) => tokenMap.get(address.toLowerCase())).filter(Boolean) as Token[];
    },
    [tokenMap]
  );

  const getTokenPrice = useCallback(
    (address: Address | string) => {
      const token = tokenMap.get(address.toLowerCase());
      return token?.usdPrice || 0;
    },
    [tokenMap]
  );

  useEffect(
    function loadTokenMap() {
      const newTokenMap = new Map(tokens.map((token) => [token.address.toLowerCase(), token]));
      setTokenMap(newTokenMap);
    },
    [tokens]
  );

  return {
    tokens,
    fetchTokens,
    getTokenPrice,
    getTokensByAddresses,
    getTokenByAddress,
  };
}
