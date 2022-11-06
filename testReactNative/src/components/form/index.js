import React, { useState } from "react"
import { Text, TextInput, View, Button } from "react-native"
import ResultImc from "./resultImc/";


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
        <View>
            <View>
                <Text>Altura</Text>
                <TextInput
                    onChangeText={setAltura}
                    value={altura}
                    placeholder="Ex: 1.75"
                    keyboardType="numeric"
                />

                <Text>Peso</Text>
                <TextInput
                    onChangeText={setPeso}
                    value={peso}
                    placeholder="Ex: 75.45"
                    keyboardType="numeric"
                />
                <Button
                onPress={() => validatorImc()}
                title={textButton} 
                />
            </View>
            <ResultImc messageResultImc={messageImc} ResultImc={imc} />
        </View >
    );
}