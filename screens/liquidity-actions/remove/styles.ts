import { StyleSheet } from 'react-native';

import { adjustFontSizeForIOS } from '@/utils/helpers';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingTop: 70,
    paddingBottom: 34,
    backgroundColor: '#FFF',
  },

  contentStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },

  container: {
    gap: 24,
  },

  header: {
    alignSelf: 'stretch',
    gap: 8,
  },

  title: {
    color: '#0F172A',
    fontSize: adjustFontSizeForIOS(24, 3),
    lineHeight: 26.88,
    letterSpacing: -0.6,
    fontWeight: '500',
    textTransform: 'capitalize',
    fontFamily: 'AeonikMedium',
  },

  subtitle: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontFamily: 'AeonikRegular',
  },

  pairContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10 + 6,
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 29.5,
    height: 29.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 1.23,
    borderColor: '#EAEEF4',
    marginRight: -6,
  },

  pairText: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  percentageSetterContainer: {
    alignSelf: 'stretch',
    padding: 11,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEEF4',
  },

  depositions: {
    alignSelf: 'stretch',
    gap: 16,
  },

  spacedContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  depositionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  secondaryIcon: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    borderWidth: 0.75,
    borderColor: '#EAEEF4',
  },

  coinTitle: {
    color: '#1A2001',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  depositionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  depositionBase: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(12, 2),
    lineHeight: 15.84,
    fontFamily: 'AeonikRegular',
    textAlign: 'right',
  },

  depositionValue: {
    color: '#334155',
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
    fontFamily: 'AeonikRegular',
    textAlign: 'right',
  },

  receiveContainer: {
    alignSelf: 'stretch',
    gap: 16,
  },

  receiveTitle: {
    color: '#475569',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontFamily: 'AeonikRegular',
  },

  receivePrimaryValue: {
    color: '#475569',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  receiveSecondaryValue: {
    color: '#94A3B8',
    fontSize: adjustFontSizeForIOS(11, 2),
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  bottomContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'stretch',
  },
});

export { styles };
