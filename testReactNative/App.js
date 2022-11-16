/*import { StyleSheet, View } from 'react-native';
import Title from './src/components/title/';
import Form from './src/components/form';

export default function App() {
  return (
    <View style={styles.container}>
      <Title/>
      <Form/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8bfaff',
    paddingTop: 80,
  },
});
*/

import React from 'react';
import { StatusBar } from 'react-native';


import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/components/routes/index';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#38A69D' barStyle="light-content"/>
      <Routes/>
    </NavigationContainer>
  );
}



