
import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebViewComponent from './src/components/WebViewComponent';

const App = () => {
  return (
    <View style={styles.container}>
      <WebViewComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
