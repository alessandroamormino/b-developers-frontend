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
      };

  },

  methods: {
    getDevelopers() {
        axios.get(this.store.URI + this.store.APIPath + '/' + this.developerSlug).then(response => {

        if(response.data.developer) {
            this.isDeveloperFound = true;
            this.developer = response.data.developer;
        } else {
            this.isDeveloperFound = false;
        }
    });
  },

},

  mounted() {
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
    } 

  }

};
</script>
<template>
    <div class="container">
        <h1 class="text-center py-5">Dettagli</h1>

        <div v-if="this.isDeveloperFound" class="developer-detail">
            <h3 class="mb-3">{{ this.developer.user.name }} {{ this.developer.last_name }}</h3>
            <img id="dev-picture" :src="getDevPicture" alt="developer-img">
            <p>Indirizzo: {{ this.developer.address }}</p>
            <p>Telefono: {{ this.developer.phone }}</p>
            <strong>Titolo: {{ this.developer.role }}</strong>
            <p>Prestazioni: {{ this.developer.services }}</p>
            <hr>
            <strong>Specializzazioni</strong>
            <div class="icons">
                <img class="skill-icon" v-for="icon in getSkillsIcons" :src="this.store.URI + 'storage/' + icon" alt="">
            </div>
            <hr>
            <strong>Curriculum</strong>
            <img id="dev-curriculum" :src="getDevCV" alt="developer-cv">
        </div>

        <div v-else class="alert alert-warning">
            <p>Lo sviluppatore non è stato trovato</p>
        </div>
    </div>

   
</template>


<style lang="scss" scoped>

#dev-picture {
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin: 2em 0;

    border-radius: 50%;
}

#dev-curriculum {
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

</style>
