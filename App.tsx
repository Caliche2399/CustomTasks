import { StyleSheet, View } from 'react-native';
import { Root } from "react-native-alert-notification";
import {Provider} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";
import {NavigationTabs} from "./src/navigation/NavigationTabs";

export default function App() {

  return (
    <Provider >
      <Root>
          <NavigationContainer>
            <NavigationTabs />
          </NavigationContainer>
      </Root>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  headerStyles: {
    color: '#fff',
    fontSize: 20
  }
});
