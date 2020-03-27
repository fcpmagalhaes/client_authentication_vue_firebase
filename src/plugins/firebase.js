import firebase from 'firebase/app';
import firebaseConf from './firebase_conf.js';

export default ({ Vue }) => {
  firebase.initializeApp(firebaseConf);
  Vue.prototype.$firebase = firebase;
};
