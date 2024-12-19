import { StyleSheet, View, FlatList } from 'react-native';

import { LQDPoolPairPaper } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { DirectUpIcon } from '@/assets/icons';
import { usePoolActions } from '@/store/pools/actions';
import Section from '../section';

const Trending = () => {
  const { poolsState } = useSystemFunctions();
  const { getPaginatedTrendingPools } = usePoolActions();

  const { trendingPools, refreshingPools } = poolsState;

  return (
    <View style={styles.container}>
      <Section title="Trending" subtitle="by Volume" icon={<DirectUpIcon />} isShowingAll>
        <FlatList
          data={trendingPools.data}
          renderItem={({ item }) => <LQDPoolPairPaper pool={item} />}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.content}
          onEndReached={() => {
            getPaginatedTrendingPools();
          }}
          onEndReachedThreshold={0}
          refreshing={refreshingPools}
          onRefresh={() => getPaginatedTrendingPools(true)}
          bounces={true}
          showsVerticalScrollIndicator={false}
        />
      </Section>
      <View style={{ height: 130 }} />
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    gap: 46,
  },

  content: {
    gap: 24,
    flexGrow: 1,
    paddingBottom: 170,
  },
});
