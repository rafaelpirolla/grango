<template>
  <div id="login">
    <section>
      <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
      <div class="col1">
        <h1>Piroga</h1>
      </div>

      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div>
            <label for="email1">Email</label>
            <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
          </div>
          <div>
            <label for="password1">Password</label>
            <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
          </div>
          <button @click="login()" class="button">Log In</button>
          <div class="extras">
            <a @click="togglePasswordReset()">Forgot Password</a>
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name">Name</label>
            <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="name" />
          </div>
          <div>
            <label for="title">Title</label>
            <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />
          </div>
          <div>
            <label for="email2">Email</label>
            <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />
          </div>
          <div>
            <label for="password2">Password</label>
            <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
          </div>
          <button @click="signup()" class="button">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import firebase from 'firebase'

import PasswordReset from '@/components/PasswordReset'
import useMainStore from '@/store/main'

export default defineComponent({
  components: {
    PasswordReset
  },
  setup() {
    const main = useMainStore()

    const showLoginForm = firebase.auth().currentUser ? ref(false) : ref(true)
    const showPasswordReset = ref(false)

    const loginForm = reactive({
        email: '',
        password: ''
    });
    const signupForm = reactive({
        name: '',
        title: '',
        email: '',
        password: ''
    });

    const toggleForm = () => {
      showLoginForm.value = !showLoginForm.value
    };

    const togglePasswordReset = () => {
      showPasswordReset.value = !showPasswordReset.value
    };

    const login = () => {
      main.userLogin(loginForm).then(toggleForm())
    };

    const signup = () => {
      main.userSignup(signupForm)
    };

    return {
        showLoginForm,
        showPasswordReset,
        loginForm,
        signupForm,
        //---------//
        toggleForm,
        togglePasswordReset,
        login,
        signup
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
