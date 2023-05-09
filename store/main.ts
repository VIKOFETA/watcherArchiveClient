import { defineStore } from 'pinia'

export const mainStore = defineStore({
  id: 'main',
  state: () => {
    return {
      token: '' as String ,
      user: null as User | null,
    }
  },
  actions: {
    setToken(payload: string) {
      this.token = payload;
    },
    setUser(payload: User) {
      this.user = payload;
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    }
  }
})


export interface User {
  id: number
  login: string,
  role: Role,
}

export interface Role {
  id: number,
  name: string,
}