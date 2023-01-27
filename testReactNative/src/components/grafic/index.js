import React, { useEffect, useState } from "react";
import { LineChart, YAxis, Grid } from 'react-native-svg-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import LocalHost from "../../../LocalHost";

export default function Grafic () {
    
    const [data,setData] = useState([]);

    useEffect(()=>{
        async function getUserDados() {
            let userDados = await AsyncStorage.getItem('userData');
            userDados = JSON.parse(userDados);
            const responsePes = await fetch(`http://${LocalHost.address}:${LocalHost.port}/IMC/webresources/generic/Peso/listPorId/${userDados.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            let json = await responsePes.json();
            json = JSON.stringify(json);
            const pesos = JSON.parse(json);
            const auxData = [];
            for (let i =0;i<pesos.length;i++) {
                auxData.push(pesos[i].valor);
            }
            setData(auxData);
        }
        getUserDados();
    },[]);


        const contentInset = { top: 20, bottom: 20 }

        return (
            <View style={{ height: 190,width:'90%',flexDirection: 'row',margin:10 }}>
                <YAxis
                    data={data}
                    contentInset={contentInset}
                    svg={{
                        fill: '#1b065e',
                        fontSize: 12,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value} Kg`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={data}
                    svg={{ stroke: 'rgb(5,100, 244)' }}
                    contentInset={contentInset}
                >
                    <Grid />
                </LineChart>
            </View>
        )
    }