import React, { useState } from "react"
import { StatusBar } from "react-native";
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from "react-native" 
import { useNavigation } from '@react-navigation/native'



export default function Cadastro(){

    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [nome, setNome] = useState(null);

    const navigationimc = useNavigation();
    
   return (
    <View  styles = {styles.container}>

        <Text style= {styles.textBemVindo}>Por favor digite os campos solicitados abaixo e realize seu cadastro!</Text>
        <TextInput placeholder="Digite seu nome" style={styles.textInput} onChangeText={text=>setNome(text)}/>
        <TextInput placeholder="Digite seu email" style={styles.textInput} onChangeText={text=>setEmail(text)}/>
        <TextInput secureTextEntry ={true} placeholder="Digite sua senha" style={styles.textInput} onChangeText={text=>setSenha(text)}/>
    
        <TouchableOpacity style={styles.btnCadastro} onPress={() => navigationimc.navigate('Login')}>
            <Text style={styles.textbtncadastro} >Cadastrar</Text>
        </TouchableOpacity>
    </View>
   )


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#8bfaff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    textBemVindo:{
       fontSize: 28,
       fontWeight: 'bold',
       color: 'black',
       alignItems: 'center',
       justifyContent: 'center',
       padding: 20,
       paddingTop:35,
    },
    textInput:{
        width: '100%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingLeft: 10,
        marginBottom:10,
    },
    btnCadastro:{
        width: '100%',
        height: 40,
        backgroundColor:'#7b42f5',
        borderRadius: 20,
        justifyContent: 'center',
    },
    textbtncadastro:{
        textAlign: 'center',
        color: "#FFF",
    },
})