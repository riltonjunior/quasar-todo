<template>
  <div>
    <!-- <button @click="start">Start</button>
    <button @click="stop">Stop</button>
    <button @click="reset">Reset</button> -->
    {{formattedElapsedTime}}
  </div>
</template>

<script>
export default {
  name: 'Timer',
  data () {
    return {
      elapsedTime: 0,
      timer: undefined
    }
  },
  computed: {
    formattedElapsedTime () {
      const date = new Date(null)
      date.setSeconds(this.elapsedTime / 1000)
      const utc = date.toUTCString()
      return utc.substr(utc.indexOf(':') - 2, 8)
    }
  },
  methods: {
    start () {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000
      }, 1000)
    },
    stop () {
      clearInterval(this.timer)
    },
    reset () {
      this.elapsedTime = 0
    }
  },
  created () {
    this.start()
  },
  beforeDestroy () {
    this.stop()
  }
}
</script>
