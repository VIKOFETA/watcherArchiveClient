<template>
  <div class="category-list">
    <ul class="category-list__list">
      <li class="category-list__item text-3" :data-category-id="item.id" v-for="item in categories" :key="item.id">
        <button @click="categorySelection(item)" class="category-list__item-title" :class="{'active': currentCategoryId === item.id}"> {{ item.name }} </button>
        <button @click="updateCategory(item)" class="category-list__edit"> <Icon name="material-symbols:settings-rounded" class="category-list__item-icon"/> </button>
      </li>
    </ul>
    <button @click="addCategory" class="category-list__add text-3"><Icon name="material-symbols:add-box-outline" color="#84ceff" /></button>
  </div>
</template>

<script lang="ts">
  import { mainStore } from '~/store/main'
  import { storeToRefs } from 'pinia'

  export default {
    setup(props, ctx) {
      const store = mainStore();
      const currentCategoryId: Ref<number | undefined> = ref(store.getCurrentCategory?.id)
      const { currentCategory, categories } = storeToRefs(store);
    
      watch(
        currentCategory,
        async (newValue) => {
          if(newValue) {
            currentCategoryId.value = newValue.id;
          }
        }
      );

      const loadCategoriesOfUser = async () => {
        const response = await useFetch('http://localhost:3301/api/v1/category', { 
          method: 'GET',
          headers: {
            authorization: `Bearer ${store.token}`
          },
          onResponse({ request, response, options }) {
            // console.log(response)
            if(response._data.categories.length > 0) {
              store.setCategories(response._data.categories);
              if(store.getCategories){
                store.setCurrentCategory(store.getCategories[0]);
              }
            }
          },
          onResponseError({ request, response, options }) {
            console.error('error', response)
          }
        });
        // console.log('resp', response.data.value);
      };

      if(store.token) {
        loadCategoriesOfUser();
      }

      const categorySelection = (item: Category) => {
        if(store.getCurrentCategory?.id !== item.id){
          ctx.emit('newSelectedCategory', item);
          // console.log('select category', item);
          store.setCurrentCategory(item);
          currentCategoryId.value = item.id;
        }
      }

      const addCategory = async () => {
        store.isModalOpened = true;
        store.isCategoryFormModal = true;
      }
      const updateCategory = (category: Category) => {
        if(!store.isModalOpened) {
          store.setChangeableCategory(category);
          store.isModalOpened = true;
          store.isCategoryFormModal = true;
        }
      }

      return {
        categories,
        categorySelection,
        currentCategoryId,
        addCategory,
        updateCategory,
      }
    }
  }

</script>

<style lang="stylus" scoped>

  .category-list
    display flex
    justify-content center

    &__list
      display flex
      justify-content center
      align-items center
    
    &__item
      &:not(:last-child)
        margin-right 1.5rem
      
      
    &__item-title
      transition transform .3s
      &.active
        border-bottom 2px solid #84ceff
      &:hover
        transform scale(0.98)
    
    &__add
      margin-left 2rem
    
    &__item-icon
      margin-left 0.5rem
      font-size 22px

</style>