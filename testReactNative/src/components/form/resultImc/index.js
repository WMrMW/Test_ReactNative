import React from "react"
import { View,Text} from "react-native"
import styles from "./style";


export default function ResultImc (props){
    return (
        <View style={styles.resultIMC}>
            <Text style={styles.information}>{props.messageResultImc}</Text>
            <Text style={styles.numberIMC}>{props.ResultImc}</Text>
        </View>
    );
}