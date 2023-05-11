import { defineStore } from 'pinia'

export const mainStore = defineStore({
  id: 'main',
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => {
    return {
      token: '' as String,
      user: null as User | null,
      categories: null as Category[] | null,
      currentCategory: null as Category | null,
      isLoggedIn: false as Boolean,
      isModalOpened: false as Boolean
    }
  },
  actions: {
    setToken(payload: string) {
      this.token = payload;
    },
    setUser(payload: User | null) {
      this.user = payload;
    },
    setCategories(payload: Category[] | null){
      this.categories = payload;
    },
    setCurrentCategory(payload: Category | null){
      this.currentCategory = payload;
    },
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
    exit() {
      this.setToken('');
      this.setUser(null);
      this.setCategories(null);
      this.setCurrentCategory(null);
      this.logout();
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    },
    getCategories(state) {
      return state.categories;
    },
    getCurrentCategory(state) {
      return state.currentCategory;
    },
  },
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


export interface Category {
  id: number;
  title: string;
}