<template>
  <div class="home">
    <div class="home__wrapper wrapper">
      <CategoriesList class="home__categories"/>
      <Search class="home__search"/>
      <button @click="newPost" class="home__new-post text-4">Add New Post</button>
      <PostsList class="home__posts" :count="count"/>
    </div>
  </div>
</template>

<script>
import { mainStore } from '~/store/main'
import { storeToRefs } from 'pinia'

export default {
  setup () {

    const store = mainStore();
    const {currentCategory} = storeToRefs(store);
    const count = ref(1);

    const newPost = () => {
      count.value++;
      if(!store.isModalOpened) {
        store.isModalOpened = true;
      }
    };

    // console.log(currentCategoryRef)
    watch(
      currentCategory,
      (newValue) => {
        console.log('new cat', newValue);
      }
    );
 
    onMounted(() => {
      if(!store.isLoggedIn) {
        console.log(store.token, 'no token');
        navigate('/authorization');
      } else {
        console.log(store.token, 'token exist');
      }
    });

    return {
      count,
      newPost
    }
  }
}
</script>

<style lang="stylus" scoped>
  .home
    width 100%
    min-height 100vh

    &__wrapper
      display flex
      flex-direction column

    &__categories
      margin-bottom 3rem

    &__search 
      margin-bottom 2rem
    
    &__new-post
      padding 0.5rem 1.5rem
      background #84ceff
      color black
      cursor pointer
      align-self center
      transition transform .3s

      &:hover
        transform scale(.98)
    
    &__posts
      margin-top 5rem

</style>