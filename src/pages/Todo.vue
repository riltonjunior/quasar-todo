<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        square
        filled
        class="col"
        bg-color="white"
        placeholder="Adicionar tarefa"
        dense
        >
        <template v-slot:append>
          <q-btn
            @click="addTask"
            round
            dense
            flat
            icon="add"
          />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" separator bordered>
      <q-item 
        v-for="(task, index) in tasks"
        :key="task.title"
        @click="task.done = !task.done"
        :class="{ 'done bg-teal-1' : task.done }"
        v-ripple
        clickable
      >
        <q-item-section avatar>
          <q-checkbox 
            v-model="task.done" 
            color="primary" 
            class="no-pointer-events"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
           <q-item-label caption>
            {{ task.createdAt | secondsAgo }}
          </q-item-label>
        </q-item-section>

        <q-item-section
        v-if="task.timeDuration !== 0"
        side
        >
         {{ task.timeDuration | durationFormat }}
        </q-item-section>

        <q-item-section
        v-if="!task.done && !task.running"
        side
        >
          <q-btn 
            @click.stop="startTracking(index)"
            flat 
            round 
            color="primary" 
            icon="play_circle_filled" 
            dense
          />
        </q-item-section>
        
        <q-item-section
        v-if="!task.done && task.running"
        side
        >
          <q-btn 
            @click.stop="stopTracking(index)"
            flat 
            round 
            color="primary" 
            icon="pause_circle_filled" 
            dense
          />
        </q-item-section>

        <q-item-section
        v-if="task.done"
        side
        >
          <q-btn 
            @click.stop="deleteTask(index)"
            flat 
            round 
            color="primary" 
            icon="delete" 
            dense
          />
        </q-item-section>
  
      </q-item>
    </q-list>
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">
        Sem tarefas
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import * as moment from 'moment'
import 'moment/locale/pt-br'
import 'moment-duration-format'

export default {
  name: 'Todo',
  data () {
    return {
      /* Time Tracker */
      /* Task */
      newTask: '',
      tasks: [
        {
          title: 'Fazer as compras',
          done: false,
          createdAt: 1590953027638,
          timeStarted: '',
          timeStopped: '',
          timeDuration: 0,
          running: false

        },
        {
          title: 'Atualizar currículos',
          done: true,
          createdAt: 1590953072486,
          timeStarted: '',
          timeStopped: '',
          timeDuration: 0,
          running: false
        },
        {
          title: 'Estudar Vue.js',
          done: false,
          createdAt: 1590953092493,
          timeStarted: '',
          timeStopped: '',
          timeDuration: 0,
          running: false
        }
      ]
    }
  },
  watch: {
    tasks(val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
      console.log(this.timeDuration)
    }
  },
  methods: {
    deleteTask(index) {
      this.$q.dialog({
        title: 'Você tem certeza?',
        message: 'Ao apagar esta tarefa não será mais possível resgatá-la.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.tasks.splice(index, 1)
        this.$q.notify('Tarefa apagada');
      })
    },
    addTask() {
      this.tasks.push({
        title: this.newTask,
        done: false,
        createdAt: Date.now()
      })
      this.$q.notify('Tarefa adicionada');
      this.newTask = ''
    },
    startTracking(index) {
      if (!this.tasks[index].timeStarted) {
        this.tasks[index].timeStarted = Date.now()
      }
      this.tasks[index].running = true
      console.log(this.tasks[index])
    },
    stopTracking(index) {
      if (!this.tasks[index].timeStopped) {
        this.tasks[index].timeStopped = Date.now()
      }
      this.tasks[index].timeDuration += (this.tasks[index].timeStopped - this.tasks[index].timeStarted)
      this.tasks[index].running = false
      const timeDuration = this.tasks[index].timeDuration
      // console.log(moment.duration(timeDuration, 'milliseconds').format("d[d] h[h] m[m] s[s]", {trim: "both"}))
      console.log(timeDuration)
    }
  },
  filters: {
    secondsAgo(value) {
     return moment(value).fromNow()
    },
    durationFormat(value) {
     return moment.duration(value, 'milliseconds').format("d[d] h[h] m[m] s[s]", {trim: "both"})
    }
  }
}
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-tasks {
  opacity: .5;
}
</style>