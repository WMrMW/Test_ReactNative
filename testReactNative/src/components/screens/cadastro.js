import React, { useState } from "react";
import { StatusBar } from "react-native";
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';




export default function Cadastro() {

    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [nome, setNome] = useState(null);
    const [dataNasc, setDataNasc] = useState(null);

    const navigationimc = useNavigation();

    return (
        <View styles={styles.container}>
            <Animatable.View>
                <View style={styles.titleArea}>
                    <Text style={styles.textBemVindo}>Crie seu cadastro!</Text>
                </View>
                <View style={styles.formArea}>
                    <Text style={styles.textCamp}>Nome</Text>
                    <TextInput style={styles.textInput} onChangeText={(text) => setNome(text)} />
                    <Text style={styles.textCamp}>Email</Text>
                    <TextInput style={styles.textInput} onChangeText={(text) => setEmail(text)} />
                    <Text style={styles.textCamp}>Data de Nascimento</Text>
                    <TextInput style={styles.textInput} onChangeText={(text) => setDataNasc(text)} />
                    <Text style={styles.textCamp}>Senha</Text>
                    <TextInput secureTextEntry={true} style={styles.textInput} onChangeText={(text) => setSenha(text)} />

                </View>
                <View style={styles.btnArea}>
                    <TouchableOpacity style={styles.btnCadastro} onPress={() => navigationimc.navigate('Login')}>
                        <Text style={styles.textbtncadastro} >Cadastrar</Text>
                    </TouchableOpacity>
                </View>

            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8bfaff',
    },
    titleArea: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8bfaff',
        padding: 15,
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
    textbtncadastro: {
        textAlign: 'center',
        color: "#FFF",
    },
})