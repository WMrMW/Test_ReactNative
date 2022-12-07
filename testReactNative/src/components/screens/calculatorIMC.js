import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Keyboard, ScrollView } from "react-native";
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Lista(props) {

    async function getItems() {
        return await AsyncStorage.getItem('pesos')
            .then(response => {
                if (response)
                    return Promise.resolve(JSON.parse(response));
                else
                    return Promise.resolve([]);
            })
    }

    async function deleteItem(id) {
        let savedItems = await getItems();
        const index = await savedItems.findIndex(item => item.id === id);
        savedItems.splice(index, 1);
        await AsyncStorage.setItem('pesos', JSON.stringify(savedItems));
        props.flag(true);
        return;
    }

    return (
        <View style={styles.containerList}>
            <Text style={styles.textPeso}>{props.item}</Text>
            <TouchableOpacity style={styles.deleteButton}
                onPress={() => {
                    deleteItem(props.id);
                    props.flag(false);
                }}>
                <Feather name='trash-2' size={20} color={'#fff'} />
            </TouchableOpacity>
        </View>
    );
}

export default function Form() {

    const [altura, setAltura] = useState(0);
    const [newAltura, setNewAltura] = useState('');
    const [peso, setPeso] = useState(null);
    const [pesoInput, setPesoInput] = useState('');
    const [flag, setFlag] = useState(false);
    const [items, setItems] = useState([]);


    useEffect(() => {
        async function getPeso() {
            const response = await AsyncStorage.getItem('peso');
            const pes = JSON.parse(response);
            if (pes !== null) {
                try {
                    setPesoInput(pes.peso);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getPeso();
    }, [])

    useEffect(() => {
        async function getAltura() {
            const response = await AsyncStorage.getItem('altura');
            const alt = JSON.parse(response);
            if (alt !== null) {
                try {
                    setAltura(alt.altura);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getAltura();
    }, []);

    useEffect(() => {
        async function saveAltura() {
            try {
                const alt = { id: new Date().getTime(), altura: altura };
                AsyncStorage.setItem('altura', JSON.stringify(alt));
            } catch (error) {
                console.log(error);
            }
        }
        saveAltura();
    }, [altura]);

    useEffect(() => {
        async function savePeso() {
            let response = fetch('http://192.168.2.124:3000/savePeso', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    valor: peso
                })
            });
        }
        savePeso();
    }, [peso]);


    useEffect(() => {
        getItems().then(items => setItems(items));
    }, [flag]);


    async function getItems() {
        return await AsyncStorage.getItem('pesos')
            .then(response => {
                if (response)
                    return Promise.resolve(JSON.parse(response));
                else
                    return Promise.resolve([]);
            })
    }

    async function Adicionar() {
        const listItem = { id: new Date().getTime(), peso: Number(peso) };
        let savedItems = [];
        const response = await AsyncStorage.getItem('pesos');

        if (response) savedItems = JSON.parse(response);
        savedItems.push(listItem);

        await AsyncStorage.setItem('pesos', JSON.stringify(savedItems));
        setFlag(true);
    }





    async function validateEdit() {

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
            setNewAltura('');
            Keyboard.dismiss();
        } else {
            alert("Por favor preencha o campo corretamente!");
        }
    }

    function validateEditPeso() {
        let aux = '';
        for (let index = 0; index < pesoInput.length; index++) {
            if (pesoInput[index] === ',') {
                aux += '.';
            } else {
                aux += pesoInput[index];
            }
        }
        return setPeso(Number(aux));
    }

    function adicionaPeso() {

        if (pesoInput.length > 0) {
            validateEditPeso();
            Adicionar();
            setFlag(false);
            setPesoInput('');
            Keyboard.dismiss();

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
                        placeholder={`${pesoInput}`}
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
            <View style={{ width: '90%', height: '35%', marginTop: 10, alignItems: 'center' }}>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.itemsContainer}>
                    {items.map(item => {
                        return <Lista key={item.id} id={item.id} item={item.peso} flag={setFlag} />
                    })}
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