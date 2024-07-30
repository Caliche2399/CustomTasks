import {Button, Modal} from 'react-native-paper';
import {CardDetailsProps} from "../types/TaskTypes";
import {useState} from "react";
import {StyleSheet, TextInput, View} from "react-native";

export const CardDetails = (props: CardDetailsProps) => {

  const [editing, setEditing] = useState(false);

  if (!props.element) {
    return null;
  }

  return (
    <Modal visible={props.showDetails} onDismiss={()=> props.setShowDetails(false)}>
      <View>
        <TextInput editable={editing}>{props.element.title}</TextInput>
        <TextInput editable={editing}>{props.element.description}</TextInput>
        <TextInput editable={editing}>{props.element.createdAt.toDate().toLocaleDateString('es-es')}</TextInput>
        <Button onPress={() => props.setShowDetails(false)}>Salir</Button>
        <Button onPress={() => setEditing(true)}>Editar</Button>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({

})