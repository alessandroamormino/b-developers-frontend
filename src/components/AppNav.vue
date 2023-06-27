<script>

export default {
    name: "AppNav",
    data() {
        return {};
    },

    methods: {
    }
}
</script>
<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <router-link :to="{name: 'main'}" class="navbar-brand active text-white mt-1" aria-current="page">BDevelopers</router-link>    
    </div>
  </nav>
</template>
<style lang="scss" scoped>


nav {
  background-color: #146ebe;
  width: 100%;
  position: fixed;
  top:0;
  right: 0;

  z-index: 1;

  a {
    color: white;

  }

  .my-toggler {
    color: #fff;
  }
}


</style>
