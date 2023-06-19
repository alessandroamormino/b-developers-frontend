<script>
export default{
  name: 'AppDevelopers',
  data(){
    return{
      URI: 'http://127.0.0.1:8000/',
    }
  }, 
  props: {
    developers: Object,
  },

  computed: {
    // leggo l'immagine di copertina
    picture(){
      return this.URI + 'storage/' + this.developers.picture;
    }
  }, 
}
</script>
<template>
  <div class="card" style="width: 18rem;">
    <img id="profile-pic" class="card-img-top" :src="picture" alt="profile-picture">
    <div class="card-body p-0 d-flex flex-column">
      <h5 class="card-title px-3">{{ developers.user.name + ' ' + developers.last_name }}</h5>
      <hr>
      <div class="card-text px-3 flex-grow-1">
        <div class="address mt-1"><strong>Indirizzo: </strong>{{developers.address}}</div>
        <div class="phone mt-1"><strong>Telefono: </strong>{{developers.phone}}</div>
        <div class="role mt-1"><strong>Titolo: </strong>{{developers.role}}</div>
        <div class="services mt-1"><strong>Prestazioni: </strong>{{developers.services}}</div>
      </div>
    </div>
  </div>

</template>
<style lang="scss" scoped>
.card{
  #profile-pic{
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: top;
  }
  .card-body{
    h5 {
      margin-top: 1em;
      text-transform: capitalize;
    }
  }
}
</style>
