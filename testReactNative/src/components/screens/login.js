import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocalHost from '../../../LocalHost';

import * as Animatable from 'react-native-animatable';

export default function Login({ navigation }) {

  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [message, setmessageee] = useState('');

  const navigationimc = useNavigation();


  async function fnLogin() {
    const response = await fetch(`http://${LocalHost.address}:${LocalHost.port}/IMC/webresources/generic/User/login/${emailLogin}/${senhaLogin}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    let json = await response.json();
    if (json === null) {
      setmessageee('Erro: Usuário ou senha incorretos!');
      setTimeout(() => {
        setmessageee('');
      }, 5000)
      await AsyncStorage.clear();
    } else {
      await AsyncStorage.setItem('userData', JSON.stringify(json))
      navigation.navigate('Principal');
    }
  }

  return (
    
      <View style={styles.container}>
        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
          <Text style={styles.message}>Bem-vindo(a)</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerForm}>
          {message && (
            <Text style={styles.messageErrorLogin} >{message}</Text>
          )}
          <Text style={styles.title}>Email</Text>
          <TextInput
            onChangeText={text => setEmailLogin(text)}
            placeholder="Digite seu email"
            style={styles.input}
          />

          <Text style={styles.title}>Senha</Text>
          <TextInput
            onChangeText={text => setSenhaLogin(text)}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => fnLogin()}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonregister}
            onPress={() => { navigation.navigate('Cadastro') }}
          >
            <Text style={styles.registerText}>Não possui uma conta ? Cadastre-se</Text>
          </TouchableOpacity>


        </Animatable.View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8bfaff',
  },
  messageErrorLogin: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "red",
    alignSelf: 'center',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "#1b065e",
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerForm: {
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1b065e',
    width: '100%',
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
  buttonregister: {
    marginTop: 14,
    alignSelf: 'center',
  },
  registerText: {
    color: '#a1a1a1',

  }
});
