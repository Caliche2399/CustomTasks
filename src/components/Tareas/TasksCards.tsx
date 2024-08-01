import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, Text, ActivityIndicator} from 'react-native';
import {Card, Title, IconButton, Portal} from 'react-native-paper';
import {AddTaskType} from "../../types/TaskTypes";
import {TaskEditor} from "./TaskEditor";
import {getAllTasks} from "../../../firebaseConfig";
import {showDeleteToast} from "../../alerts/showToats";
import {Divider} from "react-native-elements";

interface TasksCardsProps {
  searchQuery: string;
  updateTasks?: boolean;
  setUpdateTasks?: (isVisible: boolean) => void;
}

export const TasksCards = (props: TasksCardsProps) => {

  const [showDetails, setShowDetails] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [selectedCard, setSelectedCard] = useState<AddTaskType | null>(null);
  const [cards, setCards] = useState<AddTaskType[]>([]);
  const [loading, setLoading] = useState(false);
  let updateTasks = false;

  const fetchTasks = async () => {
    const response = await getAllTasks();
    setCards(response);
    if(props.setUpdateTasks){
      props.setUpdateTasks(false);
    }
  }

  useEffect(() => {
    if (selectedCard && deleteTask && props.setUpdateTasks) {
      showDeleteToast(selectedCard, setDeleteTask, props.setUpdateTasks, setShowDetails);
    }
  }, [deleteTask]);

  if (props.updateTasks){
    updateTasks = true
  }

  useEffect(() => {
    setLoading(true);
    fetchTasks().then(() => {setLoading(false)})
  }, [updateTasks]);

  const statusOrder: Record<string, number> = {
    'Pending': 1,
    'Completed': 3,
    'In Progress': 2,
  };

  const filteredCards = cards.filter(
    (card) => card?.title?.toLowerCase().includes(props.searchQuery?.toLowerCase() ?? "")
  ).sort((a, b) => {
    // Primero ordenar por estado
    const sortByStatus = statusOrder[a.status] - statusOrder[b.status];

    // Si el resultado de ordenar por estado es 0 (es decir, ambos elementos tienen el mismo estado), entonces ordenar alfabéticamente por título
    if (sortByStatus === 0) {
      return a.title.localeCompare(b.title); // El método localeCompare compara cadenas alfabéticamente
    }

    return sortByStatus; // Retorna la comparación del estado si los estados no son iguales
  });

  if (loading){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <>
      <ScrollView>
      {filteredCards.length === 0 ? (
        <View style={cardStyles.noTasksView}>
          <Text style={cardStyles.noTasksText}>No Hay Tareas</Text>
        </View>
      ) : (
        filteredCards.map((card, index) => (
          <>
            <Card key={card.id}
                  style={[cardStyles.cardStyle, card.status === 'Completed' ? cardStyles.completedStyle : {}]}
                  onPress={() => {
                    setSelectedCard(card);
                    setShowDetails(true)}}
            >
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Card.Content style={{flexShrink: 1}}>
                  <Title style={{marginTop: 15, fontSize: 18, color: 'black'}}>{card.title}</Title>
                </Card.Content>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <IconButton
                    icon="pencil"
                    style={{marginTop: 15}}
                    iconColor={card.status === "Completed" ? "green" : "#efae35"}
                    size={20}
                    onPress={() => {
                      setSelectedCard(card);
                      setShowDetails(true)}}
                  />
                  <IconButton
                    icon="delete"
                    style={{marginTop: 15}}
                    iconColor={'red'}
                    size={20}
                    onPress={() => {
                      setSelectedCard(card);
                      setDeleteTask(true)
                    }}
                  />
                </View>
              </View>
            </Card>
            <Divider style={{marginBottom:15}} width={1} />
          </>
        ))
      )}
    </ScrollView>
    <Portal>
      <TaskEditor task={selectedCard!} isVisible={showDetails} setIsVisible={setShowDetails} setUpdateTasks={props.setUpdateTasks}/>
    </Portal>
    </>
  );
};

const cardStyles = StyleSheet.create({
  cardStyle: {
    marginRight: 2,
    marginLeft: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 0,
    borderWidth: 0.5,
    borderColor: "#efae35"
  },
  completedStyle: {
    borderWidth: 1,
    borderColor: '#75C100'
  },
  noTasksView:{
    width: '100%',
    height: 440,
    justifyContent: 'center'
  },
  noTasksText:{
    fontSize: 18,
    textAlign: 'center'
  }
})