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
        <!-- <q-item-section
        v-if="!task.done"
        side
        >
          <q-btn 
            @click.stop="startTracking(index)"
            flat 
            round 
            color="primary" 
            icon="alarm" 
            dense
          />
        </q-item-section> -->
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

export default {
  name: 'Todo',
  data () {
    return {
      newTask: '',
      tasks: [
        {
          title: 'Fazer as compras',
          done: false,
          createdAt: 1590953027638,
        },
        {
          title: 'Atualizar currículos',
          done: true,
          createdAt: 1590953072486
        },
        {
          title: 'Estudar Vue.js',
          done: false,
          createdAt: 1590953092493
        }
      ]
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
    }
  },
  filters: {
    secondsAgo(value) {
     return moment(value).fromNow()
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