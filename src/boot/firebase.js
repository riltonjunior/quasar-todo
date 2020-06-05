import * as firebase from 'firebase/app'

import 'firebase/auth'
// import 'firebase/firestore'

const firebaseConfig = {
  
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

const firebaseAuth = firebaseApp.auth()

export { firebaseAuth }
