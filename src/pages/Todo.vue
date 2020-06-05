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
        v-if="task.timeDuration !== 0 && !task.running"
        side
        >
         {{ task.timeDuration | durationFormat }}
        </q-item-section>

        <q-item-section
        v-if="task.running"
        side
        >
        <Timer />
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
          >
          <q-icon
            name="fiber_manual_record" class="record-badge absolute-top-right text-red"
          />
          </q-btn>
        </q-item-section>

        <q-item-section
        v-if="task.done && !task.running"
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
import * as moment from 'moment'
import 'moment-duration-format'
import 'moment/locale/pt-br'
import Timer from '../components/Timer.vue'

export default {
  name: 'Todo',
  components: {
    Timer
  },
  data () {
    return {
      /* Task */
      newTask: '',
      timing: false,
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
          timeStarted: 1590966264096,
          timeStopped: 1590966276274,
          timeDuration: 12178,
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
    tasks (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
      console.log(this.timeDuration)
    }
  },
  methods: {
    deleteTask (index) {
      this.$q.dialog({
        title: 'Você tem certeza?',
        message: 'Ao apagar esta tarefa não será mais possível resgatá-la.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.tasks.splice(index, 1)
        this.$q.notify({ type: 'positive', message: 'Tarefa apagada com sucesso.' })
      })
    },
    addTask () {
      if (this.newTask === '') {
        this.$q.notify({ type: 'warning', message: 'Dê um nome a tarefa para adicioná-la.' })
      } else {
        this.tasks.push({
          title: this.newTask,
          done: false,
          createdAt: Date.now(),
          timeStarted: '',
          timeStopped: '',
          timeDuration: 0,
          running: false
        })
        this.$q.notify({ type: 'positive', message: 'Tarefa adicionada com sucesso.' })
        this.newTask = ''
      }
    },
    startTracking (index) {
      if (this.timing === true) {
        this.$q.notify({ type: 'error', message: 'Você deve parar a tarefa em andamento para iniciar outra tarefa.' })
      } else {
        const tasksRef = this.tasks[index]
        if (!tasksRef.timeStarted) {
          tasksRef.timeStarted = Date.now()
        }
        tasksRef.running = true
        this.timing = true
        this.$q.notify({ type: 'info', message: 'Registro de tempo iniciado.' })
      }
    },
    stopTracking (index) {
      const tasksRef = this.tasks[index]
      if (!tasksRef.timeStopped) {
        tasksRef.timeStopped = Date.now()
      }
      tasksRef.timeDuration += (tasksRef.timeStopped - tasksRef.timeStarted)
      tasksRef.running = false
      this.timing = false
      this.$q.notify({ type: 'info', message: 'Registro de tempo parado.' })
    }
  },
  filters: {
    secondsAgo (value) {
      return moment(value).fromNow()
    },
    durationFormat (value) {
      // eslint-disable-next-line import/namespace
      return moment.duration(value, 'milliseconds').format('d[d] h[h] m[m] s[s]', { trim: 'both' })
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
@keyframes record-badge{
  0%{
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}

.record-badge{
    animation-name: record-badge;
    animation-duration: 2000ms;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    font-size: 0.8rem !important;
    top: 2px;
    right: 2px
}
</style>
