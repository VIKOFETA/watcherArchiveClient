<template >
  <div class="auth">
    <div class="auth__wrapper wrapper">
      <div class="auth__container">
        <form @submit="submitForm" class="auth__form">
          <h3 class="auth__form-title">Login</h3>
          <div class="auth__form-wrapper">
            <input type="text" name="login" id="login" class="auth__form-input">
            <input type="password" name="password" id="password" class="auth__form-input">
            <button type="submit" class="auth__form-submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup () {
    
    const submitForm = (e: Event) => {
      e.preventDefault()
      const form = e.target as HTMLElement;

      const loginInput = form.querySelector('#login') as HTMLInputElement;
      const passwordInput = form.querySelector('#password') as HTMLInputElement;

      const sendParams = {
        login: loginInput.value,
        password: passwordInput.value
      }
      console.log({...sendParams});
    }

    return {
      submitForm
    }
  }
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

    &__container
      display flex
      justify-content center
      align-items center
    
    &__form
      display flex
      flex-direction column
    
    &__form-wrapper
      display flex
      flex-direction column

</style>