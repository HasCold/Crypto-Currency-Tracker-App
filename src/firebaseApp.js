import firebaseConfig from "./config/firebaseConfig";
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Done initial configuration of firebase with react.js
export {auth, db};
