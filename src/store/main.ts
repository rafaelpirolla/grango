import { defineStore } from "pinia";
import Auth from "@/services/auth";
import FireStore from "@/services/firestore";

import router from "@/router/index";

export default defineStore({
  id: 'main',
  state: () => ({
    userProfile: {}
  }),
  actions: {
    async userLogin(form: { email: string; password: string; }) {
      const auth = Auth()
      const user = auth.login(form.email, form.password)

      this.fetchUserProfile(user)
    },
    async userSignup(form: { name: string; title: string; email: string; password: string}) {
      const auth = Auth()
      const fireStore = FireStore()
      
      const { user } = auth.signUp(form.email, form.password)
    
      await fireStore.setUser(user.id, form.name, form.title)
    },
    async fetchUserProfile(user: any) {
      const fireStore = FireStore()

      this.userProfile = fireStore.loadUser(user.uid)

      // change route to dashboard
      // router.push('/')
    },
  }
})
