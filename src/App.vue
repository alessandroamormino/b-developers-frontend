<script>
import AppNav from './components/AppNav.vue';

export default {
  data(){
    return{

    }
  }, 
  components: {AppNav}
}
</script>

<template>
  <AppNav></AppNav>
  <router-view></router-view>
</template>

<style lang="scss">
</style>
