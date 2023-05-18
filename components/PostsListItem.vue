<template>
  <li class="posts-list-item">
    <div class="posts-list-item__container">
      <div class="posts-list-item__header">
        <!-- <span class="posts-list-item__index heading-4">{{ post?.id }}.</span> -->
        <div class="posts-list-item__title heading-4">{{ post?.title }}</div>
        <div class="posts-list-item__date text-5">{{ post?.interaction_date }}</div>
      </div>
      <div class="posts-list-item__content">
        <div class="posts-list-item__image-wrapper">
          <img :src="src" alt="" class="posts-list-item__image" v-if="post?.image">
        </div>
        <div class="posts-list-item__info text-5">
          <div class="posts-list-item__description">{{ post?.description }}</div>
          <div class="posts-list-item__info-bottom">
            <span class="posts-list-item__info-rating">{{ post?.rating }}/10 </span>
            <div class="posts-list-item__count">Watch Count: {{ post?.count }}</div>
            <button @click="updatePost" class="posts-list-item__change button text-5">Update</button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
  import { mainStore } from '~/store/main'

  export default {
    props: {
      post: {
        type: Object as PropType<Post>,
      }
    },
    setup(props, ctx) {
      const store = mainStore();
      
      const updatePost = () => {
        if(!store.isModalOpened) {
          store.setChangeablePost(props.post!);
          store.isModalOpened = true;
        }
      }

      const src = computed(() => {
        return store.serverAddress + '/' + (props.post?.image as string).replace(/\\/g,"/");
      });

      return {
        updatePost,
        src
      }
    }
  }

</script>

<style lang="stylus" scoped>
  .posts-list-item
    width 100%
    position relative

    &:not(:last-child)
      margin-bottom 5rem
    
    &__container
      display flex
      flex-direction column
    
    &__header
      margin-bottom 1.5rem
      display flex
    
    &__index
      margin-right 1rem
    
    &__date
      margin-left auto
    
    &__content
      display flex
    
    &__image-wrapper
      margin-right 2rem
      width 200px
      height 200px
      position relative
      // max-width 200px
      // height 0
      // padding-bottom 100%
      background gray
    
    &__image
      width 100%
      height 100%
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      object-fit cover
    
    &__info
      flex 1 1
      display flex
      flex-direction column
      line-height 1.15
    
    &__description
      margin-bottom 2rem
    
    &__info-bottom
      margin-top auto
      display flex
    
    &__info-rating
      margin-right 1rem
    
    &__change
      margin-left auto

</style>