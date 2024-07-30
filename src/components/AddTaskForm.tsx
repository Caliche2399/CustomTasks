import {Alert, StyleSheet, Text, TextInput, View} from "react-native";
import {Button, Dialog, Icon, Slider} from "react-native-elements";
import {useState} from "react";
import {AddTaskFormProps} from "../types/TaskTypes";
import {addTaskToFirebase} from "../../firebaseConfig";
import {ALERT_TYPE} from 'react-native-alert-notification';
import showToast from "../alerts/showToats";

export const AddTaskForm = (props:AddTaskFormProps) => {

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [duration, setDuration] = useState(0);

  const clearOptions = () =>{
    setTaskTitle("");
    setTaskDescription("");
    setDuration(0);
  }

  const handleSubmit = () => {

    addTaskToFirebase(taskTitle, taskDescription, duration)
      .then((response) => {
        if (response && response.success) {
          showToast(ALERT_TYPE.SUCCESS, 'Tarea Creada', `Se creo la tarea ${response.id} de manera exitosa`)
          clearOptions()
          if(props.setUpdateTasks){
            props.setUpdateTasks(true);
          }
        } else {
          throw Error;
        }
      })
      .catch((error) => {
        showToast(ALERT_TYPE.DANGER, 'Error', 'Hubo un error inesperado. Inténtalo de nuevo')
        console.error("Error inesperado: ", error);
      });
  }

  return (
    <Dialog style={styles.dialog} isVisible={props.isVisible} onBackdropPress={() => props.setIsVisible(false)}>
      <Dialog.Title title={props.formTitle}/>
      <View style={{marginTop: 20}}>
        <Text style={styles.customLabel}>Titulo</Text>
        <TextInput
          autoFocus={true}
          style={styles.titleInput}
          value={taskTitle}
          onChangeText={setTaskTitle}/>

        <Text style={styles.customLabel}>Descripcion</Text>
        <TextInput
          style={styles.textArea}
          multiline={true}
          numberOfLines={5}
          value={taskDescription}
          onChangeText={setTaskDescription}
        />

        <Text style={styles.customLabel}>{`Duracion (${duration}) días`}</Text>
        <Slider
          value={duration}
          onValueChange={setDuration}
          thumbTintColor={'#65b601'}
          thumbStyle={styles.sliderButton}
          maximumValue={15}
          minimumValue={0}
          step={1}
          allowTouchTrack/>

        <Button
          icon={
            <Icon
              name="plus"
              size={15}
              color="white"
              type="font-awesome"
            />
          }
          title="   Agregar"
          buttonStyle={styles.button}
          iconContainerStyle={styles.containerStyle}
          onPress={handleSubmit}
        />
        <Button
          icon={
            <Icon
              name="close"
              size={15}
              color="white"
              type="font-awesome"
            />
          }
          title="   Cancelar"
          buttonStyle={styles.buttonClose}
          iconContainerStyle={styles.containerStyle}
          onPress={() => {props.setIsVisible(false); clearOptions()}}
        />
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 50,
    fontSize: 30,
  },
  textArea: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  customLabel: {
    marginBottom:2,
  },
  titleInput:{
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginTop: 2,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#65b601',
    borderWidth: 1,
    borderColor: 'transparent',
    paddingLeft: 10,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 0,
  },
  buttonClose: {
    width: '100%',
    backgroundColor: '#9f2121',
    borderWidth: 1,
    borderColor: 'transparent',
    paddingLeft: 10,
    borderRadius: 50,
    marginTop: 18,
    marginBottom: 0,
  },
  containerStyle: {
    marginRight: 10
  },
  dialog: {
    width: '70%',
    height: 200,
  },
  sliderButton:{
    height: 20,
    width: 20,
  }
});