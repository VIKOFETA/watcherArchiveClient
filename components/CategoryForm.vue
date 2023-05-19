<template>
  <form @submit="submitForm" class="post-form">
    <h4 class="post-form__title heading-5">Category</h4>
    <div class="post-form__wrapper">
      <input  placeholder="Title" type="text" name="title" id="title" v-model="title"  class="post-form__input text-5">
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
    // const {changeablePost} = storeToRefs(store);
    let buttonText = 'Submit';

    const title: Ref<string | null | undefined>  = ref('') ;

    // const post = store.getChangeablePost;
    // if(post){
    //   title.value = post?.title;
    // } else {
    //   title.value = '';
    // }

    const submitForm = async (e: Event) => {
      e.preventDefault()
      await useFetch('http://localhost:3301/api/v1/category', { 
        method: 'POST',
        headers: {
          authorization: `Bearer ${store.token}`,
          contentType: 'multipart/form-data',
        },
        body: {
          name: title.value?.toString()
        },
        onResponse({ request, response, options }) {
          // console.log(response)
          if(response._data.category) {
            store.addCategory(response._data.category)
            store.isModalOpened = false;
            store.isCategoryFormModal = false;
          }
        },
        onResponseError({ request, response, options }) {
          console.error('error', response._data.message, response)
        }
      });  
      title.value = '';
    }
    return {
      submitForm,
      buttonText,
      title,
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