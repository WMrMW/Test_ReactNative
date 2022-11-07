import React, { useState } from "react"
import { Text, TextInput, View, TouchableOpacity } from "react-native"
import ResultImc from "./resultImc/";
import styles from "./style";


export default function Form() {

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