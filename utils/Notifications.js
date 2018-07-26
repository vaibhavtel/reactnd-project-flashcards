import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";
import { NOTIFICATIONS_KEY } from "./Constants";

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATIONS_KEY).then(Notifications.cancelAllScheduledNotificationsAsync());
}

function createNotification() {
    return {
        title: "Reminder!",
        body: " Take your flashcard quiz today",
        ios: {
            sound: true
        },
        android: {
            sound: true
        }
    };
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATIONS_KEY).then(JSON.parse).then((data) => {
        if (data === null || data === false) {
            Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                if (status === "granted") {
                    Notifications.cancelAllScheduledNotificationsAsync();

                    const date = new Date();
                    date.setDate(date.getDate() + 1);
                    date.setHours(10);
                    date.setMinutes(30);

                    Notifications.scheduleLocalNotificationAsync(createNotification(), {
                        time: date,
                        repeat: "day"
                    });
                    AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
                }
            });
        }
    });
}
