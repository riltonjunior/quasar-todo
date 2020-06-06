import { updateField } from 'vuex-map-fields'

export function ADD_TASK (state, task) {
  state.tasks = [
    ...state.tasks,
    task
  ]
}
export function DELETE_TASK (state, task) {
  // const maxLenght = state.tasks.length
  // console.log('max:', maxLenght)
  // console.log('task:', task)
  // state.tasks = state.tasks.splice(task)
  console.log(state.tasks[task])
}
export function EDIT_TASK (state, task) {
  console.log(state.tasks[task])
}

export function SET_TRACKING (state, payload) {
  // if (state.tasks[task].running) {
  //   state.tasks[task].running = false
  // } else {
  state.running = payload.set
  state.tasks[payload.i].running = payload.set
  // }
}
export function START_TRACKING (state, task) {
  if (!state.tasks[task].timeStarted) {
    state.tasks[task].timeStarted = Date.now()
  }
}
export function STOP_TRACKING (state, task) {
  if (!state.tasks[task].timeStopped) {
    state.tasks[task].timeStopped = Date.now()
  }
}
export function SET_TIME_DURATION (state, task) {
  state.tasks[task].timeDuration += (state.tasks[task].timeStopped - state.tasks[task].timeStarted)
}

export { updateField }
