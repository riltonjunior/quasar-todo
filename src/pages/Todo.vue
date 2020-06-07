<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <AddTask></AddTask>
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
      <EditTask></EditTask>
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
            @click.stop="openEdit(index)"
            flat
            round
            color="primary"
            icon="edit"
            dense
          />
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
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import * as moment from 'moment'
import 'moment-duration-format'
import 'moment/locale/pt-br'
import Timer from '../components/Timer.vue'
import EditTask from '../components/EditTask.vue'
import AddTask from '../components/AddTask.vue'

export default {
  name: 'Todo',
  components: {
    Timer,
    EditTask,
    AddTask
  },
  data () {
    return {
      timing: false,
      openDialog: false
    }
  },
  watch: {
    tasks (val, oldVal) {
      // console.log('new: %s, old: %s', val, oldVal)
      console.log(val)
      // console.log(oldVal)
    }
  },
  computed: {
    ...mapState('tasks', ['tasks']),
    ...mapFields('tasks', ['tasks.done'])
  },
  methods: {
    ...mapActions('tasks', ['deleteTask', 'doneTask', 'startTracking', 'stopTracking']),
    openEdit (index) {
      this.$q.dialog({
        component: EditTask,
        parent: this,
        task: index
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
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
