<template>
  <form @submit="submitForm" class="auth-form" :key="'login'">
    <div class="auth-form__wrapper">
      <input v-model="login" placeholder="Login" type="text" name="login" id="login" class="auth-form__input text-5">
      <input  v-model="password" placeholder="Password" type="password" name="password" id="password" class="auth-form__input text-5">
      <button type="submit" class="auth-form__submit text-5">{{ buttonText }}</button>
    </div>
    <div class="auth-form__note text-5" v-if="note">{{ note }}</div>
  </form>
</template>

<script lang="ts">

interface loginResponse {
  token: string,
  user: User
}

interface registerResponse {
  message: string,
  user: User
}


import { mainStore } from '~/store/main'
export default {
  props: {
    type: {
      type: String,
      default: 'Login'
    }
  },
  setup(props, ctx) {      
    const store = mainStore();
    let login = ref('');
    let password = ref('');
    let buttonText = '';
    let note = ref('');

    if(props.type === 'Login' ) {
      buttonText = 'Log In';
    } else if(props.type === 'Registration') {
      buttonText = 'Registrate';
    }

    const submitForm = async (e: Event) => {
      e.preventDefault()

      const sendParams = {
        login: login.value,
        password: password.value,
        type: props.type,
      };

      if(sendParams.login && sendParams.password) {
        if(sendParams.type === 'Login' ) {
          await useFetch('http://localhost:3301/auth/login', { 
            method: 'POST', 
            body: { login: sendParams.login, password: sendParams.password },
            onResponse({ request, response, options }) {
              const data: loginResponse = response._data as loginResponse;
              if(data.token && data.user.id) {
                store.setToken(data.token);
                store.setUser(data.user);
                store.login();
                navigateTo('/');
              }
            },
            onResponseError({ request, response, options }) {
              note.value = response._data.message;
              console.error('error', response)
            }
          });
        } else if(sendParams.type === 'Registration' ) {
          await useFetch('http://localhost:3301/auth/registration', { 
            method: 'POST', 
            body: { login: sendParams.login, password: sendParams.password },
            onResponse({ request, response, options }) {
              console.log(response._data)
              note.value = response._data.message as string;
              if(response._data.user.id) {
                ctx.emit('registrationSuccess');
              }
            },
            onResponseError({ request, response, options }) {
              note.value = response._data.message;
              console.error('error', response)
            } 
          });
        }
      }
      
      // if(sendParams.login && props.type === 'Login'){
      //   console.log('navigate to index')
      //   store.setToken(sendParams.login);
      //   store.login();
      //   navigateTo('/');
      // }
    }

    return {
      submitForm,
      buttonText,
      login,
      password,
      note,
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
    
    &__note
      margin-top 3rem
      color red

</style>