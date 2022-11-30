import React , { useState }from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTabs from "./principal";


import * as Animatable from 'react-native-animatable';

export default function Login({ navigation }) {

  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  const navigationimc = useNavigation();

  async function fnLogin(){
    const reqs = await fetch('http://10.0.10.128:3000/login',{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email:emailLogin,
            password: senhaLogin
        })
      })
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          onChangeText={text=>setEmailLogin(text)}
          placeholder="Digite seu email"
          style={styles.input}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          onChangeText={text=>setSenhaLogin(text)}
          placeholder="Digite sua senha"
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
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "#1b065e",
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
