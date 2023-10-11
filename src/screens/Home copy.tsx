import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";



export const Home = () => {

  const [text,setText]=useState("");
  const changeText = (t:string) =>{
    setText(t);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola Mundo!! {text}</Text>
      <TextInput placeholder="Escribe tu nombre:" onChangeText={changeText} value={text}></TextInput>
      <Text style={{fontSize:20, textAlign:'center', padding:25}}>Haga click en el icono de cervezas🍺 de la barra inferior</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      color: "blue",
    },
  });

