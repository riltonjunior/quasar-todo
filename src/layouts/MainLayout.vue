<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">{{ $t('todo') }}</div>
        <div class="text-subtitle1">{{todaysDate}}</div>
      </div>
      <q-img src="statics/bg.jpg" class="header-image absolute-top" />

    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple to="/" exact>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                {{ $tc('task', 2) }}
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/help" exact>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                {{ $t('help') }}
              </q-item-section>
            </q-item>

            <q-item clickable v-if="loggedIn"  v-ripple to="/settings" exact>
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section>
                {{ $t('settings') }}
              </q-item-section>
            </q-item>

            <q-item v-ripple exact>
              <q-item-section avatar>
                <q-icon name="flag" />
              </q-item-section>

              <q-item-section>
                <LanguageSwitcher></LanguageSwitcher>
              </q-item-section>
            </q-item>

            <q-item clickable v-if="loggedIn" v-ripple @click="logoutUser" exact>
              <q-item-section avatar>
                <q-icon color="red" name="account_circle" />
              </q-item-section>

              <q-item-section>
                {{ $t('logout') }}
              </q-item-section>
            </q-item>

            <q-item clickable v-if="!loggedIn" v-ripple to="/auth" exact>
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>

              <q-item-section>
                {{ $t('register') }}
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top bg-primary custom-link" style="height: 192px;">
          <div v-if="loggedIn" class="absolute-bottom bg-transparent">
              <q-avatar size="56px" class="q-mb-sm">
                <q-icon v-if="!user.image" size="56px" name="account_circle" />
                <!-- <img v-if="!user.image" src="https://en.gravatar.com/userimage/2017002/3126ef9f54ee888ec006c44704b9bd77.jpeg"> -->
                <img v-if="user.image" :src="user.image">
              </q-avatar>
              <div class="text-weight-bold">{{ user.email }}</div>
              <a @click="logoutUser">{{ $t('logout') }}</a>
          </div>
          <div v-if="!loggedIn" class="absolute-bottom bg-transparent">
            <router-link to="/auth">
            <q-avatar size="56px" class="q-mb-sm">
              <q-icon size="56px" name="account_circle" />
            </q-avatar>
            <div class="text-weight-bold">{{ $t('login') }}</div>
            </router-link>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from 'quasar'
import { mapState, mapActions } from 'vuex'
import LanguageSwitcher from 'components/LanguageSwitcher'

export default {
  name: 'MainLayout',
  components: {
    LanguageSwitcher
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn']),
    ...mapState('auth', ['user']),
    todaysDate () {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd, DD MMMM')
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    userImg () {
      if (!this.user.image) {
        return 'statics/bg.jpg'
      }
    }
  }
}
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
.custom-link a {
  color:#FFF;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  &.router-link-exact-active.router-link-active {
    // opacity: .5;
  }
}
</style>
