import React, { useState } from "react"
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Keyboard } from "react-native"

function ResultImc(props) {
    return (
        <View style={styles.resultIMC}>
            <Text style={styles.information}>{props.messageResultImc}</Text>
            <Text style={styles.numberIMC}>{props.ResultImc}</Text>
        </View>
    );
}

export default function Form() {

    const [altura, setAltura] = useState(1.75);
    const [newAltura, setNewAltura] = useState('');
    const [peso, setPeso] = useState(null);
    const [pesoInput, setPesoInput] = useState('');
    const [message, setMessage] = useState('');
    const [imc, setImc] = useState(null);


    function imcCalculator() {
        return setImc((peso / (altura ** 2)).toFixed(2));
    }

    function validateEdit() {

        if (newAltura.length > 0) {
            let aux = '';
            for (let index = 0; index < newAltura.length; index++) {
                if (newAltura[index] === ',') {
                    aux += '.';
                } else {
                    aux += newAltura[index];
                }
            }
            let n = Number(aux);
            setAltura(n);
            Keyboard.dismiss();
        } else {
            alert("Por favor preencha o campo corretamente!");
        }
    }

    function adicionaPeso() {

        if (pesoInput.length > 0) {
            let aux = '';
            for (let index = 0; index < pesoInput.length; index++) {
                if (pesoInput[index] === ',') {
                    aux += '.';
                } else {
                    aux += pesoInput[index];
                }
            }
            let n = Number(aux);
            setPeso(n);
            imcCalculator();
            setMessage("Seu IMC é : ");
        } else {
            alert("Por favor preencha o campo corretamente!");
        }
    }


    return (
        <View style={styles.formContext}>
            <View style={styles.boxTitle}>
                <Text style={styles.textTitle}>Dados</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <Text style={styles.lableText}>Altura Atual: {altura}</Text>
                </View>
                <View style={styles.alturaArea}>
                    <TextInput
                        style={styles.inputTextEdit}
                        value={newAltura}
                        keyboardType="numeric"
                        onChangeText={setNewAltura}
                    />
                    <TouchableOpacity
                        style={styles.btnAltura}
                        onPress={() => validateEdit()}
                    >
                        <Text style={styles.textButtonCalcu}>Editar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.lableTextPeso}>Adicionar Peso</Text>
                <View style={styles.pesoArea}>
                    <TextInput
                        style={styles.inputTextPeso}
                        onChangeText={setPesoInput}
                        value={pesoInput}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity
                        style={styles.btnPeso}
                        onPress={() => {
                            adicionaPeso();
                        }}
                    >
                        <Text style={styles.textButtonCalcu}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ResultImc messageResultImc={message} ResultImc={imc} />
        </View >
    );
}


const styles = StyleSheet.create({
    //styles do title
    boxTitle: {
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        marginTop: 30,
    },
    textTitle: {
        color: "#1b065e",
        fontSize: 24,
        padding: 15,
        fontWeight: "bold",
    },

    //styles do form
    alturaArea: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
    },
    pesoArea: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
    },
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
        marginTop: 50,
    },
    lableText: {
        color: "#1b065e",
        fontSize: 25,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingBottom: 10,
    },
    lableTextPeso: {
        color: "#1b065e",
        fontSize: 25,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingBottom: 10,
        marginTop: 10,
    },
    inputTextEdit: {
        width: 120,
        borderRadius: 15,
        backgroundColor: "#d6faff",
        height: 35,
        paddingLeft: 20,
    },
    inputTextPeso: {
        width: 120,
        borderRadius: 15,
        backgroundColor: "#d6faff",
        height: 40,
        paddingLeft: 20,
    },
    textButtonCalcu: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff'
    },
    btnAltura: {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        height: 35,
        marginLeft: 10,
        backgroundColor: '#1b065e',
    },
    btnPeso: {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 40,
        marginLeft: 10,
        backgroundColor: '#1b065e',
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