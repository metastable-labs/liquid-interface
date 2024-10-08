import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    paddingTop: 47,
    paddingHorizontal: 16,
    paddingBottom: 34,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },

  main: {
    alignItems: 'center',
    gap: 44,
  },

  container: {
    alignSelf: 'stretch',
    gap: 20,
  },

  inputAndPayment: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 20,
  },

  balanceAndInput: {
    alignItems: 'center',
    gap: 8,
  },

  balanceText: {
    color: '#64748B',
    fontSize: 16,
    lineHeight: 19.84,
    fontFamily: 'AeonikRegular',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: -0.96,
  },

  input: {
    color: '#020617',
    fontSize: 48,
    lineHeight: 53,
    letterSpacing: -0.96,
    fontWeight: '700',
    fontFamily: 'ClashDisplayBold',
  },

  cursor: {
    width: 4,
    height: 48,
    backgroundColor: '#4691FE',
    position: 'absolute',
    right: -5,
  },

  selectorText: {
    fontSize: 13,
    lineHeight: 16.12,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'AeonikMedium',
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

  paymentSelectorText: {
    color: '#475569',
  },

  balanceSelectorContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 11,
    marginTop: 5,
  },

  balanceSelector: {
    height: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },

  balanceSelectorText: {
    color: '#334155',
  },

  action: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: 'stretch',
  },
});

export default styles;
