<script>
// importo axios
import axios from 'axios';
import {store} from '../store.js';

export default{
  name: "DeveloperDetail",
  data() {
      return {
        developerSlug: '',
        developer: {},
        store,
        isDeveloperFound: false,
        icons: [],
        ratingAVG: '',
        fullStars: '',
        halfStars: '',
        remainingStars: '',
        revName: '',
        revRate: '',
        revContent: '',
      };

  },

  methods: {
    getDevelopers() {
        axios.get(this.store.URI + this.store.APIPath + '/' + this.developerSlug).then(response => {
            if(response.data.developer) {
                this.isDeveloperFound = true;
                this.developer = response.data.developer;
                this.getRatingAVG();
            } else {
                this.isDeveloperFound = false;
            }
        });
    },

    getRatingAVG() {
      // let sum = 0; 
      // for(let i=0; i < this.developer.ratings.length; i++){
      //   sum += this.developer.ratings[i].rating; 
      // }
      //  return this.ratingAVG = sum / this.developer.ratings.length;
      this.ratingAVG = this.developer.ratingAVG;
    },

    getFullStars(avg) {
      return this.fullStar = Math.floor(avg);
    },

    getHalfStars(avg) {
      // return this.halfStars = Math.round(avg) - this.getFullStars(avg);
      return this.halfStars = Math.round(Math.floor(avg * 2) / 2 - this.getFullStars(avg));
    },

    getRemainingStars(avg) {
      return this.remainingStars = 5 - (this.getFullStars(avg) + Math.round(this.getHalfStars(avg)));
    },

    // Invio la recensione
    sendReview() {

      axios.post(
        this.store.URI + 'api/reviews',
        {
          developer_id: this.developer.id,
          name: this.revName,
          comment: this.revContent,
        })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });

      axios.post(
        this.store.URI + 'api/ratings',
        {
          developer_id: this.developer.id,
          rating: this.revRate,
        })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      });
    }

  },


  created() {
    this.developerSlug = this.$route.params.slug;
    this.getDevelopers();
  },

  computed: {
    getDevPicture() {
        return this.store.URI + 'storage/' + this.developer.picture;
    },

    getDevCV() {
        return this.store.URI + 'storage/' + this.developer.cv;
    },

    
    getSkillsIcons(){
        this.icons = [];

        for (let i = 0; i < this.developer.skills.length; i++) {
            this.icons.push(this.developer.skills[i].icon);
        }
        return this.icons;
    } ,


  }

};
</script>
<template>
    <div class="container">
        <h1 class="py-5">Dettagli Sviluppatore</h1>

        <div v-if="this.isDeveloperFound" class="developer-detail">
            <h3 class="mb-3">{{ this.developer.user.name }} {{ this.developer.last_name }}</h3>
            <img id="dev-picture" :src="getDevPicture" alt="developer-img">
            <div v-if="this.developer.ratings.length > 0" class="stars">
                <i v-for="star in this.getFullStars(this.ratingAVG)" class="fa-solid fa-star"></i><i v-for="halfStar in this.getHalfStars(this.ratingAVG)" class="fa-solid fa-star-half-stroke"></i><i v-for="star in this.getRemainingStars(this.ratingAVG)" class="fa-regular fa-star "></i> <span> ( {{ this.developer.ratings.length}} )</span>
            </div>
            <hr>
            <div class="info">
              <h4>Informazioni</h4>
              <p><strong>Indirizzo:</strong> {{ this.developer.address }}</p>
              <p><strong>Telefono:</strong> {{ this.developer.phone }}</p>
              <p><strong>Titolo:</strong> {{ this.developer.role }}</p>
              <p><strong>Prestazioni:</strong> {{ this.developer.services }}</p>
            </div>
            <hr>
            <h4>Specializzazioni</h4>
            <div class="icons">
                <img class="skill-icon" v-for="icon in getSkillsIcons" :src="this.store.URI + 'storage/' + icon" alt="">
            </div>
            <hr>
            <h4>Curriculum</h4>
            <img id="dev-curriculum" :src="getDevCV" alt="developer-cv">
        </div>
        <div v-else class="alert alert-warning">
            <p>Lo sviluppatore non è stato trovato</p>
        </div>
        <hr>

        <div class="reviews-form">
          <h4>Lascia una tua recensione</h4>
          <form @submit.prevent="sendReview()" method="POST">
            <div class="mb-3 info-user">
              <label for="name" class="form-label">Inserisci il tuo nome completo</label>
              <input type="text" id="name" name="name" v-model="this.revName" class="form-control">
            </div>
            <div class="mb-3 ratings">
              <label for="rating" class="form-label">Dai un voto da 1 a 5</label>
              <input type="number" min="1" max="5" v-model="this.revRate" class="form-control">
            </div>
            <div class="mb-3 content">
              <label for="content" class="form-label">Inserisci il tuo commento</label>
              <textarea name="content" id="content" cols="30" rows="10" v-model="this.revContent" class="form-control"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Invia</button>
          </form>
        </div>

    </div>

   
</template>


<style lang="scss" scoped>

.developer-detail {
    h3 {
        text-transform: capitalize;
    }
    .info{
      h4{
        margin-bottom: 1em;
      }
    }
}

#dev-picture {
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin: 2em 0;

    border-radius: 50%;
}

#dev-curriculum {
  width: 350px;
  display: block;
}
  .icons{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;

    min-height: 100px;
    width: 80%;

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

  .reviews-form {
    margin: 2em 0;
  }

</style>
