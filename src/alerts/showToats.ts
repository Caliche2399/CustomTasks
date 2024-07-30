import {ALERT_TYPE} from 'react-native-alert-notification';
import {Dialog as rnDialog} from 'react-native-alert-notification';
import {AddTaskType} from "../types/TaskTypes";
import {Dispatch, SetStateAction} from 'react';
import {deleteTask} from "../../firebaseConfig";

export default function showToast(type: ALERT_TYPE, title: string, textBody: string) {
  rnDialog.show({
    type: type,
    title: title,
    textBody: textBody,
    button: "Cerrar",
  });
}

export function showDeleteToast(element: AddTaskType, setBooleanState: Dispatch<SetStateAction<boolean>> ) {

  rnDialog.show({
    type: ALERT_TYPE.WARNING,
    title: 'Eliminar',
    textBody: `¿Desea eliminar la tarea ${element.title}?`,
    button: "Eliminar",
    onPressButton: async () => {
      try {
        await deleteTask(element.id);
        showToast(ALERT_TYPE.SUCCESS, 'Eliminada', 'La tarea se elimino exitosamente');
      } catch (error) {
        showToast(ALERT_TYPE.DANGER, 'UPS!', 'Hubo un error al eliminar la tarea.')
      } finally {
        setBooleanState(false);
      }
    },
    onHide: () => { setBooleanState(false)}
  });
}