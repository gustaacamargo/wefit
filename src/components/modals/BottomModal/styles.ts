import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  },
  bottomNavigationView: {
    flex: 1,
    paddingTop: 38,
    backgroundColor: '#fff',
    borderRadius: 16
  },
  modalTitle: {
    fontSize: 16,
    marginLeft: 16,
  },
  button: {
    flex: 1,
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  containerInput: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 16
  }
});

export { styles }