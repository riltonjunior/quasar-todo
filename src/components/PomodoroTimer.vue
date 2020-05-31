<template>
  <div class="timer">
    <span class="minute">{{ minutes }}</span>
    <span>:</span>
    <span class="seconds">{{ seconds }}</span>
  </div>
</template>

<script>
export default {
  name: "PomodoroTimer",
  data() {
    return {
      timer: null,
      totalTime: 25 * 60,
      resetButton: false,
      title: "Countdown to rest time!",
      edit: false,
      userTime: 25
    }
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000) //1000ms = 1 second
      this.resetButton = true
      this.edit = false
    },
    stopTimer() {
      clearInterval(this.timer)
      this.timer = null
      this.resetButton = true
    },
    resetTimer() {
      this.totalTime = this.userTime * 60
      clearInterval(this.timer)
      this.timer = null
      this.resetButton = false
    },
    editTimer() {
      this.edit = !this.edit
    },
    padTime: function(time) {
      return (time < 10 ? "0" : "") + time
    },
    countdown() {
      this.totalTime--
    }
  },
  computed: {
    minutes() {
      const minutes = Math.floor(this.totalTime / 60)
      return this.padTime(minutes)
    },
    seconds() {
      const seconds = this.totalTime - this.minutes * 60
      return this.padTime(seconds)
    }
  }
}
</script>

<style>
</style>
