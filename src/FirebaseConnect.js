import {initializeApp} from "firebase/app"
import {getFirestore} from "@firebase/firestore"
const firebaseConnect = {
    apiKey: "AIzaSyAQQzZwi7jfSq5elYPIiqr0j4sQYej6wNg",
    authDomain: "avfinal-72900.firebaseapp.com",
    projectId: "avfinal-72900",
    storageBucket: "avfinal-72900.appspot.com",
    messagingSenderId: "628630720383",
    appId: "1:628630720383:web:e36ca96b81b7ea9847544a"
}

const app = initializeApp(firebaseConnect);
export const db = getFirestore(app);