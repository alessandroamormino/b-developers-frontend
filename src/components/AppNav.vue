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
    <div class="container nav-container">
      <router-link :to="{name: 'main'}" class="nav-logo" aria-current="page">
        <img src="img/bdevelopers-logo.png" alt="">
      </router-link>    
      <div class="nav-links">
        <a href="http://127.0.0.1:8000/" class="btn btn-outline-light nav-btn">Crea il tuo profilo</a>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>


nav {
  background-color: #146ebe;
  width: 100%;
  height: 105px;
  position: fixed;
  top:0;
  right: 0;

  z-index: 99;

  .nav-container {
    display: flex;
    justify-content: space-between;
    height: 100%;

    .nav-logo {
      height: 100%;


      img {
        padding: 10px 0;
        height: 100%;
      }
    }
  
    .nav-links {
      padding: 0 20px;
      
      a {
        color: white;
        text-decoration: none;

        &:hover {
          color: rgb(20, 110, 190);
        }
      }
    }
  }

}




</style>
