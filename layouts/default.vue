<template>
  <div class="page" id="page">
    <div class="page__wrapper">
      <div class="page__container">
        <slot :key="$route.name" />
      </div>
    </div>
    <UI />
  </div>
</template>

<script lang="ts">
import gsap from "gsap";
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const onEnter = (el: Element, done: () => void) => {
      gsap.to(
        el,
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power1.easeOut',
          onComplete: done,
        }
      );
    };

    const onLeave = (el: Element, done: () => void) => {
      gsap.to(
        el, {
        opacity: 0,
        duration: 0.3, 
        ease: 'power1.easeOut',
        onComplete: done,
      });
    };

    return {
      onEnter,
      onLeave,
    }
  }
})
</script>

<style lang="stylus" scoped>
  html
  body
    height 100%

  // Style for root nuxt DOM element
  body
    > #__nuxt
      height 100%
      > #__layout
        height 100%
  .page
    position relative
    height 100%
    background #090909
    color #84ceff
    &__wrapper
      width 100%

    &__container
      height 100%
      position relative
      z-index 1
</style>