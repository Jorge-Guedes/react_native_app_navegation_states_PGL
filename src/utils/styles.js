import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.darkGray,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      backgroundColor: colors.white,
      flex: 1,
      flexDirection: "column",
    },
    imageContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      height: 200,
      resizeMode: "contain",
      marginBottom: 20,
    },
    title: {
      textAlign:"center",
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 5,
      marginBottom:20,
    },
    modalContainer: {
      flex:1,
      backgroundColor:"white",
      padding: 14,
    },
    tag: {
      marginTop: 5,
      marginBottom: 20,
      color:colors.darkGreen
    },
    tagContainer: {
      flexDirection:"row",
    },
    tagTitle:{
      fontWeight:"bold",
    },

    //MODAL PARA BLOQUEAR CONTENIDO SIN LOGUEARTE
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor:"rgba(0,0,0,0.5)"
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: colors.darkGreen,
    },
    buttonClose: {
      backgroundColor: colors.darkGreen,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },

    //MODAL DE INICIO DE SESIÓN
    containerModalLogin:{
      flex: 1,
      padding:15,
      justifyContent:"center",
      backgroundColor:"rgba(0,0,0,0.5)"
    },
    modalViewLogin:{
      padding:20,
      borderRadius:15,
      backgroundColor: colors.lightGray,
    },
    credentialFields:{
      fontWeight:"bold",
      padding:15,
      justifyContent:"space-around",
    },
    buttonModalLoginContainer:{
      flexDirection:"row",
      justifyContent:"space-around",
    }
  });
  