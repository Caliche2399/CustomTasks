import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import {AddTaskType} from "./src/types/TaskTypes";

const firebaseConfig = {
  apiKey: "AIzaSyArLWGEVxeapqd_SiMagJ2EGPp0qpTjKhk",
  authDomain: "customtasks-da682.firebaseapp.com",
  projectId: "customtasks-da682",
  storageBucket: "customtasks-da682.appspot.com",
  messagingSenderId: "991443922525",
  appId: "1:991443922525:web:1a68ea70b137516c3367b4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export const addTaskToFirebase = async (taskTitle: string, taskDescription: string, duration:number) => {

  const newTask = {
    title: taskTitle,
    description: taskDescription,
    duration: duration,
    status: "Pending",
    createdAt: new Date(),
  };

  try {
    const taskCollection = collection(db, "Tasks");
    const docRef = await addDoc(taskCollection, newTask);
    console.log("Se creo la tarea con el ID: ", docRef.id);
    return {success: true, id: docRef.id};

  } catch (error) {
    console.error(error);
    return { success: false, error: error };
  }
};

export const getAllTasks = async () => {
  const taskCollection = collection(db, "Tasks");
  const taskSnapshot = await getDocs(taskCollection);
  const taskList: AddTaskType[] = taskSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    duration: (doc.data().duration as unknown as number),
  } as AddTaskType));

  return taskList;
};

export const updateTask = async (taskId: string, updatedTask: Partial<AddTaskType>) => {
  try {
    const taskRef = doc(db, "Tasks", taskId);
    await updateDoc(taskRef, updatedTask);
    console.log(`Tarea con el ID: ${taskId} ha sido exitosamente actualizada`);
  } catch (error) {
    console.error("Error actualizando la tarea: ", error);
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const taskRef = doc(db, "Tasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    throw error
  }
}