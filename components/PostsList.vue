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

  interface Post {
    id: number,
    title: string,
    interaction_date: string,
    description?: string,
    rating: number,
    count: number,
    image?: string,
  }

  export default {
    props: {
      count: {
        type: Number,
      }
    },
    setup(props, ctx) {       
      const store = mainStore();
      const items: Ref<Post[]> = ref([]);
      const { posts } = storeToRefs(store);


      //get curent category
      //get posts by category
      //set posts in store
      //get them from store and make reactive
      items.value?.push({
        id: 1,
        title: 'Some Title',
        interaction_date: '01.01.2023 11:22:22',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        rating: 0,
        count: 1,
      });

      store.setPosts(items.value);
      // posts.value = store.getPosts

      
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