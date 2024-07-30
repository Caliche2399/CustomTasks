import {View, Text, StyleSheet, TextInput} from "react-native";
import {Icon} from "react-native-elements";
import {SearchBar} from "react-native-screens";
import {useEffect, useState} from "react";
import {TasksCards} from "../components/TasksCards";

interface TasksScreenProps {
  updateTasks?: boolean
  setUpdateTasks?: (isVisible: boolean) => void;
}

export default function TasksScreen({updateTasks, setUpdateTasks}: TasksScreenProps) {

  const [search, setSearch] = useState("");

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return(
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          onChangeText={updateSearch}
          style={styles.searchBar}
          placeholder={"Buscar"}
        />
        <SearchBar />
      </View>
      <View style={styles.cardsContainer}>
        <TasksCards updateTasks={updateTasks} setUpdateTasks={setUpdateTasks} searchQuery={search}/>
      </View>
    </View>
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