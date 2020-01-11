import { firebase } from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBBbMGMhjEIW4kOh7RHMRfIzWJ2KWoIsHY',
  authDomain: 'centicbids-898bd.firebaseapp.com',
  databaseURL: 'https://centicbids-898bd.firebaseio.com',
  projectId: 'centicbids-898bd',
  storageBucket: 'centicbids-898bd.appspot.com',
  messagingSenderId: '69519752190',
  appId: '1:69519752190:web:c62e70401c442a16755eaf',
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
