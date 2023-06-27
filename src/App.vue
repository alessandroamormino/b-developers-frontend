<script>
import AppNav from './components/AppNav.vue';
import AppFooter from './components/AppFooter.vue';
import AppCategories from './components/AppCategories.vue';

export default {
  data(){
    return{

    }
  }, 
  components: { AppNav, AppFooter, AppCategories }
}
</script>

<template>
  <AppNav></AppNav>
  <router-view></router-view>
  <AppCategories></AppCategories>
  <AppFooter></AppFooter>
</template>

<style lang="scss">
</style>
