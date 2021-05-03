<template>
  <div class="account">
    <AccountNavbar />
    <v-container>
      <v-row align="center" justify="center" class="mt-5">
        <v-col cols="12" md="6" v-if="loading">
          <v-alert type="warning">Please wait for a while we are authenticating you...</v-alert>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" class="mt-5">
        
        <v-col cols="12" md="6">
          <v-card raised shaped>
            <v-tabs v-model="tab" background-color="grey lighten-4" color="purple" grow>
              <v-tab>Login</v-tab>
              <v-tab>Register</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <Login @register="setTab" />
              </v-tab-item>
              <v-tab-item>
                <Register @login="setTab" />
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AccountNavbar from '@/components/account/AccountNavbar.vue';
import Login from '@/components/account/Login.vue';
import Register from '@/components/account/Register.vue';
export default {
    name: "Account",
    components: {
        AccountNavbar,
        Login,
        Register
    },
    data() {
        return {
            tab: 0,
            loading: false
        }
    },
    methods: {
      setTab(value) {
        this.tab = value
      }
    }
}
</script>