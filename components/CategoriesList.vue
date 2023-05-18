<template>
  <div class="category-list">
    <ul class="category-list__list">
      <li class="category-list__item text-3" :class="{'active': currentCategoryId === item.id}" :data-category-id="item.id" v-for="item in items" :key="item.id">
        <button @click="categorySelection(item)" class="category-list__button"> {{ item.name }} </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { mainStore } from '~/store/main'
  import { storeToRefs } from 'pinia'

  export default {
    setup(props, ctx) {
      const store = mainStore();
      const items: Ref<Category[]> = ref([]);
      const currentCategoryId: Ref<number | undefined> = ref(store.getCurrentCategory?.id)
      const { currentCategory } = storeToRefs(store);

      const loadCategoriesOfUser = async () => {
        const response = await useFetch('http://localhost:3301/api/v1/category', { 
          method: 'GET',
          headers: {
            authorization: `Bearer ${store.token}`
          },
          onResponse({ request, response, options }) {
            // console.log(response)
            if(response._data.categories.length > 0) {
              items.value = response._data.categories;
              store.setCategories(items.value);
              store.setCurrentCategory(items.value[0]);
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

      watch(
        currentCategory,
        async (newValue) => {
          if(newValue) {
            currentCategoryId.value = newValue.id;
          }
        }
      );
      // items.value = [
      //   {
      //     id: 1,
      //     title: 'Category 1',
      //   },
      //   {
      //     id: 2,
      //     title: 'Category 2',
      //   },
      //   {
      //     id: 3,
      //     title: 'Category 3',
      //   },
      //   {
      //     id: 4,
      //     title: 'Category 4',
      //   },
      //   {
      //     id: 5,
      //     title: 'Category 5',
      //   },
      // ];
      // store.setCategories(items.value);
      // store.setCurrentCategory(items.value[0]);


      const categorySelection = (item: Category) => {
        if(store.getCurrentCategory?.id !== item.id){
          ctx.emit('newSelectedCategory', item);
          // console.log('select category', item);
          store.setCurrentCategory(item);
          currentCategoryId.value = item.id;
        }
      }

      return {
        items,
        categorySelection,
        currentCategoryId,
      }
    }
  }

</script>

<style lang="stylus" scoped>

  .category-list
    display flex
    flex-direction column
    justify-content center

    &__list
      display flex
      justify-content center
      align-items center
    
    &__item
      &:not(:last-child)
        margin-right 1.5rem
      
      &.active
        border-bottom 2px solid #84ceff
      
    &__button
      transition transform .3s
      &:hover
        transform scale(0.98)

</style>