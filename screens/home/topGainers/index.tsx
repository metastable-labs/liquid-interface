import { StyleSheet, View, FlatList } from 'react-native';

import { TrendUpIcon } from '@/assets/icons';
import { LQDPoolPairPaper } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { usePoolActions } from '@/store/pools/actions';
import Section from '../section';

const TopGainers = () => {
  const { poolsState } = useSystemFunctions();
  const { getPaginatedTopGainers } = usePoolActions();

  const { topGainers, refreshingPools } = poolsState;

  return (
    <View style={styles.container}>
      <Section title="Top gainers" subtitle="by APR" icon={<TrendUpIcon />} isShowingAll>
        <FlatList
          data={topGainers.data}
          renderItem={({ item }) => <LQDPoolPairPaper pool={item} />}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ gap: 24 }}
          onEndReached={() => getPaginatedTopGainers()}
          onEndReachedThreshold={0.1}
          refreshing={refreshingPools}
          onRefresh={() => getPaginatedTopGainers(true)}
          bounces={true}
          showsVerticalScrollIndicator={false}
        />
      </Section>
      <View style={{ height: 130 }} />
    </View>
  );
};

export default TopGainers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    gap: 46,
  },
});
