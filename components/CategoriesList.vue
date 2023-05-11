<template>
  <div class="category-list">
    <ul class="category-list__list">
      <li class="category-list__item text-3" v-for="item in items" :key="item.id">
        <button @click="categorySelection(item)" class="category-list__button"> {{ item.title }} </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { mainStore } from '~/store/main'

  interface Category {
    id: number;
    title: string;
  }

  export default {
    setup(props, ctx) {
      const store = mainStore();

      const items: Ref<Category[]> = ref([]);
      items.value = [
        {
          id: 1,
          title: 'Category 1',
        },
        {
          id: 2,
          title: 'Category 2',
        },
        {
          id: 3,
          title: 'Category 3',
        },
        {
          id: 4,
          title: 'Category 4',
        },
        {
          id: 5,
          title: 'Category 5',
        },
      ];
      store.setCategories(items.value);
      store.setCurrentCategory(items.value[0]);


      const categorySelection = (item: Category) => {
        ctx.emit('newSelectedCategory', item);
        store.setCurrentCategory(item);
      }

      return {
        items,
        categorySelection,
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
      
    &__button
      transition transform .3s
      &:hover
        transform scale(0.98)

</style>