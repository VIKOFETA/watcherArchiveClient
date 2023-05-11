<template >
  <div class="auth">
    <div class="auth__wrapper wrapper">
      <div class="auth__container">
        <h2 class="auth__title heading-3">Welcome to Wathcer Archive</h2>
        <transition @enter="onEnter" @leave="onLeave" mode="out-in" >
          <AuthForm class="auth__form" :type="'Login'" :key="'login'" v-if="formLogin" />
          <AuthForm class="auth__form" :type="'Registration'" :key="'registration'" v-else-if="!formLogin" />
        </transition>
        <button class="auth__new-user text-6" @click.prevent="formLogin = !formLogin">
          <transition mode="out-in" name="fade" :duration="{ enter: 1000, leave: 1000 }">
            <span v-if="formLogin">New here</span>
            <span v-else>Already a member</span>
          </transition>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import gsap from "gsap";

export default {
  setup() {
    const formLogin = ref(true);
    const onEnter = (el: Element, done: () => void) => {
      gsap.fromTo(el, {
        opacity: 0,
        x: -100
      }, {
        opacity: 1,
        x: 0,
        duration: 1,
        onComplete: done
      });
    };
    const onLeave = (el: Element, done: () => void) => {
      gsap.fromTo(el, {
          opacity: 1,
          x: 0
      }, {
        opacity: 0,
        x: 100,
        duration: 1,
        onComplete: done
      });
    };
    return {
      formLogin,
      onEnter,
      onLeave,
    };
  },
}
</script>

<style lang="stylus" scoped>
  .auth
    width 100%
    height 100vh
    display block
    position relative

    &__wrapper
      width 100%
      height 100%
      display flex
      flex-direction column
      justify-content center
      align-items center

    &__container
      display flex
      flex-direction column
      justify-content center
      align-items center
    
    &__title
      margin-bottom 4rem
    
    &__form-wrapper
      display flex
      flex-direction column
    
    &__new-user
      margin-top 2rem

</style>