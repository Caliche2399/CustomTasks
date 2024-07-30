import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export type AddTaskType = {
  id: string,
  title: string,
  description: string,
  status: string,
  duration: number,
  createdAt: firebase.firestore.Timestamp,
}

export interface AddTaskFormProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  setUpdateTasks?: (isVisible: boolean) => void;
  formTitle: string;
}

export interface CardDetailsProps {
  showDetails: boolean;
  setShowDetails: (isVisible: boolean) => void;
  element: AddTaskType;
}

export interface RemoveTaskProps {
  showRemove: boolean;
  setShowRemove: (isVisible: boolean) => void;
  element: AddTaskType;
}

export const STATUS_LIST = [
  { label: 'Pendiente', value: 'Pending' },
  { label: 'En Progreso', value: 'Progress' },
  { label: 'Completada', value: 'Completed' },
]