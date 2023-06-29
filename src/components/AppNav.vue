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
        <img src="/public/img/logo.png" alt="logo">
      </router-link> 
      <div class="nav-links d-flex align-items-center gap-4">
        <router-link :to="{name: 'about'}" class="about" aria-current="page">
          Chi Siamo
        </router-link>       
        <a href="http://127.0.0.1:8000/admin" class="btn btn-outline-light nav-btn">Area Riservata</a>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>


nav {
  background-color: #166DBE;
  width: 100%;
  height: 105px;
  position: fixed;
  top:0;
  right: 0;

  z-index: 1;

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

        &.about:hover {
          text-decoration: underline;
        }

        &.nav-btn:hover {
          color: #166DBE;
        }
      }
    }
  }

}




</style>
