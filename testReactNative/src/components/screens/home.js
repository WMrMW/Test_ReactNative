import { useNavigation } from '@react-navigation/native'
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Welcome() {

 const navigation = useNavigation();

  return(
    <View style={styles.container}>

      <TouchableOpacity 
        style = {styles.containerbuttontext}
        onPress={ () => navigation.navigate('Login')}
      >
        <Text style = {styles.buttonText}> Acessar </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerbuttontext:{
    position: 'absolute',
    backgroundColor:"red",
    borderRadius: 50,
    paddingVertical:8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
})