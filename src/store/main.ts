import { defineStore } from "pinia";
import Auth from "@/services/auth";
import FireStore from "@/services/firestore";

import router from "@/router/index";

interface UserState {
  user: string
  initialized: boolean
  error: string
}

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    userProfile: {}
  }),
  getters: {
  },
  actions: {
    async userLogin(form: { email: string; password: string; }) {
      const auth = Auth()
      const { user } = auth.login(form.email, form.password)

      this.fetchUserProfile(user)
    },
    async signup(form: { name: string; title: string; email: string; password: string}) {
      const auth = Auth()
      const store = FireStore()
      
      const { user } = auth.signUp(form.email, form.password)
    
      // create user profile object in userCollections
      await store.setUser(user.id, form.name, form.title)
    },
    async fetchUserProfile(user: any) {
      // fetch user profile
      // const { usersCollection } = firebase()
      const fireStore = FireStore()

      this.userProfile = fireStore.loadUser(user.uid)

      // change route to dashboard
      router.push('/')
    },
  },
})
