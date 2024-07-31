import { StyleSheet, View } from 'react-native';
import {Button, Header, Icon} from "react-native-elements";
import {useEffect, useState} from "react";
import {AddTaskForm} from "./src/components/AddTaskForm";
import { Root } from "react-native-alert-notification";
import TasksScreen from "./src/screens/TasksScreen";
import {Provider} from "react-native-paper";
import {initializeNotifications} from "./src/lib";

export default function App() {

  const [isVisible, setIsVisible] = useState(false);

  const [updateTasks, setUpdateTasks] = useState(false);

  useEffect(() => {
    initializeNotifications().then(()=> console.log("inicie las notiifaciciones"))
  }, []);

  return (
    <Provider >
      <Root>
        <View style={styles.container}>
          <Header
            backgroundColor={"#65b601"}
            centerComponent={{ text: 'Tareas Generales', style: { color: '#fff', fontSize: 20 } }}
          />
          <TasksScreen setUpdateTasks={setUpdateTasks} updateTasks={updateTasks}/>
          <Icon
            reverse
            name="plus"
            type="font-awesome"
            color="#65b601"
            containerStyle={styles.fab}
            onPress={() => setIsVisible(true)}
          />
          <AddTaskForm
            setUpdateTasks={setUpdateTasks}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            formTitle={"Añadir Tarea"}
          />
        </View>
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
