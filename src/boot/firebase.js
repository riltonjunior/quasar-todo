import * as firebase from 'firebase/app'

import 'firebase/auth'
// import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCJVTGkyiwkuST0oBUorptAc4driQGCjGM',
  authDomain: 'planme-app.firebaseapp.com',
  databaseURL: 'https://planme-app.firebaseio.com',
  projectId: 'planme-app',
  storageBucket: 'planme-app.appspot.com',
  messagingSenderId: '456090756148',
  appId: '1:456090756148:web:916272f90a80a996e29661'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

const firebaseAuth = firebaseApp.auth()

export { firebaseAuth }
