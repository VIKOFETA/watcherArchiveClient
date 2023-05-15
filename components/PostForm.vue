<template>
  <form @submit="submitForm" class="post-form">
    <h4 class="post-form__title heading-5">Post</h4>
    <div class="post-form__wrapper">
      <input  placeholder="Title" type="text" name="title" id="title" v-model="title"  class="post-form__input text-5">
      <textarea placeholder="Description" name="description" id="description" v-model="description" rows="30" class="post-form__textarea text-5"></textarea>
      <div class="post-form__row">
        <label for="image" class="post-form__file-label button text-5">Poster Upload</label>
        <input type="file" name="image" id="image" class="post-form__file text-5">
        <input  placeholder="Rating" type="number" name="rating" id="rating" v-model="rating" class="post-form__input text-5">
        <input  placeholder="Count" type="number" name="count" id="count" v-model="count" class="post-form__input text-5">
      </div>
      <button type="submit" class="post-form__submit button text-5">{{ buttonText }}</button>
    </div>
  </form>
</template>

<script lang="ts">
import { mainStore } from '~/store/main'
import { storeToRefs } from 'pinia'
export default {
  setup(props) { 
    const store = mainStore();
    const {changeablePost} = storeToRefs(store);
    let buttonText = 'Submit';

    const title: Ref<string | null | undefined>  = ref('') ;
    const description: Ref<string | number | string[] | undefined>  = ref('') ;
    const count: Ref<number | null | undefined>  = ref(0) ;
    const rating: Ref<number | null | undefined>  = ref(0) ;
    const image: Ref<string | null | undefined>  = ref('') ;

    const post = store.getChangeablePost;
    if(post){
      title.value = post?.title;
      description.value = post?.description;
      count.value = post?.count;
      rating.value = post?.rating;
      image.value = post?.image;
    } else {      
      title.value = '';
      description.value = '';
      count.value = 0;
      rating.value = 0;
      image.value = '';
    }

    // watch(
    //   changeablePost, 
    //   (newValue) => {
    //     console.log(newValue);
    //     title.value = newValue?.title;
    //     description.value = newValue?.description;
    //     count.value = newValue?.count;
    //     rating.value = newValue?.rating;
    //     image.value = newValue?.image;
    //   }
    // );

    const submitForm = (e: Event) => {
      e.preventDefault()
      if(post) {

        store.updatePost({ 
          id: post.id,
          title: title.value!,
          description: description.value as string,
          count: count.value!,
          rating: rating.value!,
          image: image.value!,
          interaction_date: new Date().toLocaleString(),
        })
        store.changeablePost = null;

      } else {

        store.addPost({ 
          id: Math.floor(Math.random() * 10),
          title: title.value!,
          description: description.value as string,
          count: count.value!,
          rating: rating.value!,
          image: image.value!,
          interaction_date: new Date().toLocaleString(),
        })
        // console.log('Submit Post Form', {title: title.value, desc: description.value, count: count.value, rating: rating.value, image: image.value});

      }
  
      title.value = '';
      description.value = '';
      count.value = 0;
      rating.value = 0;
      image.value = '';
      store.isModalOpened = false
    }

    return {
      submitForm,
      buttonText,
      changeablePost,
      title,
      description,
      count,
      rating,
      image,
    }
  }
}
</script>

<style lang="stylus" scoped>
  .post-form
    display flex
    flex-direction column

    &__title
      margin-bottom 5rem
      align-self center

    &__wrapper
      display flex
      flex-direction column
    
    &__row
      display flex
      justify-content flex-end

      &:not(:first-child)
        margin-top 3rem

      input
        margin-top 0 !important

      input:not(:last-child)
        margin-right 1.5rem

    &__textarea,
    &__input
      border-bottom 1px solid #84ceff
      height 3rem
      color white
      caret-color white

      &:not(:first-child)
        margin-top 4rem
    
    &__textarea
      resize vertical
      min-height 15rem
    
    &__file
      display none
    
    &__file-label
      margin-right auto

    &__submit
      margin-top 3rem

      &:hover
        transform scale(.98)

</style>