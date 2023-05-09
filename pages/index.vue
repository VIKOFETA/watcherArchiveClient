<template>
  <div>
    <h1>HELLO</h1>
  </div>
</template>

<script>
// import { mainStore } from '@/stores/main'
import { mainStore } from '~/store/main'
export default {
  setup () {
    const store = mainStore();

    if(!store.getToken) {
      const router = useRouter();
      router.push('authorization');
    }

    return {}
  }
}
</script>

<style lang="stylus" scoped>

</style>