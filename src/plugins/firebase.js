import firebase from 'firebase/app';

const firebaseConf = {
  apiKey: 'AIzaSyDYi_BsEEeqUq0IqpXfJWCqGyeJkH_m8T8',
  authDomain: 'challenge-etus.firebaseapp.com',
  databaseURL: 'https://challenge-etus.firebaseio.com',
  projectId: 'challenge-etus',
  storageBucket: 'challenge-etus.appspot.com',
  messagingSenderId: '31986673268',
  appId: '1:31986673268:web:1f2d9fd88d497c59205321'
};

export default ({ Vue }) => {
  firebase.initializeApp(firebaseConf);
  Vue.prototype.$firebase = firebase;
};


// import firebase from 'firebase';

// const config = {
//   apiKey: 'AIzaSyDYi_BsEEeqUq0IqpXfJWCqGyeJkH_m8T8',
//   authDomain: 'challenge-etus.firebaseapp.com',
//   databaseURL: 'https://challenge-etus.firebaseio.com',
//   projectId: 'challenge-etus',
//   storageBucket: 'challenge-etus.appspot.com',
//   messagingSenderId: '31986673268',
//   appId: '1:31986673268:web:1f2d9fd88d497c59205321'
// };
// const fireApp = firebase.initializeApp(config);
// export const AUTH = fireApp.auth();

// export default ({ Vue }) => {
//   Vue.prototype.$firebase = firebase;
//   Vue.prototype.$auth = AUTH;
// };
