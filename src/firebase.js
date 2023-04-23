import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/database';


  firebase.initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

  export default firebase;  