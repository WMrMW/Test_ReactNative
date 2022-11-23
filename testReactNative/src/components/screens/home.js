import { useNavigation } from '@react-navigation/native'
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Welcome() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#1b065e' }}>
        Seja Bem Vindo!
      </Text>
      <Text style={{ fontSize: 35, fontWeight: 'bold', color: '#1b065e' }}>
        Clique em Acessar para continuar
      </Text>

      <TouchableOpacity
        style={styles.containerbuttontext}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}> Acessar </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8bfaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerbuttontext: {
    position: 'absolute',
    backgroundColor: '#1b065e',
    borderRadius: 50,
    paddingVertical: 8,
    width: 120,
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

})