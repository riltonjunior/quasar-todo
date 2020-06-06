/* eslint-disable no-empty-pattern */
import { firebaseAuth, db, firebase } from 'boot/firebase'
import { LocalStorage, Loading } from 'quasar'
import { showErrorMessage } from 'src/functions/function-show-error-message'

export function registerUser ({}, payload) {
  Loading.show()
  firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      console.log('Response: ', response)
    })
    .catch(error => {
      var errorCode = error.code
      var errorMessage = error.message
      if (errorCode === 'auth/weak-password') {
        showErrorMessage('Sua senha é muito fraca.')
      } else {
        showErrorMessage(errorMessage)
      }
    })
}
export function loginUser ({}, payload) {
  Loading.show()
  firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      console.log('Response: ', response)
    })
    .catch(error => {
      var errorCode = error.code
      var errorMessage = error.message
      if (errorCode === 'auth/wrong-password') {
        showErrorMessage('Senha errada.')
      } else {
        showErrorMessage(errorMessage)
      }
    })
}
export function logoutUser ({}, payload) {
  Loading.show()
  firebaseAuth.signOut()
    .then(response => {
      console.log('Response: ', response)
    })
    .catch(error => {
      showErrorMessage(error.message)
    })
}
export function handleAuthStateChange ({ commit }) {
  firebaseAuth.onAuthStateChanged(user => {
    Loading.hide()
    if (user) {
      const setUser = {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
        email: user.email,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      }
      db.collection('users')
        .doc(setUser.id)
        .set(setUser)
      commit('SET_LOGGED_IN', true)
      commit('SET_USER', setUser)
      LocalStorage.set('loggedIn', true)
      // eslint-disable-next-line handle-callback-err
      this.$router.push('/').catch(err => {})
    } else {
      commit('SET_LOGGED_IN', false)
      commit('SET_USER', null)
      LocalStorage.set('loggedIn', false)
      // eslint-disable-next-line handle-callback-err
      this.$router.replace('/auth').catch(err => {})
    }
  })
}
