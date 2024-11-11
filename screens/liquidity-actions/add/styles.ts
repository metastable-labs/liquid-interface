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
    alignItems: 'center',
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

  inputs: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputDivider: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
    backgroundColor: '#F8FAFC',
  },

  bottomContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  errorText: {
    color: '#693D11',
    fontSize: adjustFontSizeForIOS(12, 2),
    lineHeight: 15.84,
    fontFamily: 'AeonikRegular',
  },
});

const coinSelectorInputStyles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignSelf: 'stretch',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEEF4',
  },

  input: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(24, 3),
    lineHeight: 26.88,
    letterSpacing: -0.6,
    fontWeight: '500',
    maxWidth: '40%',
    fontFamily: 'AeonikMedium',
  },

  invalidText: {
    color: '#AF1D38',
  },

  tokenContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
  },

  tokenSelector: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 9999,
    backgroundColor: '#F8FAFC',
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

  tokenText: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
    textAlign: 'right',
  },

  balanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 5,
  },

  balanceTitle: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(12, 2),
    lineHeight: 15.84,
    textAlign: 'right',
    fontFamily: 'AeonikRegular',
  },

  balanceValue: {
    color: '#334155',
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
    textAlign: 'right',
    fontFamily: 'AeonikRegular',
  },
});

const errorStyles = StyleSheet.create({
  container: {
    padding: 24,
    alignSelf: 'stretch',
    gap: 16,
    borderRadius: 20,
    backgroundColor: '#FEF7EC',
  },

  top: {
    alignSelf: 'stretch',
    gap: 4,
  },

  title: {
    color: '#693D11',
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 19.84,
    letterSpacing: -0.6,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  text: {
    color: '#693D11',
    fontSize: adjustFontSizeForIOS(12, 2),
    lineHeight: 15.84,
    fontFamily: 'AeonikRegular',
  },

  bottom: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 8,
  },
});

const infoStyles = StyleSheet.create({
  container: {
    marginTop: 12,
    alignSelf: 'stretch',
    gap: 24,
  },

  info: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  title: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(15, 2),
    lineHeight: 19.8,
    fontFamily: 'AeonikRegular',
  },

  value: {
    color: '#475569',
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 19.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
});

const paymentMethodSelectionStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    gap: 14,
  },

  selectorCard: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 24,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    padding: 6,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    backgroundColor: '#0F172A',
  },

  textContainer: {
    flex: 1,
  },

  text: {
    color: '#0F172A',
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 19.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  checkMarkContainer: {
    padding: 3,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4691FE',
    backgroundColor: '#4691FE',
  },

  paymentSelector: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    marginTop: 10,
  },

  selectorText: {
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'AeonikMedium',
    color: '#475569',
  },
});

export { styles, coinSelectorInputStyles, errorStyles, infoStyles, paymentMethodSelectionStyles };
