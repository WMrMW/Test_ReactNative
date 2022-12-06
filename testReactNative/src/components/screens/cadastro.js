import React, { useState } from "react";
import { Keyboard, StatusBar, TouchableWithoutFeedback } from "react-native";
import { Text, TextInput, View, StyleSheet, Image, KeyboardAvoidingView,Platform, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import config from "../../../config/config.json"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as Animatable from 'react-native-animatable';




export default function Cadastro() {
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [message, setmessageee] = useState('');

    const navigationimc = useNavigation();
 
    const schema = yup.object({
        nome: yup.string().required("Informe seu nome"),
        email: yup.string().email("Email invalido").required("Informe seu email"),
        dataNasc : yup.date("Data invalida").required("Informe sua data de nascimento"),
        senha : yup.string().min(6, "A senha deve ter pelo menos 6 digitos").required("Informe seu nome"), 
    })

    const { control, handleSubmit , formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    async function fnCadastrar(){
        const reqs = await fetch('http://10.0.10.128:3000/cadastro',{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                nomeUser: nome,
                password: senha,
                email:email,
                dataUser: dataNasc
            })
        })
        let ress = await reqs.json();
        if(ress === 'Usuário cadastrado com sucesso!'){
            setmessageee(ress);
            setTimeout(()=>{
              setmessageee('');
            },3000) 
            setTimeout(()=>{
                navigationimc.navigate('Login')
              },4000)
        }
       // setmessageee(ress);  
    }
  

    return (
        <KeyboardAvoidingView behavior="position" styles={styles.container} enabled>
         
                <Animatable.View>
                    <View style={styles.titleArea}>
                        <Text style={styles.textBemVindo}>Crie seu cadastro!</Text>
                    </View>

                    <View style={styles.formArea}>
                        {message && (
                            <Text style={styles.messageErrorLogin}>{message}</Text>
                        )}
                        <Text style={styles.textCamp}>Nome</Text>
                        <Controller
                            control={control}
                            name = "nome"
                            render={({field: { onChange,onBlur,value} }) => (
                                <TextInput 
                                style={[styles.textInput,
                                {borderWidth: errors.name && 1,
                                borderColor: errors.name && '#ff375b'}]}
                                onChangeText={text=>setNome(text)} 
                                onBlur={onBlur}
                                value ={value}
                                placeholder= "Digite seu nome"
                                />
                            )}
                        />
                        {errors.name &&  <Text style = {styles.labelError}>{errors.name?.message}</Text>}

                    <Text style={styles.textCamp}>Email</Text> 
                        <Controller
                            control={control}
                            name = "email"
                            render={({field: {onChange, onBlur,value} }) => (
                                <TextInput 
                                style={[styles.textInput,
                                {borderWidth: errors.email && 1,
                                borderColor: errors.email && '#ff375b'}]}
                                onChangeText={text=>setEmail(text)} 
                                onBlur={onBlur}
                                value ={value}
                                keyboardType = "email-address"
                                placeholder = "Digite seu email"
                                />
                            )}
                        />

                    {errors.email &&  <Text style = {styles.labelError}>{errors.email?.message}</Text>}

                        <Text style={styles.textCamp}>Data de Nascimento</Text>
                        
                        <Controller
                            control={control}
                            name = "dataNasc"
                            render={({field: { onChange,onBlur,value} }) => (
                            <TextInput 
                            style={[styles.textInput,
                                {borderWidth: errors.dataNasc && 1,
                                    borderColor: errors.dataNasc && '#ff375b'}]}
                                onChangeText={text=>setDataNasc(text)}
                                onBlur={onBlur}
                                value ={value}
                                keyboardType = "numbers-and-punctuation"
                                placeholder= "Digite sua data de nascimento"
                                />
                            )}
                        />
                        
                        {errors.dataNasc &&  <Text style = {styles.labelError}>{errors.dataNasc?.message}</Text>}

                        <Text style={styles.textCamp}>Senha</Text>
                    <Controller
                            control={control}
                            name = "senha"
                            render={({field: {onChange, onBlur,value} }) => (
                                <TextInput 
                                secureTextEntry={true} 
                                style={[styles.textInput,
                                {borderWidth: errors.senha && 1,
                                borderColor: errors.senha && '#ff375b'}]}
                                onChangeText={text=>setSenha(text)}
                                onBlur={onBlur}
                                value ={value}
                                placeholder= "Digite sua senha"
                                />
                            )}
                        />
                        {errors.senha &&  <Text style = {styles.labelError}>{errors.senha?.message}</Text>}


                    </View>
                    <View style={styles.btnArea}>
                        <TouchableOpacity style={styles.btnCadastro} onPress={fnCadastrar}>
                            <Text style={styles.textbtncadastro}>Cadastrar</Text>
                        </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.buttonregister}
                    onPress={() => { navigationimc.navigate('Login') }}
                    >
                    <Text style={styles.registerText}>Já possui uma conta ? Entre</Text>
                    </TouchableOpacity>
                    </View>

                </Animatable.View>
            
        </KeyboardAvoidingView>
    )
}
// <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
// </TouchableWithoutFeedback>
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8bfaff',
    },
    buttonregister: {
        alignSelf: 'center',
        marginTop:14,
    },
    registerText: {
        fontWeight: 'bold',
        color: '#a1a1a1',
    },
    titleArea: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8bfaff',
        padding: 15,
    },
    messageErrorLogin:{
        fontSize: 14,
        fontWeight: 'bold',
        color: "black",
        alignSelf: 'center',
    },
    textBemVindo: {
        fontSize: 25,
        color: '#1b065e',
        padding: 50,
        fontWeight: 'bold',
    },
    textCamp: {
        fontSize: 18,
        color: '#1b065e',
        paddingTop: 10,
        fontWeight: 'bold',
        paddingLeft:15
    },
    formArea: {
        backgroundColor: '#8bfaff',
        alignItems:'center',
    },
    btnArea: {
        backgroundColor: '#8bfaff',
        alignItems:'center',
        justifyContent:'center',
        padding:40,
    },
    textInput: {
        width: '75%',
        height: 35,
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginLeft: 15,
        marginTop:15
    },
    btnCadastro: {
        width: 120,
        height: 40,
        backgroundColor: '#1b065e',
        borderRadius: 20,
        justifyContent: 'center',
    },
    btnvoltar: {
        width: 120,
        height: 40,
        backgroundColor: '#1b065e',
        borderRadius: 20,
        justifyContent: 'center',
    },
    textbtncadastro: {
        textAlign: 'center',
        color: "#FFF",
    },
    labelError: {
        alignSelf : 'center',
        color : '#ff375b',
        marginBottom: 8,
    },
})