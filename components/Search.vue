<template>
  <div class="search">
    <div class="search__wrapper wrapper-x">
      <input type="text" v-model="searchValue" name="search" id="search" class="search__input text-4">
      <button @click="search" class="search__button button text-5"> Search </button>
    </div>
  </div>
</template>

<script lang="ts">
import { mainStore } from '~/store/main';
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const store = mainStore();
    const { currentCategory } = storeToRefs(store);
    const searchValue: Ref<String> = ref('');

    const search = async () => {
      await useFetch('http://localhost:3301/api/v1/post/', { 
        method: 'GET',
        headers: {
          authorization: `Bearer ${store.token}`
        },
        query: {
          category_id: currentCategory.value?.id,
          search:  searchValue.value
        },
        onResponse({ request, response, options }) {
          if(response._data.posts.length > 0) {
            store.setPosts(response._data.posts);
          } else {
            store.setPosts([]);
          }
        },
        onResponseError({ request, response, options }) {
          console.error('error', response._data)
        }
      });
    }

    return {
      searchValue,
      search,
    }
  }
}

</script>

<style lang="stylus" scoped>

  .search
    position relative

    &__wrapper
      display flex
      justify-content center

    &__input
      padding 0.5rem
      width 100%
      height 4rem
      border 1px solid #84ceff
      border-right 0
      color white
      caret-color white
    
    &__button
      border 1px solid #84ceff

</style>