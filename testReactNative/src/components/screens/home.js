import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Grafic from '../grafic/index';
import { CommonActions } from '@react-navigation/native';


export default function Home() {

  const [peso, setPeso] = useState(80);
  const [altura, setAltura] = useState(1.77);
  const [imc, setImc] = useState(peso / (altura * altura));
  const [message, setMessage] = useState('');

  const navigation = useNavigation();



  useEffect(() => {

    function calculaIMC() {
      const aux = peso / (altura * altura);
      setImc(aux);
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

  }, [])



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
      <View style={styles.imcArea}>
        <Image
          style={styles.image}
          source={require('../../assets/obesidade.jpg')}
        />
        <Text
          style={styles.imcText}
        >{`O seu IMC é: ${imc.toFixed(2)}`}</Text>
        <Text
          style={styles.imcText}
        >{`Com a classificação de : ${message}`}</Text>
      </View>
      <View style={styles.graficArea}>
          <Grafic/>
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
  graficArea:{

  },
})