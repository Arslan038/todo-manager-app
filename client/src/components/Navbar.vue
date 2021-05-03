<template>
    <v-app-bar
      app
      color="purple"
      dark
      flat
    >
      <div class="d-flex align-center">
        <h2>Todo Manager</h2>
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn
        text
        to="/account"
        class="text-normal"
      >
        <v-icon>mdi-account</v-icon>
        <span class="ml-2">{{ email }}</span>
      </v-btn> -->
      <v-icon>mdi-account</v-icon>
      <span class="ml-2">{{ email }}</span>
      <v-icon class="ml-3" @click="logout">mdi-power</v-icon>
    </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      email: null
    }
  },
  methods: {
    logout() {
      this.logoutUser()
    }
  },
  created() {
    if(this.getLoggedUser()) {
      this.email = this.getLoggedUser().email
    }
  }
}
</script>