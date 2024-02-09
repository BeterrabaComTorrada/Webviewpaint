
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewComponent = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={require('../assets/index.html')} // Caminho para o arquivo HTML local
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewComponent;
