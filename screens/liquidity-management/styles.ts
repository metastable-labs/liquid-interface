import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 70,
    paddingBottom: 34,
    backgroundColor: '#FFF',
  },

  contentStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },

  topContainer: {
    gap: 24,
  },

  tabs: {
    paddingVertical: 16,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 28,
  },

  tab: {
    padding: 12,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },

  activeTab: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EAEEF4',
    shadowColor: 'rgba(2, 6, 23, 1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 1.5,
  },

  inactiveTab: {
    backgroundColor: '#F8FAFC',
  },

  tabText: {
    fontSize: 14,
    lineHeight: 18.48,
    textTransform: 'capitalize',
    fontFamily: 'AeonikRegular',
  },

  activeTabText: {
    color: '#020617',
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  inactiveTabText: {
    color: '#94A3B8',
  },

  details: {
    gap: 8,
  },

  detailTitle: {
    color: '#0F172A',
    fontSize: 24,
    lineHeight: 26.88,
    letterSpacing: -0.6,
    fontWeight: '500',
    textTransform: 'capitalize',
    fontFamily: 'AeonikMedium',
  },

  detailSubtitle: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 18.48,
    fontFamily: 'AeonikRegular',
  },

  main: {
    alignSelf: 'stretch',
    gap: 16,
  },

  inputAndBalance: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEEF4',
  },

  invalidContainer: {
    borderColor: '#F8C9D2',
  },

  input: {
    color: '#1E293B',
    fontSize: 24,
    lineHeight: 26.88,
    letterSpacing: -0.6,
    fontWeight: '500',
    maxWidth: '35%',
    fontFamily: 'AeonikMedium',
  },

  invalidText: {
    color: '#AF1D38',
  },

  balanceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
  },

  pairContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8 + 3,
    borderRadius: 9999,
    backgroundColor: '#F8FAFC',
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    marginRight: -3,
  },

  pairText: {
    color: '#1E293B',
    fontSize: 14,
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  balanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 5,
  },

  balanceTitle: {
    color: '#64748B',
    fontSize: 12,
    lineHeight: 15.84,
    textAlign: 'right',
    fontFamily: 'AeonikRegular',
  },

  balanceValue: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 16.12,
    textAlign: 'right',
    fontFamily: 'AeonikRegular',
  },

  partitions: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 11,
  },

  partition: {
    paddingVertical: 6,
    paddingHorizontal: 24,
    maxHeight: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  partitionText: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 16.12,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  bottomContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'stretch',
  },

  action: {
    width: '100%',
    paddingVertical: 18.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4691FE',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#EBEBEB',
  },

  actionText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '600',
    fontFamily: 'ClashDisplaySemibold',
    textTransform: 'capitalize',
  },
});

export default styles;
