import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Lista(props) {

    async function deleteItem(id) {
        let userDados = await AsyncStorage.getItem('userData');
        userDados = JSON.parse(userDados);
        await fetch('http://192.168.2.124:3000/delete', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });
        console.log('aq');
        props.fl ? props.att(false) : props.att(true);
        console.log(props.fl);
        return;
    }

    return (
        <View style={styles.containerList}>
            <Text style={styles.textPeso}>{props.item}</Text>
            <TouchableOpacity style={styles.deleteButton}
                onPress={() => {
                    deleteItem(props.id);
                    return;
                }}>
                <Feather name='trash-2' size={20} color={'#fff'} />
            </TouchableOpacity>
        </View>
    );
}

export default function Form() {

    useEffect(() => {
        async function getAltura() {
            let userDados = await AsyncStorage.getItem('userData');
            userDados = JSON.parse(userDados);
            const reqs = await fetch('http://192.168.2.124:3000/getUser', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userDados.id
                })
            });
            let json = await reqs.json();
            if (json.altura !== null) {
                setAltura(json.altura)
                setPeso(json.peso);
                setAlturaText(json.altura);
            }
        }
        getAltura();
    }, []);


    const [altura, setAltura] = useState(null);
    const [altura_v, setAltura_v] = useState(null);
    const [alturaText, setAlturaText] = useState('');
    const [alturaInput, setalturaInput] = useState(null);
    const [peso, setPeso] = useState(null);
    const [new_peso, setNew_peso] = useState(null);
    const [pesoInput, setPesoInput] = useState('');
    const [items, setItems] = useState([]);
    const [flag, setFlag] = useState(false);
    const [flag_a, setFlag_a] = useState(false);
    
    async function getItems() {
        let userDados = await AsyncStorage.getItem('userData');
        userDados = JSON.parse(userDados);
        const reqs = await fetch('http://192.168.2.124:3000/getPesos', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userDados.id
            })
        });
        const pesos = await reqs.json();
        console.log(flag);
        return pesos;
    }


    useEffect(() => {
        async function saveAltura() {
            let userDados = await AsyncStorage.getItem('userData');
            userDados = JSON.parse(userDados);
            const imc = peso / (altura * altura);
            await fetch('http://192.168.2.124:3000/editAlt', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userDados.id,
                    altura: altura_v,
                    imc: imc
                })
            });
        }
        if (altura_v !== null) {
            saveAltura();
        }
    }, [altura_v]);

    useEffect(() => {
        getItems().then((iten) => { setItems(iten); });
    }, [flag])

    useEffect(() => {
        async function savePeso() {
            let userDados = await AsyncStorage.getItem('userData');
            userDados = JSON.parse(userDados);
            const imc = peso / (altura * altura);
            await fetch('http://192.168.2.124:3000/editPeso', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userDados.id,
                    peso: peso,
                    imc: imc
                })
            });
        }

        async function addPeso() {

            let userDados = await AsyncStorage.getItem('userData');
            userDados = JSON.parse(userDados);
            await fetch('http://192.168.2.124:3000/addPeso', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    valor: peso,
                    userId: userDados.id,
                })
            });
        }
        if (new_peso !== null) {
            savePeso();
            addPeso();
        }
    }, [new_peso])





    async function validateEdit() {

        if (alturaInput.length > 0) {
            let aux = '';
            for (let index = 0; index < alturaInput.length; index++) {
                if (alturaInput[index] === ',') {
                    aux += '.';
                } else {
                    aux += alturaInput[index];
                }
            }
            let n = Number(aux);
            setAltura(n);
            setAlturaText(n);
            setAltura_v(n);
            setalturaInput('');
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
            setPeso(Number(aux));
            setNew_peso(Number(aux));
            setPesoInput('');
            Keyboard.dismiss();

        } else {
            alert("Por favor preencha o campo corretamente!");
        }
    }

    return (
        <View style={styles.formContext} behavior="position" enabled>
            <View style={styles.boxTitle}>
                <Text style={styles.textTitle}>Dados</Text>
            </View>
            <View style={styles.form}>
                <View>
                    <Text style={styles.lableText}>{`Altura Atual: ${alturaText}`}</Text>
                </View>
                <View style={styles.alturaArea}>
                    <TextInput
                        style={styles.inputTextEdit}
                        value={alturaInput}
                        keyboardType="numeric"
                        onChangeText={setalturaInput}
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
                            flag ? setFlag(false) : setFlag(true);
                            setFlag_a(flag);
                        }}
                    >
                        <Text style={styles.textButtonCalcu}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '90%', height: '35%', marginTop: 10, alignItems: 'center' }}>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.itemsContainer}>
                    {items.length > 0 ? items.map((item) => {
                        return <Lista key={item.id} id={item.id} item={item.valor} att={setFlag} fl={flag_a} />
                    }) : ''}
                </ScrollView>
            </View>
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
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        height: 35,
        marginLeft: 10,
        backgroundColor: '#1b065e',
    },
    btnPeso: {
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 40,
        marginLeft: 10,
        backgroundColor: '#1b065e',
    },

    //styles da ScrollArea
    deleteButton: {
        height: 35,
        width: 60,
        backgroundColor: '#1b065e',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontWeight: 'bold',
    },
    textPeso: {
        paddingTop: 7,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1b065e',
    },
    scrollContainer: {
        flex: 1,
        width: '90%',
        borderRadius: 7,
    },
    itemsContainer: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#fff',
    },
    containerList: {
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    },

});