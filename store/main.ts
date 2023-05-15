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
      isModalOpened: false as Boolean,
      changeablePost: null as Post | null | undefined,
      posts: null as Post[] | null
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
    addCategory(payload: Category) {
      this.categories?.push(payload);
    },
    setCurrentCategory(payload: Category | null){
      this.currentCategory = payload;
    },
    setPosts(payload: Post[]) {
      this.posts = payload;
    },
    setChangeablePost(payload: Post) {
      this.changeablePost = payload
    },
    updatePost(payload: Post) {
      if (this.posts) {
        this.posts = this.posts.map((post) => {
          if (post && post.id === payload.id) {
            return { ...payload };
          }
          return post;
        });
      }
    },
    addPost(payload: Post) {
      if(this.posts && payload) {
        this.posts.unshift(payload);
      }
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
    getPosts(state) {
      return state.posts;
    },
    getChangeablePost(state) {
      return state.changeablePost;
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

export interface Post {
  id: number,
  title: string,
  interaction_date: string,
  description?: string,
  rating: number,
  count: number,
  image?: string,
}
