<template>
  <div class="login">
    <v-form @submit.prevent lazy-validation ref="form">
      <v-row class="mx-1 my-5" align="center" justify="center">
        <v-col cols="12">
          <v-text-field
            prepend-inner-icon="mdi-email"
            v-model="login.email"
            :rules="emailRules"
            outlined
            color="purple"
            placeholder="john@example.com"
            label="Email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-lock"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            v-model="login.password"
            :rules="passwordRules"
            outlined
            color="purple"
            placeholder="Your Password"
            label="Password"
            @click:append="show = !show"
            required
          ></v-text-field>
          <v-btn
            depressed
            block
            color="purple"
            height="50"
            dark
            type="submit"
            :loading="loading"
            @click="loginNow"
            >{{ loading ? 'Please wait...' : 'Login' }}</v-btn
          >
          <p class="text-center mt-3">
            Don't have account ?
            <a @click="register" class="purple--text">Register</a>
          </p>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Login',
  data() {
    return {
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [(v) => !!v || 'Password is required'],
      show: false,
      loading: false,
      login: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapActions(['loginUser']),
    register() {
      this.$emit('register', 1);
    },
    async loginNow() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        let resp = await this.loginUser(this.login);
        if (resp == 1) {
          this.$router.push({ path: '/' });
        }
        this.loading = false;
      }
      
    },
  },
};
</script>