import {View, StyleSheet, TextInput} from "react-native";
import {Icon} from "react-native-elements";
import {SearchBar} from "react-native-screens";
import {useState} from "react";
import {TasksCards} from "../components/Tareas/TasksCards";
import {AddTaskForm} from "../components/Tareas/AddTaskForm";


export default function TasksScreen() {

  const [search, setSearch] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const [updateTasks, setUpdateTasks] = useState(false);


  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return(
    <>
      <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          onChangeText={updateSearch}
          style={styles.searchBar}
          placeholder={"Buscar"}/>
        <SearchBar/>
      </View>
      <View style={styles.cardsContainer}>
        <TasksCards updateTasks={updateTasks} setUpdateTasks={setUpdateTasks} searchQuery={search}/>
      </View>
      </View>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    width: '100%',
  },
  text: {
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  searchBar:{
    width: '90%',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 40,
    marginBottom: 50,
  },
  searchBarContainer: {
    marginHorizontal: 20,
    width: '100%',
  },
  cardsContainer: {
    marginHorizontal: 20,
    width: '90%',
  }
});