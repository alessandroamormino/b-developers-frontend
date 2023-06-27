<script>
import AppNav from './components/AppNav.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  data(){
    return{

    }
  }, 
  components: { AppNav, AppFooter }
}
</script>

<template>
  <AppNav></AppNav>
  <router-view></router-view>
  <AppFooter></AppFooter>
</template>

<style lang="scss">
</style>
