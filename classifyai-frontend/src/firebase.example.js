import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        const token = await getToken(messaging, { vapidKey: 'YOUR_MESSAGING_SENDER_ID' })
        console.log("TOKEN GENERATED FOR FIREBASE", token);
        console.log("Notification permission granted.");
    } else {
        console.log("Unable to get permission to notify.");
    }
}

requestPermission();

