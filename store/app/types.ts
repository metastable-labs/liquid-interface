type StrategyAction = {
  protocol: ProtocolItem;
  action: 'deposit' | 'stake' | 'borrow' | 'supply';
  assetsIn: `0x${string}`[];
};
