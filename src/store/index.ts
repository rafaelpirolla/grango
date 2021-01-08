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
  
      // fetch user profile and set in state
      this.fetchUserProfile(user)
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
