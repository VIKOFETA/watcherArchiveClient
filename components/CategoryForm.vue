<template>
  <div class="category-form__container">
    <form @submit="submitForm" class="category-form">
      <h4 class="category-form__title heading-5">Category</h4>
      <div class="category-form__wrapper">
        <input  placeholder="Title" type="text" name="title" id="title" v-model="name"  class="category-form__input text-5">
        <div class="category-form__bottom">
          <button type="submit" class="category-form__submit button text-5">{{ buttonText }}</button>
        </div>
      </div>
    </form>
    <button @click="deleteCategory" class="category-form__delete button text-5">Delete</button>
  </div>
</template>

<script lang="ts">
import { mainStore } from '~/store/main'
export default {
  setup(props) { 
    const store = mainStore();
    let buttonText = 'Submit';

    const name: Ref<string | null | undefined>  = ref('') ;

    if(store.getChangeableCategory){
      name.value = store.getChangeableCategory?.name;
    } else {
      name.value = '';
    }

    const submitForm = async (e: Event) => {
      e.preventDefault();
      if(store.getChangeableCategory) {
        await useFetch('http://localhost:3301/api/v1/category', { 
          method: 'PUT',
          headers: {
            authorization: `Bearer ${store.token}`,
            contentType: 'multipart/form-data',
          },
          body: {
            id: store.getChangeableCategory.id.toString(),
            name: name.value?.toString()
          },
          onResponse({ request, response, options }) {
            if(response._data.category) {
              store.updateCategory(response._data.category)
              store.changeableCategory = null;
              store.isModalOpened = false;
              store.isCategoryFormModal = false;
            }
          },
          onResponseError({ request, response, options }) {
            console.error('error', response._data.message, response)
          }
        });
      } else {
        await useFetch('http://localhost:3301/api/v1/category', { 
          method: 'POST',
          headers: {
            authorization: `Bearer ${store.token}`,
            contentType: 'multipart/form-data',
          },
          body: {
            name: name.value?.toString()
          },
          onResponse({ request, response, options }) {
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
      }
      name.value = '';
    }
    const deleteCategory = async (e: Event) => {
      e.preventDefault();
      await useFetch(`http://localhost:3301/api/v1/category/${store.getChangeableCategory?.id}`, { 
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${store.token}`,
          contentType: 'multipart/form-data',
        },
        onResponse({ request, response, options }) {
          if(response._data.response) {
            console.log(response._data);
            store.deleteCategory(store.getChangeableCategory!)
            store.isModalOpened = false;
            store.isCategoryFormModal = false;
          }
        },
        onResponseError({ request, response, options }) {
          console.error('error', response._data.message, response)
        }
      });
    };

    return {
      submitForm,
      deleteCategory,
      buttonText,
      name,
    }
  }
}
</script>

<style lang="stylus" scoped>
  .category-form
    display flex
    flex-direction column

    &__container
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
    
    &__bottom
      margin-top 3rem
      display flex
      justify-content center
      align-items center
      position relative

    &__submit

      &:hover
        transform scale(.98)
    
    &__delete
      align-self flex-end
      background #bd2130

</style>