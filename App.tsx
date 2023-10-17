import { NavigationContainer as NavCon } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./src/screens/Home";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import { colors } from "./src/utils/colors";
import { Beers } from "./src/screens/Beers";
import { useLoginStore } from "./src/store/LoginStore";
import { styles } from "./src/utils/styles";
import { Modal, Pressable, View, Text, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  const [modalLoginVisible, setModalLoginVisible] = useState(false);

  const login = useLoginStore((state) => state.login);
  const logout = useLoginStore((state) => state.logout);
  const user = useLoginStore((state) => state.user);
  const pass = useLoginStore((state) => state.pass);
  const isLoginIn = useLoginStore((state) => state.isLoggedIn);

  let startApp= false;

  const [userText, setUserText] = useState("");
  const [passText, setPassText] = useState("");

  const showModalLogin = () => {
    setModalLoginVisible(true);
  };

/*   const confirmLogin = () => {
    login(userText, passText);
    if (isLoginIn) {
      console.log("Usuario iniciado con éxito");
      showAlert("SESIÓN INICIADA", "Usuario iniciado con éxito");
      setModalLoginVisible(false);
    } else {
      console.log("Usuario incorrecto");
      showAlert("ERROR AL INICIAR", "Usuario o contraseña erróneos");
    }
  }; */

  const confirmLogin=()=>{
    login(userText, passText);
    startApp=true;
    console.log("confirm startApp: ",startApp);
  }

  useEffect(() => {
    console.log("startApp useEffect: ",startApp);
    if (isLoginIn) {
      console.log("Usuario iniciado con éxito");
      showAlert("SESIÓN INICIADA", "Usuario iniciado con éxito");
      setModalLoginVisible(false);
      startApp=false;
    }
    else {
      console.log("Else con startApp en: ",startApp);
      if(startApp){
        console.log("Usuario incorrecto");
        showAlert("ERROR AL INICIAR", "Usuario o contraseña erróneos");
        startApp=false;
      }
    }
  }, [isLoginIn]);

/*   useEffect(() => {
    if (isLoginIn) {
      console.log("Usuario iniciado con éxito");
      showAlert("SESIÓN INICIADA", "Usuario iniciado con éxito");
      setModalLoginVisible(false);
    } else {
      console.log("Usuario incorrecto");
      showAlert("ERROR AL INICIAR", "Usuario o contraseña erróneos");
    }
  }, [isLoginIn]); */

  const showAlert = (tittle: string, description: string) => {
    Alert.alert(
      tittle,
      description,
      [
        { text: "Aceptar", onPress: () => console.log("Aceptar presionado") },
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelar presionado"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <NavCon>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarStyle: {
              borderColor: colors.black,
              height: 50,
              backgroundColor: colors.darkGreen,
            },
            tabBarLabelStyle: {
              color: colors.lightGray,
              fontSize: 12,
            },
            tabBarLabel: "Home",
            tabBarIcon: () => (
              <Icons name="home" size={40} color={colors.lightGray} />
            ),
            headerRight: () => (
              <Icons
                name={isLoginIn ? "logout" : "account"}
                size={35}
                style={{ marginRight: 10 }}
                onPress={() => {
                  if (isLoginIn) {
                    showAlert("CIERRE DE SESIÓN", "Hasta la próxima");
                    logout();
                  } else {
                    showModalLogin();
                  }
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Latas de cervezas"
          component={Beers}
          initialParams={{ jsonType: "cans" }}
          options={{
            tabBarStyle: {
              borderColor: colors.black,
              height: 50,
              backgroundColor: colors.darkGreen,
            },
            tabBarLabelStyle: {
              color: colors.lightGray,
              fontSize: 12,
            },
            tabBarLabel: "Latas",
            tabBarIcon: () => (
              <Icons name="beer" size={40} color={colors.gold} />
            ),
            headerRight: () => (
              <Icons
                name={isLoginIn ? "logout" : "account"}
                size={35}
                style={{ marginRight: 10 }}
                onPress={() => {
                  if (isLoginIn) {
                    showAlert("CIERRE DE SESIÓN", "Hasta la próxima");
                    logout();
                  } else {
                    showModalLogin();
                  }
                }}
              />
            ),
            tabBarBadge: "3",
          }}
        />

        <Tab.Screen
          name="Botellas de cervezas"
          component={Beers}
          initialParams={{ jsonType: "bottles" }}
          options={{
            tabBarStyle: {
              borderColor: "red",
              height: 50,
              backgroundColor: colors.darkGreen,
            },
            tabBarLabelStyle: {
              color: colors.lightGray,
              fontSize: 12,
            },
            tabBarLabel: "Botellas",
            tabBarIcon: () => (
              <Icons name="bottle-wine" size={40} color={colors.gold} />
            ),
            headerRight: () => (
              <Icons
                name={isLoginIn ? "logout" : "account"}
                size={35}
                style={{ marginRight: 10 }}
                onPress={() => {
                  if (isLoginIn) {
                    showAlert("CIERRE DE SESIÓN", "Hasta la próxima");
                    logout();
                  } else {
                    showModalLogin();
                  }
                }}
              />
            ),
            tabBarBadge: "5",
          }}
        />
      </Tab.Navigator>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLoginVisible}
      >
        <View style={styles.containerModalLogin}>
          <View style={styles.modalViewLogin}>
            <Text style={styles.modalText}>INICIAR SESION</Text>
            <View>
              <View style={styles.credentialFields}>
                <Text>Usuario</Text>
                <TextInput
                  placeholder="Nombre de usuario"
                  onChangeText={(text) => setUserText(text)}
                  value={userText}
                />
              </View>
              <View style={styles.credentialFields}>
                <Text>Contraseña</Text>
                <TextInput
                  secureTextEntry={true}
                  placeholder="Contraseña"
                  onChangeText={(text) => setPassText(text)}
                  value={passText}
                />
              </View>
            </View>
            <View style={styles.buttonModalLoginContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  confirmLogin();
                  //login(userText,passText);
                }}
              >
                <Text style={styles.textStyle}>Inciar Sesión</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalLoginVisible(!modalLoginVisible)}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </NavCon>
  );
}
