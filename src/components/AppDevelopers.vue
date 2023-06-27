<script>
import {store} from '../store.js';


export default{
  name: 'AppDevelopers',
  data(){
    return{
      store,
      icons:[],
      ratingAVG: '',
      fullStars: '',
      halfStars: '',
      remainingStars: '',
      isSponsored: false,
      length_object: ''
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

  methods: {

    // funzioni per il calcolo delle stelle per i voti 
    getRatingAVG() {
      this.ratingAVG = this.developers.ratingAVG;
    },

    getFullStars(avg) {
      // console.log('full - ', this.developers.last_name, Math.floor(avg));
      return this.fullStar = Math.floor(avg);
    },

    getHalfStars(avg) {
      // console.log('half - ', this.developers.last_name, Math.round(Math.round(avg * 2) / 2 - this.getFullStars(avg)));
      return this.halfStars = Math.round(Math.floor(avg * 2) / 2 - this.getFullStars(avg));
    },

    getRemainingStars(avg) {
      // console.log('ramaining - ', this.developers.last_name, 5 - (this.getFullStars(avg) + Math.round(this.getHalfStars(avg))));
      return this.remainingStars = 5 - (this.getFullStars(avg) + Math.round(this.getHalfStars(avg)));
    },

    checkSponsor(){
      this.length_object = Object.keys(this.developers.sponsor).length;
      // console.log(this.length_object)
      if(this.length_object > 0){
        this.isSponsored = true;
      } else {
        this.isSponsored = false;
      }
    }

  },
  
  mounted() {
    this.getRatingAVG();
    this.checkSponsor();
  }, 

  updated(){
    this.getRatingAVG();
    this.checkSponsor();

  }
  
}
</script>
<template>

  <router-link :to='{name:"developer.show", params:{slug:developers.slug}}' class="card" style="width: 18rem;" :class="this.isSponsored ? 'sponsored' : ''">

    <div id="profile-pic-container">
      <img id="profile-pic" class="card-img-top" :src="picture" alt="profile-picture">
    </div>

    <div v-if="this.isSponsored" class="sponsored-logo">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-rocket-takeoff-fill" viewBox="0 0 16 16">
  <path d="M12.17 9.53c2.307-2.592 3.278-4.684 3.641-6.218.21-.887.214-1.58.16-2.065a3.578 3.578 0 0 0-.108-.563 2.22 2.22 0 0 0-.078-.23V.453c-.073-.164-.168-.234-.352-.295a2.35 2.35 0 0 0-.16-.045 3.797 3.797 0 0 0-.57-.093c-.49-.044-1.19-.03-2.08.188-1.536.374-3.618 1.343-6.161 3.604l-2.4.238h-.006a2.552 2.552 0 0 0-1.524.734L.15 7.17a.512.512 0 0 0 .433.868l1.896-.271c.28-.04.592.013.955.132.232.076.437.16.655.248l.203.083c.196.816.66 1.58 1.275 2.195.613.614 1.376 1.08 2.191 1.277l.082.202c.089.218.173.424.249.657.118.363.172.676.132.956l-.271 1.9a.512.512 0 0 0 .867.433l2.382-2.386c.41-.41.668-.949.732-1.526l.24-2.408Zm.11-3.699c-.797.8-1.93.961-2.528.362-.598-.6-.436-1.733.361-2.532.798-.799 1.93-.96 2.528-.361.599.599.437 1.732-.36 2.531Z"/>
  <path d="M5.205 10.787a7.632 7.632 0 0 0 1.804 1.352c-1.118 1.007-4.929 2.028-5.054 1.903-.126-.127.737-4.189 1.839-5.18.346.69.837 1.35 1.411 1.925Z"/>
</svg>
    </div>

    <div class="card-body p-0 d-flex flex-column" >

      <h4 class="card-title px-3">{{ developers.user.name + ' ' + developers.last_name }}</h4>
      <div v-if="this.developers.ratings.length > 0" class="stars px-3">
        <i v-for="star in this.getFullStars(this.ratingAVG)" class="fa-solid fa-star"></i><i v-for="halfStar in this.getHalfStars(this.ratingAVG)" class="fa-solid fa-star-half-stroke"></i><i v-for="star in this.getRemainingStars(this.ratingAVG)" class="fa-regular fa-star "></i> <span> (Voti Totali: {{ this.developers.ratings.length}} )</span>
      </div>

      <div class="card-text px-3 py-2">
        <small v-if="this.developers.numReviews > 0">Numero recensioni: {{ this.developers.numReviews }}</small>
        <small v-else>Numero recensioni: 0</small>
      </div>

      <hr>

      <div class="card-text px-3 flex-grow-1">
        <div class="services mt-1"><strong>Prestazioni: </strong>{{developers.services}}</div>
      </div>

      <hr>

      <div class="icons">
        <img class="skill-icon" v-for="icon in getSkillsIcons" :src="this.store.URI + 'storage/' + icon" alt="">
      </div>

    </div>
    
  </router-link>

</template>
<style lang="scss" scoped>
.card{

  position: relative;

  text-decoration: none;
  font-family: 'Montserrat', sans-serif;


  overflow: hidden;


  &.sponsored{
    border: 2px solid #146ebe;
    background-color: #146fbe38;
  }

  hr{
    margin: 0;
  }

  #profile-pic-container{

    overflow: hidden;


    #profile-pic{
      width: 100%;
      height: 200px;
      object-fit: cover;
      object-position: top;
      
      transition: all .4s;
    }
    
  }
    &:hover #profile-pic{
    scale: 1.1;
  }

  .sponsored-logo{
    position: absolute;
    top: 10px;
    left: 10px;
    color: red;
  }
  .card-body{
    h4 {
      margin-top: 8px;
      text-transform: capitalize;
    }
  }

  .services{
    padding: 10px 0;
  }
  
  .icons{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;

    min-height: 100px;
    width: 80%;
    margin: 10px auto;


    .skill-icon{
      width: 30px;
      height: 30px;
      object-fit: contain;

    }
  }

  .stars {
    .fa-solid.fa-star,
    .fa-solid.fa-star-half-stroke {
      // color: rgba(235, 210, 71, 0.89);
      color: red;
    }
    .fa-regular.fa-star {
      color: rgb(180, 179, 179);

    }
  }

}
</style>
