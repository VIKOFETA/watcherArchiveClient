<template>
  <form @submit="submitForm" class="auth-form" :key="'login'">
    <div class="auth-form__wrapper">
      <input v-model="login" placeholder="Login" type="text" name="login" id="login" class="auth-form__input text-5">
      <input  v-model="password" placeholder="Password" type="password" name="password" id="password" class="auth-form__input text-5">
      <button type="submit" class="auth-form__submit text-5">{{ buttonText }}</button>
    </div>
  </form>
</template>

<script lang="ts">
import { mainStore } from '~/store/main'
export default {
  props: {
    type: {
      type: String,
      default: 'Login'
    }
  },
  setup(props) {      
    const store = mainStore();
    let login = ref('');
    let password = ref('');
    let buttonText = '';

    if(props.type === 'Login' ) {
      buttonText = 'Log In';
    } else if(props.type === 'Registration') {
      buttonText = 'Registrate';
    }

    const submitForm = (e: Event) => {
      e.preventDefault()

      const sendParams = {
        login: login.value,
        password: password.value,
        type: props.type,
      };
      
      if(sendParams.login && props.type === 'Login'){
        console.log('navigate to index')
        store.setToken(sendParams.login);
        store.login();
        navigateTo('/');
      }
    }

    return {
      submitForm,
      buttonText,
      login,
      password,
    }
  }
}
</script>

<style lang="stylus" scoped>
  .auth-form
    display flex
    flex-direction column

    &__wrapper
      display flex
      flex-direction column

    &__input
      border-bottom 1px solid #84ceff
      height 3rem
      color white
      caret-color white

      &:not(:first-child)
        margin-top 1.5rem

    &__submit
      margin-top 3rem
      padding 0.5rem 1.5rem
      border 2px solid #84ceff
      cursor pointer
      transition transform .3s
      text-transform uppercase

      &:hover
        transform scale(.98)

</style>