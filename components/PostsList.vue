<template>
  <div class="posts-list">
    <div class="posts-list__wrapper">
      <ul class="posts-list__list" v-if="posts && posts.length > 0">
        <transition-group name="fade">
          <PostsListItem :post="item ? item : undefined" v-for="item in posts" :key="item.id" />
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { mainStore } from '~/store/main';
  import { storeToRefs } from 'pinia'

  export default {
    props: {
      count: {
        type: Number,
      }
    },
    setup(props, ctx) {
      const store = mainStore();
      const { posts, currentCategory } = storeToRefs(store);

      if(process.client){
        watch(
          currentCategory,
          async (newValue) => {
            if(newValue) {
              if(!store.getCurrentCategory) return;
              getPosts();
            }
          }
        );
      }

      const getPosts = async () => {
        await useFetch('http://localhost:3301/api/v1/post/', { 
          method: 'GET',
          headers: {
            authorization: `Bearer ${store.token}`
          },
          query: {
            category_id: currentCategory.value?.id
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
      };
      
      return {
        posts,
      }
    }
  }

</script>

<style lang="stylus" scoped>

  .posts-list
    display flex
    flex-direction column
    justify-content center

    &__list
      display flex
      flex-direction column
      justify-content center
      align-items center

</style>