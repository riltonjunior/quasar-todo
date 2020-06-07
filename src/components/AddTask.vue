<template>
  <q-input
        v-model="newTask.title"
        @keyup.enter="addTask(newTask)"
        square
        filled
        class="col"
        bg-color="white"
        placeholder="Adicionar tarefa"
        sanitize
        dense
        >
        <template v-slot:append>
            <q-select v-model="newTask.cat" :options="categories" multiple dense stack-label use-chips style="width: 120px">
                 <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section>
                            <q-item-label v-html="scope.opt.title" />
                        </q-item-section>
                    </q-item>
                </template>
                <template v-slot:selected-item="scope">
                    <q-chip
                        removable
                        dense
                        @remove="scope.removeAtIndex(scope.index)"
                        :tabindex="scope.tabindex"
                        color="white"
                        text-color="primary"
                        class="q-ma-none"
                    >
                        <q-avatar color="primary" text-color="white" icon="edit" />
                        <div  v-if="$q.platform.is.desktop">
                            {{ scope.opt.title }}
                        </div>
                    </q-chip>
                </template>
            </q-select>
            <q-btn
            @click="addTask(newTask)"
            round
            dense
            flat
            icon="add"
            />
        </template>
    </q-input>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AddTask',
  data () {
    return {
      newTask: {
        title: '',
        cat: []
      },
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  },
  computed: {
    ...mapState('tasks', ['tasks']),
    ...mapState('categories', ['categories'])
  },
  methods: {
    ...mapActions('tasks', ['addTask'])
  }
}
</script>

<style lang="scss">

</style>
