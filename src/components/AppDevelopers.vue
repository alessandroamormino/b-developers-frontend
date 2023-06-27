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
      console.log(this.length_object)
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
  <div class="card" style="width: 18rem;">
    <img id="profile-pic" class="card-img-top" :src="picture" alt="profile-picture">
    <div class="card-body p-0 d-flex flex-column" :class="this.isSponsored ? 'sponsored' : ''">
      <h5 class="card-title px-3">{{ developers.user.name + ' ' + developers.last_name }}</h5>
      <div v-if="this.developers.ratings.length > 0" class="stars px-3">
        <i v-for="star in this.getFullStars(this.ratingAVG)" class="fa-solid fa-star"></i><i v-for="halfStar in this.getHalfStars(this.ratingAVG)" class="fa-solid fa-star-half-stroke"></i><i v-for="star in this.getRemainingStars(this.ratingAVG)" class="fa-regular fa-star "></i> <span> (Voti Totali: {{ this.developers.ratings.length}} )</span>
      </div>
      <div class="card-text px-3 py-2">
        <small v-if="this.developers.numReviews > 0">Numero recensioni: {{ this.developers.numReviews }}</small>
        <small v-else>Numero recensioni: 0</small>
      </div>
      <hr>
      <div class="card-text px-3 flex-grow-1">
        <!-- <div class="advertisement"><strong>Sponsorizzazione: </strong> <span v-if="developers.advertisements.length > 0" v-for="adv in developers.advertisements">{{ adv.name }} </span> <span v-else> Nessuna sponsorizzazione</span> </div> -->
        <div class="address mt-1"><strong>Indirizzo: </strong>{{developers.address}}</div>
        <div class="phone mt-1"><strong>Telefono: </strong>{{developers.phone}}</div>
        <div class="role mt-1"><strong>Titolo: </strong>{{developers.role}}</div>
        <div class="services mt-1"><strong>Prestazioni: </strong>{{developers.services}}</div>
        <router-link :to='{name:"developer.show", params:{slug:developers.slug}}'>Vai ai dettagli</router-link>
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
    &.sponsored{
      background-color: #fff09c;
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

  .stars {
    .fa-solid.fa-star,
    .fa-solid.fa-star-half-stroke {
      color: rgba(235, 210, 71, 0.89);
    }
    .fa-regular.fa-star {
      color: rgb(180, 179, 179);
    }
  }

}
</style>
