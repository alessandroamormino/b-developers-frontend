<script>
import {store} from '../store.js';


export default{
  name: 'AppDevelopers',
  data(){
    return{
      store,
      icons:[],
    }
  }, 
  props: {
    developers: Object,
  },

  computed: {
    // leggo l'immagine di copertina
    picture(){
      return this.store.URI + 'storage/' + this.developers.picture;
    },

    getSkillsIcons(){
      this.icons = [];

    for (let i = 0; i < this.developers.skills.length; i++) {
      this.icons.push(this.developers.skills[i].icon);
      

    }
    return this.icons;
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

      <hr>
      <div class="icons">
        <img class="skill-icon" v-for="icon in getSkillsIcons" :src="this.store.URI + 'storage/' + icon" alt="">
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

  .icons{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;

    min-height: 100px;
    width: 80%;
    margin: 0 auto;

    padding: 10px;

    .skill-icon{
      width: 30px;
      height: 30px;
      object-fit: contain;

    }
  }
}
</style>
