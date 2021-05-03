<template>
  <v-app>
    <v-snackbar
      v-if="toast"
      v-model="toast.show"
      :color="toast.color"
      :right="true"
      :top="true"
    >
      {{ toast.message }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="toast.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import mixins from './mixins/global';
import axios from 'axios'
export default {
  name: 'App',
  mixins: [mixins],
  computed: {
    ...mapGetters(['getToast', 'getLogoutUser']),
  },

  created() {
    axios.interceptors.response.use(
    response => {
      console.log(response)
      return response;
    },
    err => {
      return new Promise((resolve, reject) => {
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          console.log("Invalid Token")
          this.$router.push('/account')
          reject(err)
        }
        throw err;
      });
    }
  )
  },

  watch: {
    getToast(val) {
      if (val) {
        this.toast = val;
      }
    },
    getLogoutUser(val) {
      if (val) {
        this.removeUser();
        this.$router.push({ path: '/login' });
      }
    },
  },
  data: () => ({
    toast: null,
    //
  })
};
</script>
