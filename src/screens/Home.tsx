import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TextInput,
  Image
} from "react-native";
const wallpaper=require("../../assets/homeWall.jpg");
const titleImage=require("../../assets/titleImage.png");

export const Home = () => {

  // const [text, setText] = useState("");
  // const changeText = (t: string) => {
  //   setText(t);
  // };

  return (
    <ImageBackground source={wallpaper} style={styles.wallpaper}>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Hola Mundo!! {text}</Text>
        <TextInput
          placeholder="Escribe tu nombre:"
          onChangeText={changeText}
          value={text}
        ></TextInput>
        <Text style={{ fontSize: 20, textAlign: "center", padding: 25 }}>
          Haga click en el icono de cervezas🍺 de la barra inferior
        </Text> */}
        <Image source={titleImage} style={styles.titleImage} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wallpaper:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: "blue",
  },
  titleImage: {
    width: 400,
    height: 400,
  },
});
