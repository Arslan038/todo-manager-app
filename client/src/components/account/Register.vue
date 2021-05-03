<template>
  <div class="register">
    <v-form @submit.prevent lazy-validation ref="form">
      <v-row class="mx-1 my-5" align="center" justify="center">
        <v-col cols="12">
          <v-text-field
            prepend-inner-icon="mdi-email"
            v-model="register.email"
            :rules="emailRules"
            outlined
            placeholder="john@example.com"
            label="Email"
            color="purple"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-lock"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            v-model="register.password"
            :rules="passwordRules"
            outlined
            color="purple"
            placeholder="Your Password"
            label="Password"
            @click:append="show = !show"
            required
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-lock"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            v-model="password"
            :rules="confirmRules"
            outlined
            color="purple"
            placeholder="Confirm Password"
            label="Confirm Password"
            @click:append="show1 = !show1"
            required
          ></v-text-field>
          <v-btn
            depressed
            block
            color="purple"
            height="50"
            @click="createUser"
            type="submit"
            dark
            :loading="loading"
            >{{ loading ? 'Please wait...' : 'Register' }}</v-btn
          >
          <p class="text-center mt-3">
            Already have account ?
            <a @click="login" class="purple--text">Login</a>
          </p>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Register',
  data() {
    return {
      loading: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [(v) => !!v || 'Password is required', (v) => v && v.length >= 6 || 'Password should contain min 6 characters.'],
      confirmRules: [(v) => !!v || 'Confirm Password is required.'],
      nameRules: [(v) => !!v || 'Name is required'],
      show: false,
      show1: false,
      password: null,
      register: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapActions(['registerUser']),
    login() {
      this.$emit('login', 0);
    },

    async createUser() {
      if(this.$refs.form.validate()) {
        if (this.password !== this.register.password) {
        this.$store.commit('setToast', {
          show: true,
          message: 'Password Mismatch',
          color: 'red',
        });
        return;
      }
      this.loading = true;
      let resp = await this.registerUser(this.register);
      if (resp == 1) {
        this.$refs.form.reset();
        this.login();
      }
      this.loading = false
    }
    //   if (this.password !== this.register.password) {
    //     this.$store.commit('setToast', {
    //       show: true,
    //       message: 'Password Mismatch',
    //       color: 'red',
    //     });
    //     return;
    //   }
    //   this.loading = true;
    //   let resp = await this.createUser(this.register);
    //   if (resp == 1) {
    //     this.$refs.form.reset();
    //     this.login();
    //   }
    //   this.loading = false;
    },
  },
};
</script>