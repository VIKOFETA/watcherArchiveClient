<template>
  <div class="search">
    <div class="search__wrapper wrapper-x">
      <input type="text" name="search" id="search" class="search__input text-4">
      <button @click="searchValue" class="search__button button text-5"> Search </button>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    setup() {


      const searchValue = () => {
        // ctx.emit('newSelectedCategory', item);
        // store.setCurrentCategory(item);
      }

      return {
        searchValue,
      }
    }
  }

</script>

<style lang="stylus" scoped>

  .search
    position relative

    &__wrapper
      display flex
      justify-content center

    &__input
      padding 0.5rem
      width 100%
      height 4rem
      border 1px solid #84ceff
      border-right 0
      color white
      caret-color white

</style>