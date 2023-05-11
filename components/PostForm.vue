<template>
  <form @submit="submitForm" class="post-form" :key="'login'">
    <h4 class="post-form__title heading-5">Post</h4>
    <div class="post-form__wrapper">
      <input  placeholder="Title" type="text" name="login" id="login" class="post-form__input text-5">
      <textarea placeholder="Description" name="description" id="description" rows="30" class="post-form__textarea text-5"></textarea>
      <div class="post-form__row">
        <label for="image" class="post-form__file-label">Poster Upload</label>
        <input type="file" name="image" id="image" class="post-form__file text-5">
        <input  placeholder="Rating" type="number" name="rating" id="rating" class="post-form__input text-5">
        <input  placeholder="Count" type="number" name="count" id="count" class="post-form__input text-5">
      </div>
      <button type="submit" class="post-form__submit text-5">{{ buttonText }}</button>
    </div>
  </form>
</template>

<script lang="ts">
export default {
  // props: {
  //   type: {
  //     type: String,
  //     default: 'Login'
  //   }
  // },
  setup(props) {      
    let buttonText = 'Submit';


    const submitForm = (e: Event) => {
      e.preventDefault()

      // const sendParams = {
      //   login: login.value,
      //   password: password.value,
      //   type: props.type,
      // };
      

      console.log('Submit Post Form');

    }

    return {
      submitForm,
      buttonText,
    }
  }
}
</script>

<style lang="stylus" scoped>
  .post-form
    display flex
    flex-direction column

    &__title
      align-self center

    &__wrapper
      display flex
      flex-direction column
    
    &__row
      display flex
      justify-content flex-end

      &:not(:first-child)
        margin-top 1.5rem

      input
        margin-top 0 !important

      input:not(:last-child)
        margin-right 1.5rem

    &__textarea,
    &__input
      border-bottom 1px solid #84ceff
      height 3rem
      color white
      caret-color white

      &:not(:first-child)
        margin-top 1.5rem
    
    &__textarea
      resize vertical
    
    &__file
      display none
    
    &__file-label
      margin-right auto
      padding 0.5rem 1.5rem
      display flex
      align-items center
      background #84ceff
      color black
      cursor pointer
      transition transform .3s

    &__submit
      margin-top 3rem
      padding 0.5rem 1.5rem
      background #84ceff
      color black
      cursor pointer
      transition transform .3s
      text-transform uppercase

      &:hover
        transform scale(.98)

</style>