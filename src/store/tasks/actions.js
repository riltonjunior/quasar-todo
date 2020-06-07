/* eslint-disable no-empty-pattern */
import { showNotify } from 'src/functions/function-show-notify'
import { Dialog } from 'quasar'

export function addTask ({ commit }, payload) {
  if (payload.title === '') {
    showNotify('warning', 'Dê um nome a tarefa para adicioná-la.')
  } else {
    const task = {
      title: payload.title,
      done: false,
      createdAt: Date.now(),
      timeStarted: '',
      timeStopped: '',
      timeDuration: 0,
      description: '',
      categories: payload.cat,
      running: false
    }
    commit('ADD_TASK', task)
    showNotify('positive', 'Tarefa adicionada com sucesso.')
  }
}

export function deleteTask ({ commit }, payload) {
  Dialog.create({
    title: 'Você tem certeza?',
    message: 'Ao apagar esta tarefa não será mais possível resgatá-la.',
    cancel: true,
    persistent: true
  }).onOk(() => {
    // this.tasks.splice(payload, 1)
    commit('DELETE_TASK', payload)
    showNotify('positive', 'Tarefa apagada com sucesso.')
  })
}

export function editTask ({ commit, state }, index) {
  console.log('edit:', state.tasks[index])
}

export function startTracking ({ commit, state }, index) {
  if (state.running === true) {
    showNotify('error', 'Você deve parar a tarefa em andamento para iniciar outra tarefa.')
  } else {
    const payload = {
      set: true,
      i: index
    }
    commit('START_TRACKING', index)
    commit('SET_TRACKING', payload)
    showNotify('info', 'Registro de tempo iniciado.')
  }
}

export function stopTracking ({ commit, state }, index) {
  const payload = {
    set: false,
    i: index
  }
  commit('STOP_TRACKING', index)
  commit('SET_TRACKING', payload)
  commit('SET_TIME_DURATION', index)
  console.log(state.tasks[index].timeDuration)
  showNotify('info', 'Registro de tempo parado.')
}
