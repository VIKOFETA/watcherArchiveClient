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
      categories: [] as Category[] | null,
      currentCategory: null as Category | null,
      isLoggedIn: false as Boolean,
      isModalOpened: false as Boolean,
      isPostFormModal: false as Boolean,
      isCategoryFormModal: false as Boolean,
      changeablePost: null as Post | null,
      changeableCategory: null as Category | null,
      posts: [] as Post[] | null,
      serverAddress: 'http://localhost:3301' as string,
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
      if(this.categories?.length === 1) {
        this.currentCategory = this.categories[0];
      }
    },
    setCurrentCategory(payload: Category | null){
      this.currentCategory = payload;
    },
    updateCategory(payload: Category) {
      if (this.categories) {
        this.categories = this.categories.map((category) => {
          if (category && category.id === payload.id) {
            return { ...payload };
          }
          return category;
        });
      }
    },
    deleteCategory(payload: Category) {
      var index = this.categories?.indexOf(payload);
      if (index !== -1) {
        this.categories?.splice(index as number, 1);
      }
      this.posts = [];
      this.currentCategory = null;
      this.changeableCategory = null;
    },
    setPosts(payload: Post[]) {
      this.posts = payload;
    },
    deletePost(payload: Post) {
      var index = this.posts?.indexOf(payload);
      if (index !== -1) {
        this.posts?.splice(index as number, 1);
      }
    },
    setChangeablePost(payload: Post) {
      this.changeablePost = payload
    },
    setChangeableCategory(payload: Category) {
      this.changeableCategory = payload
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
      this.setCategories([]);
      this.setCurrentCategory(null);
      this.setPosts([]);
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
    getChangeableCategory(state) {
      return state.changeableCategory;
    },
  },
})