<template>
  <div class="posts-list">
    <div class="posts-list__wrapper">
      <ul class="posts-list__list">
        <transition-group name="fade">
          <li class="posts-list__item" v-for="index in count" :key="index">
            <div class="posts-list__item-container">
              <div class="posts-list__item-header">
                <span class="posts-list__item-index heading-4">{{ item?.id }}.</span>
                <div class="posts-list__item-title heading-4">{{ item?.title }}</div>
                <div class="posts-list__item-date">{{ item?.interaction_date }}</div>
              </div>
              <div class="posts-list__item-content">
                <div class="posts-list__item-image-wrapper">
                  <img src="" alt="" class="posts-list__item-image" v-if="item?.image && item.image !== ''">
                </div>
                <div class="posts-list__item-info text-5">
                  <div class="posts-list__item-description">{{ item?.description }}</div>
                  <div class="posts-list__item-info-bottom">
                    <span class="posts-list__item-info-rating">{{ item?.rating }}/10 </span>
                    <div class="posts-list__item-count">Watch Count: {{ item?.count }}</div>
                    <button @click="updatePost" class="posts-list__item-change">Update</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { mainStore } from '~/store/main'

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
      const item: Ref<Post | null> = ref(null);
        const store = mainStore();

      item.value = {
        id: 1,
        title: 'Some Title',
        interaction_date: '01.01.2023',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        rating: 0,
        count: 1,
      }
      
      const updatePost = () => {
        if(!store.isModalOpened) {
          store.isModalOpened = true;
        }
      }

      return {
        item,
        updatePost
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
    
    &__item
      position relative

      &:not(:last-child)
        margin-bottom 5rem
    
    &__item-container
      display flex
      flex-direction column
    
    &__item-header
      margin-bottom 1.5rem
      display flex
    
    &__item-index
      margin-right 1rem
    
    &__item-date
      margin-left auto
    
    &__item-content
      display flex
    
    &__item-image-wrapper
      margin-right 2rem
      width 200px
      height 200px
      // max-width 200px
      // height 0
      // padding-bottom 100%
      background gray
    
    &__item-info
      flex 1 1
      display flex
      flex-direction column
      line-height 1.15
    
    &__item-description
      margin-bottom 2rem
    
    &__item-info-bottom
      margin-top auto
      display flex
    
    &__item-info-rating
      margin-right 1rem
    
    &__item-change
      margin-left auto
      padding 0.5rem 1.5rem
      background #84ceff
      color black
      cursor pointer
      align-self center
      transition transform .3s

      text-transform uppercase

      &:hover
        transform scale(.98)

</style>