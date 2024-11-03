import { StyleSheet, View, FlatList } from 'react-native';

import { DollarSquareIcon } from '@/assets/icons';
import { LQDPoolPairPaper } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { usePoolActions } from '@/store/pools/actions';
import Section from '../section';

const Hot = () => {
  const { poolsState } = useSystemFunctions();
  const { getPaginatedHotPools } = usePoolActions();

  const { hotPools, refreshingPools } = poolsState;

  return (
    <View style={styles.container}>
      <Section title="Hot" subtitle="by TVL" icon={<DollarSquareIcon />} isShowingAll>
        <FlatList
          data={hotPools.data}
          renderItem={({ item }) => <LQDPoolPairPaper pool={item} />}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ gap: 24 }}
          onEndReached={() => getPaginatedHotPools()}
          onEndReachedThreshold={0.1}
          refreshing={refreshingPools}
          onRefresh={() => getPaginatedHotPools(true)}
          bounces={true}
          showsVerticalScrollIndicator={false}
        />
      </Section>
    </View>
  );
};

export default Hot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 170,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    gap: 46,
  },
});
