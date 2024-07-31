import * as Notifications from "expo-notifications";

export const initializeNotifications = async () => {
  await Notifications.requestPermissionsAsync()
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    })
  })
}

export const scheduleNotification = (title:string, body: string, seconds?:number) =>{
  Notifications.scheduleNotificationAsync({
    content: {title, body},
    trigger: seconds ===undefined ? null : {seconds},
  })
}