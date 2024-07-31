import React, {useEffect, useState} from 'react';
import {Button, CheckBox, Dialog, Icon, Slider} from 'react-native-elements';
import {AddTaskType, STATUS_LIST} from '../types/TaskTypes';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {updateTask} from "../../firebaseConfig";
import showToast from "../alerts/showToats";
import {ALERT_TYPE} from "react-native-alert-notification";

interface TaskEditorProps {
  task: AddTaskType;
  setUpdateTasks?: (isVisible: boolean) => void;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const TaskEditor = (props: TaskEditorProps) => {

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [editing, setEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleCancel = () => {
    props.setIsVisible(false);
    if(props.setUpdateTasks) {
      props.setUpdateTasks(true);
    }
  };

  useEffect(() => {
    if (props.task) {
      setTaskTitle(props.task.title);
      setTaskDescription(props.task.description);
      setDuration(props.task.duration);
      setSelectedOption(props.task.status);
    }
  }, [props.task]);

  const handleConfirm = () => {

    const updatedTask: Partial<AddTaskType> = {
      title: taskTitle,
      description: taskDescription,
      duration: duration,
      status: selectedOption
    };

    updateTask(props.task.id, updatedTask)
      .then((response) => {
        if (response && response.success) {
          showToast(ALERT_TYPE.SUCCESS, 'Tarea Actualizada', 'La tarea fue actualizada con exito.')
          if(props.setUpdateTasks){
            props.setUpdateTasks(true);
            setEditing(false)
          }
        } else {
          throw Error;
        }
      })
      .catch((error) => {
        showToast(ALERT_TYPE.DANGER, 'Error', `Hubo un error al actualizar la tarea Inténtalo de nuevo ${error}`)
      });

  }

  return (
    <Dialog
      isVisible={props.isVisible}
      onBackdropPress={handleCancel}
      style={styles.dialog}
    >
      <Dialog.Title title={"Editar"}/>
      <View style={{marginTop: 20}}>
        <Text style={styles.customLabel}>Titulo</Text>
        <TextInput
          editable={editing}
          autoFocus={true}
          style={styles.titleInput}
          value={taskTitle}
          onChangeText={setTaskTitle}/>

        <Text style={styles.customLabel}>Descripcion</Text>
        <TextInput
          editable={editing}
          style={styles.textArea}
          multiline={true}
          numberOfLines={5}
          value={taskDescription}
          onChangeText={setTaskDescription}
        />

        <Text style={styles.customLabel}>Status</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:40}}>
          {STATUS_LIST.map((status, index) => (
            <View>
              <CheckBox
                key={index}
                disabled={!editing}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={"#75C100"}
                checked={selectedOption === status.value}
                onPress={() => setSelectedOption(status.value)}
              />
              <Text>{status.label}</Text>
            </View>
          ))}
        </View>


        <Text style={styles.customLabel}>{`Duracion (${duration}) días`}</Text>
        <Slider
          disabled={true}
          value={duration}
          onValueChange={setDuration}
          thumbTintColor={'#65b601'}
          thumbStyle={styles.sliderButton}
          maximumValue={15}
          minimumValue={0}
          step={1}
          allowTouchTrack={false}
        />

        {!editing ? (
          <>
            <Button
              title="  Editar"
              icon={
                <Icon
                  name="pencil"
                  size={15}
                  color="white"
                  type="font-awesome"
                />
              }
              buttonStyle={styles.button}
              iconContainerStyle={styles.containerStyle}
              onPress={() => setEditing(true)}
            />
            <Button
              title="   Salir"
              icon={
                <Icon
                  name="close"
                  size={15}
                  color="white"
                  type="font-awesome"
                />
              }
              buttonStyle={styles.buttonClose}
              iconContainerStyle={styles.containerStyle}
              onPress={() => props.setIsVisible(false)}
            />
          </>
        ) : (
          <>
            <Button
              icon={
                <Icon
                  name="plus"
                  size={15}
                  color="white"
                  type="font-awesome"
                />
              }
              title="   Confirmar"
              buttonStyle={styles.button}
              iconContainerStyle={styles.containerStyle}
              onPress={handleConfirm}
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
              onPress={() => setEditing(false)}
            />
          </>
        )}
      </View>
    </Dialog>
  );
};

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
  },
  selectStyle: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 2,
    marginBottom: 20,
  }
});