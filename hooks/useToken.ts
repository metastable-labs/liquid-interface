import { useCallback, useEffect, useState } from 'react';
import { Address, formatUnits, PublicClient } from 'viem';
import { CONNECTORS_BASE, LP_SUGAR_ADDRESS, OFFCHAIN_ORACLE_ADDRESS } from '@/constants/addresses';
import { useLpSugarContract, useOffchainOracleContract } from './useContract';
import { LPSugarToken, LPSugarTokenResponse, Token } from './types';
import useSystemFunctions from './useSystemFunctions';
import { OffchainOracleABI } from '@/constants/abis';

export function useToken(publicClient: PublicClient) {
  const { smartAccountState } = useSystemFunctions();
  const account = smartAccountState?.address || '0xF831A8c0788a44483Df72f0D129F03Cb0e01bBe2';

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
      const tokenEthContracts = tokenAddresses.map((tokenAddress) => ({
        address: OFFCHAIN_ORACLE_ADDRESS,
        abi: OffchainOracleABI.OffchainOracle.abi,
        functionName: 'getRateToEth',
        args: [tokenAddress, true] as const,
      }));
      const ethPrices: any = await publicClient.multicall({
        contracts: tokenEthContracts,
      });

      const tokensWithPrice = batch.map((token: LPSugarToken, index: number) => {
        // let ethPrice: any = 0;

        // if (ethPrices[index]) {
        //   ethPrice = ethPrices[index].result as bigint;
        //   const formatEthPrice = formatUnits(ethPrice, 18);
        //   console.log(token.symbol, ' => ', formatEthPrice);
        // }

        return {
          address: token.token_address,
          symbol: token.symbol,
          decimals: Number(token.decimals),
          balance: formatUnits(token.account_balance, token.decimals),
          isListed: token.listed,
          usdPrice: prices[index],
          logoUrl: `https://assets.smold.app/api/token/8453/${token.token_address}/logo-32.png`,
        };
      });

      allTokens = [...allTokens, ...tokensWithPrice];
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
