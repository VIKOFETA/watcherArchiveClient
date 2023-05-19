<template>
  <div class="ui">
    <div class="ui__header">
      <button class="ui__exit text-5" @click="exitEvent" v-if="isLoggedIn">Exit</button>
    </div>
    <Teleport to="body">
      <Transition name="modal" @enter="onEnter" @leave="onLeave">
        <Modal v-if="isModalOpened" :key="'modal'">
          <PostForm v-if="isPostFormModal" />
          <CategoryForm v-if="isCategoryFormModal" />
        </Modal>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { mainStore } from '~/store/main'
import { storeToRefs } from 'pinia'
import gsap from "gsap";
export default defineComponent({
  setup () {
    const store = mainStore();
    const {isLoggedIn, isModalOpened, isPostFormModal, isCategoryFormModal} = storeToRefs(store);

    const exitEvent = () => {
      store.exit()
      navigateTo('/authorization');
    };

    const onEnter = (el: Element, done: () => void) => {
      gsap.fromTo(el, {
        opacity: 0,
        scale: 0.95
      }, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.in(1.6)",
        onComplete: done
      });
    };
    const onLeave = (el: Element, done: () => void) => {
      gsap.fromTo(el, {
        opacity: 1,
        scale: 1
      }, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "back.out(1.6)",
        onComplete: done
      });
    };

    return {
      exitEvent,
      isLoggedIn,
      isModalOpened,
      isPostFormModal,
      isCategoryFormModal,
      onEnter,
      onLeave
    }
  }
})
</script>

<style lang="stylus" scoped>
  .ui
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 80
    pointer-events none
  
    &__header
      position fixed
      top 3rem
      right 3rem
      left 3rem
      display flex
      align-items center
    
    &__exit
      margin-left auto
      pointer-events auto

</style>