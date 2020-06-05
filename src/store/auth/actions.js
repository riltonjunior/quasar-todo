/* eslint-disable no-empty-pattern */
import { firebaseAuth } from 'boot/firebase'
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
        showErrorMessage('The password is too weak.')
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
        showErrorMessage('Wrong password.')
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
      commit('SET_LOGGED_IN', true)
      LocalStorage.set('loggedIn', true)
      // eslint-disable-next-line handle-callback-err
      this.$router.push('/').catch(err => {})
    } else {
      commit('SET_LOGGED_IN', false)
      LocalStorage.set('loggedIn', false)
      // eslint-disable-next-line handle-callback-err
      this.$router.replace('/auth').catch(err => {})
    }
  })
}
