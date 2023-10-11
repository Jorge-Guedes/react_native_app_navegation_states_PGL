import { NavigationContainer as NavCon } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./src/screens/Home";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import { colors } from "./src/utils/colors";
import { Beers } from "./src/screens/Beers";
import { useLoginStore } from "./src/store/LoginStore";

const Tab = createBottomTabNavigator();

export default function App() {
  const login = useLoginStore((state) => state.login);
  const logout = useLoginStore((state) => state.logout);
  const user = useLoginStore((state) => state.user);
  const pass = useLoginStore((state) => state.pass);
  const isLoginIn = useLoginStore((state) => state.isLoggedIn);

  const userText = "user";
  const passText = "pass";

  console.log("Usuario:", user, " Pass: ", pass);

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
                  if(isLoginIn){
                    logout();
                  }else{
                    login(userText,passText);
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
                onPress={() => console.log("BOTON PULSAO")}
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
                onPress={() => console.log("BOTON PULSAO")}
              />
            ),
            tabBarBadge: "5",
          }}
        />
      </Tab.Navigator>
    </NavCon>
  );
}
