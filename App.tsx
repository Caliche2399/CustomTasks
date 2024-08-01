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
