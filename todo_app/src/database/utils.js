import firebase from 'firebase/app';
import 'firebase/database';
import {firebaseConfig} from './config'

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
  
export {db}