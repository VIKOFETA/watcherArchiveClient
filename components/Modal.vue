<template>
  <div class="modal">
    <button @click="close"  class="modal__close">X</button>
    <div class="modal__wrapper">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mainStore } from '~/store/main'

export default defineComponent({
  setup () {
    const store = mainStore();

    const close = () => {
      store.isModalOpened = false;
    }

    return {
      close,
    }
  }
})
</script>

<style lang="stylus" scoped>
  .modal
    min-width 50%
    position fixed
    z-index: 100
    top: 50%;
    left: 50%;
    transform translate(-50%, -50%)
    background #090909
    color #84ceff
    border 1px solid #84ceff
    border-radius 0.1rem

    &__close
      position absolute
      top 1.5rem
      right 1.5rem
      z-index 3
      font-size 20px

    &__wrapper
      padding 4rem
      position relative
</style>