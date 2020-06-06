<template>
  <q-dialog ref="dialog" @hide="onDialogHide" v-if="tasks[id]">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">Editar tarefa</div>
      </q-card-section>

      <q-card-section>
        <q-list>
            <q-item clickable v-ripple>
                <q-item-section>
                    <q-item-label lines="1">
                        {{tasks[id].title}}
                        <q-popup-edit v-model="tasks[id].title" :validate="val => val.length > 5">
                            <template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
                            <q-input
                                color="primary"
                                autofocus
                                dense
                                :value="tasks[id].title"
                                :rules="[
                                val => validate(value) || 'More than 5 chars required'
                                ]"
                                @input="emitValue"
                                counter>
                                <template v-slot:after>
                                    <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel" />
                                    <q-btn flat dense color="positive" icon="check_circle" @click.stop="set" :disable="validate(value) === false || initialValue === value" />
                                </template>
                            </q-input>
                            </template>
                        </q-popup-edit>
                    </q-item-label>
                    <q-item-label caption>Título</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-icon name="edit" color="green" />
                </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
            <q-item-section>
                <q-item-label lines="2">{{tasks[id].done ? 'Finalizada' : 'Não finalizada'}}</q-item-label>
                <q-item-label caption>Status</q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-icon name="close" color="red" />
            </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
            <q-item-section>
            <q-item-label lines="3">{{tasks[id].createdAt | secondsAgo}}</q-item-label>
            <q-item-label caption>Data da criação</q-item-label>
            </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
            <q-item-section>
            <q-item-label lines="4">{{onTimeDuration() | durationFormat}}</q-item-label>
            <q-item-label caption>Duração</q-item-label>
            </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
            <q-item-section>
            <q-item-label lines="5">{{tasks[id].description ? tasks[id].description : 'Sem descrição' }}</q-item-label>
            <q-item-label caption>Descrição</q-item-label>
            </q-item-section>
            </q-item>

        </q-list>
      </q-card-section>

      <!-- <q-separator dark /> -->
      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
import * as moment from 'moment'
import 'moment-duration-format'
import 'moment/locale/pt-br'

export default {
  props: ['task'],
  data () {
    return {
      id: this.task
    }
  },
  computed: {
    ...mapState('tasks', ['tasks']),
    ...mapFields('tasks', ['tasks'])
  },
  filters: {
    secondsAgo (value) {
      return moment(value).fromNow()
    },
    durationFormat (value) {
      // eslint-disable-next-line import/namespace
      return moment.duration(value, 'milliseconds').format('d[d] h[h] m[m] s[s]', { trim: 'both' })
    }
  },
  methods: {
    ...mapActions('tasks', ['deleteTask', 'editTask', 'doneTask', 'startTracking', 'stopTracking']),
    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$emit('hide')
    },

    onOKClick () {
      this.$emit('ok')
      this.hide()
    },

    onCancelClick () {
      this.hide()
    },
    onTimeDuration () {
      if (this.tasks[this.id].timeDuration > 0) {
        return this.tasks[this.id].timeDuration
      } else {
        return 'Tarefa não iniciada'
      }
    }
  }
}
</script>
