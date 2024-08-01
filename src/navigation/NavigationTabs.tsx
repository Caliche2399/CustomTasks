import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import TasksScreen from "../screens/TasksScreen";
import {CronometroScreen} from "../screens/CronometroScreen";
import {Text, View} from "react-native";
import {Icon} from "react-native-elements";
import {SCREENS_ICONS} from "../types/TaskTypes";
import {TemporizadorScreen} from "../screens/TemporizadorScreen";

const Tab = createBottomTabNavigator();

const findIcon = (routeName: string) => {
  const iconInfo = SCREENS_ICONS.find((icon) => icon.screen === routeName);
  return iconInfo || { value: "question", type: "font-awesome" };
};

export const NavigationTabs =() =>{

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({ color, size }) => {
          const { value, type } = findIcon(route.name);
          return <Icon name={value} type={type} color={color} size={size} />;
        },
        tabBarStyle:{
          height: 60

        },
        tabBarLabelStyle: {
          fontSize: 14,
          marginBottom:5
        }
      })}
    >
      <Tab.Screen
        name="Tareas"
        component={TasksScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 380}}>
              <Text style={{ fontSize: 22 }}>Tareas</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cronometro"
        component={CronometroScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 380}}>
              <Text style={{ fontSize: 22 }}>Cronometro</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Temporizador"
        component={TemporizadorScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 380}}>
              <Text style={{ fontSize: 22 }}>Temporizador</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}