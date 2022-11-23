import React, { useState } from "react"
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native"


function ResultImc (props){
    return (
        <View style={styles.resultIMC}>
            <Text style={styles.information}>{props.messageResultImc}</Text>
            <Text style={styles.numberIMC}>{props.ResultImc}</Text>
        </View>
    );
}

export default function Form(){

    const [altura, setAltura] = useState(null);
    const [peso, setPeso] = useState(null);
    const [messageImc, setMessageImc] = useState("Por favor preencha os campos de altura e peso!");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");

    function imcCalculator() {
        return setImc((peso / (altura ** 2)).toFixed(2));
    }

    function validatorImc() {

        if (altura != null && peso != null) {
            imcCalculator();
            setPeso(null);
            setAltura(null);
            setMessageImc("Seu IMC é : ");
            setTextButton("Calcular Novamente");
            return;
        }
        setImc(null);
        setTextButton("Calcular");
        setMessageImc("Por favor preencha os campos de altura e peso!");
    }

    return (
        
        
        <View style={styles.formContext}>
            <View style={styles.boxTitle}>
               <Text style={styles.textTitle}>Calculadora de IMC</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.lableText}>Altura</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={setAltura}
                    value={altura}
                    placeholder="Ex: 1.75"
                    keyboardType="numeric"
                />

                <Text style={styles.lableText}>Peso</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={setPeso}
                    value={peso}
                    placeholder="Ex: 75.45"
                    keyboardType="numeric"
                />
                <TouchableOpacity
                style={styles.buttonCalcu}
                onPress={() => {validatorImc()}}
                >
                    <Text style={styles.textButtonCalcu}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} ResultImc={imc} />
        </View >
    );
}


const styles = StyleSheet.create({
    //styles do title
    boxTitle: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 15,
    },
    textTitle: {
        color: "#1b065e",
        fontSize: 24,
        padding:15,
        fontWeight: "bold",
    },
    //style do form
    formContext: {
        width: "100%",
        height: "100%",
        bottom: 0,
        alignItems: "center",
        backgroundColor: '#8bfaff',
    },
    form: {
        width: "100%",
        height: "auto",
        marginTop: 30,
        padding: 10,
    },
    lableText: {
        color: "#1b065e",
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: 20,
    },
    inputText: {
        width: "90%",
        borderRadius: 50,
        backgroundColor: "#d6faff",
        height: 40,
        margin: 12,
        paddingLeft: 10
    },
    textButtonCalcu: {
        fontSize: 20,
        fontWeight:"bold",
        color:'#fff'
    },
    buttonCalcu: {
        borderRadius:50,
        alignItems:"center",
        justifyContent:"center",
        width:"90%",
        backgroundColor: '#1b065e',
        paddingTop:14,
        paddingBottom: 14,
        marginLeft:12,
        marginTop:30
    },

    //styles do resultIMC
    resultIMC: {
        flex: 1,
        marginTop: 15,
        paddingTop: 60,
        borderRadius: 50,
        alignItems: "center",
        width: "100%",
    },
    numberIMC: {
        fontSize: 18,
        color: "#1b065e",
        fontWeight: "bold"
    },
    information: {
        fontSize: 18,
        color: "#1b065e",
        fontWeight: "bold"
    }
});