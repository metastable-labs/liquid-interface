import { Address } from 'viem';

export const LP_SUGAR_ADDRESS: Address = '0x68c19e13618C41158fE4bAba1B8fb3A9c74bDb0A' as Address;
export const AERODROME_FACTORY_ADDRESS: Address = '0x420DD381b31aEf6683db6B902084cB0FFECe40Da' as Address;
export const USDC_ADDRESS: Address = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as Address;
export const WETH_ADDRESS: Address = '0x4200000000000000000000000000000000000006' as Address;

// smart account constants
export const ACCOUNT_FACTORY_ADDRESS: Address = '0x0BA5ED0c6AA8c49038F819E587E2633c4A9F428a' as Address;
export const ENTRYPOINT_V06_ADDRESS: Address = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789' as Address;

export const TEST_USER: Address = '0x78815067c3926cc33F7790d87460BEC779F42d4D' as Address;

// Liquid connectors
export const AERODROME_CONNECTOR: Address = '0x10e1aC384A4Fb3e0Bc4724D097B0d7F4e99143E6' as Address;
export const CONNECTOR_PLUGIN: Address = '0x96281563A06a8D3319C9822B58d8808FaC7EA14D' as Address;
export const STRATEGY_CONTRACT_ADDRESS = '0x4368d53677c09995989a22DE5b31EfceAeD735ae' as Address;

export const CONNECTORS_BASE: Address[] = [
  USDC_ADDRESS, // USDC
  '0x940181a94A35A4569E4529A3CDfB74e38FD98631', // AERO
  '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', // DAI
  '0x4621b7A9c75199271F773Ebd9A499dbd165c3191', // DOLA
  '0x4200000000000000000000000000000000000006', // WETH
  '0xB79DD08EA68A908A97220C76d19A6aA9cBDE4376', // USD+
  '0xf7A0dd3317535eC4f4d29ADF9d620B3d8D5D5069', // stERN
  '0xCfA3Ef56d303AE4fAabA0592388F19d7C3399FB4', // eUSD
  '0xCb327b99fF831bF8223cCEd12B1338FF3aA322Ff', // bsdETH
  '0x2ae3f1ec7f1f5012cfeab0185bfc7aa3cf0dec22', // cbETH
  '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452', // wstETH
  '0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42', // EURC
  '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', // USDbC
];

export const protocolList: ProtocolItem[] = [
  {
    id: '1',
    icon: 'moonwell',
    title: 'Moonwell',
    address: '0x123456789abcdef123456789abcdef1234567890',
  },
  {
    id: '2',
    icon: 'aerodrome',
    title: 'Aerodrome',
    address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
  },
  {
    id: '3',
    icon: 'morpho',
    title: 'Morpho',
    address: '0x789abcdef123456789abcdef123456789abcdef12',
  },
  // this is dummy
  {
    id: '4',
    icon: 'moonwell',
    title: 'Moonwell',
    address: '0x3234567890123456789012345678901234567890',
  },
];

export const OFFCHAIN_ORACLE_ADDRESS: Address = '0xf224a25453D76A41c4427DD1C05369BC9f498444' as Address;
