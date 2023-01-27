import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Grafic from '../grafic/index';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalHost from '../../../LocalHost';


export default function Home() {

  const [peso, setPeso] = useState(0);
  const [altura, setAltura] = useState(0);
  const [imc, setImc] = useState(0);
  const [message, setMessage] = useState('');
  const [flag, setFlag] = useState(false);

  const navi = useNavigation();
  let isFocused = useIsFocused();

  useEffect(() => {
    async function getUserDados() {
      let userDados = await AsyncStorage.getItem('userData');
      userDados = JSON.parse(userDados);
      const response = await fetch(`http://${LocalHost.address}:${LocalHost.port}/IMC/webresources/generic/User/getUser/${userDados.id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      let json = await response.json();
      if (json.imc !== null && json.altura !== null && json.peso !== null) {
        setAltura(json.altura);
        setPeso(json.peso);
        setImc(json.imc);
        setFlag(true);
      } else {
        setFlag(false);
      }
    }
    getUserDados();

  }, [isFocused]);


  useEffect(() => {
    function calculaIMC() {
      if (imc < 18.5) {
        setMessage('Baixo Peso');
      } else {
        if (imc >= 18.5 && imc < 24.9) {
          setMessage('Peso Normal');
        } else {
          if (imc >= 24.9 && imc < 29.9) {
            setMessage('Excesso de Peso');
          } else {
            if (imc >= 29.9 && imc < 35) {
              setMessage('Obesidade');
            } else {
              setMessage('Obesidade Extrema');
            }
          }
        }
      }
    }
    calculaIMC();
  }, [imc])



  return (
    <View style={styles.container}>
      <View style={styles.btnSairArea}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navi.dispatch(
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
      <View style={styles.imcArea}>
        <Image
          style={styles.image}
          source={require('../../assets/obesidade.jpg')}
        />
        <Text
          style={styles.imcText}
        >{flag ? `O seu IMC é: ${imc.toFixed(2)}` : ''}</Text>
        <Text
          style={styles.imcText}
        >{flag ? `Com a classificação de : ${message}` : ''}</Text>
      </View>
      <View style={styles.graficArea}>
        {isFocused ? <Grafic/> : ''}
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
  imcArea: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 340,
    height: 211,
  },
  imcText: {
    paddingTop: 7,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1b065e',
  },
  graficArea: {

  },
})