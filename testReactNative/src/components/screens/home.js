import { useNavigation } from '@react-navigation/native'
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';

export default function Home() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.btnSairArea}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'Login' },
                ],
              }));
          }}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.graficArea}>
      </View>
      <View style={styles.imcArea}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8bfaff',
  },
  button: {
    backgroundColor: '#1b065e',
    width: 100,
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnSairArea: {
    padding: 10,
    alignItems: 'flex-end',

  },
  graficArea: {
    flex:1,
  },
})