<template>
  <q-page class="bg-grey-3 column">
      <LoginRegister tab='login'></LoginRegister>
  </q-page>
</template>

<script>
import LoginRegister from '../components/auth/LoginRegister'
export default {
  name: 'Auth',
  components: {
    LoginRegister
  }
}
</script>
