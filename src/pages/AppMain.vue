<script>
// importo axios
import axios from 'axios';
import {store} from '../store.js';


import AppDevelopers from '../components/AppDevelopers.vue';
import AppSponsor from '../components/AppSponsor.vue';
import AppHeader from '../components/AppHeader.vue';

export default{
  name: "AppMain",
  data() {
      return {
        developers: [],
        sponsoredDevelopers: [],
        skills: [],
        isDeveloperFound: false,
        store,
        loaderVisible: false,

      };
  },
  components: { AppDevelopers, AppHeader, AppSponsor }, 

  methods: {
  getDevelopers(){
    this.loaderVisible = true;

    axios.get(this.store.apiURLsearch).then(response => {
      
      if(response.data.success) {
        this.sponsoredDevelopers = response.data.results[0];
        this.developers = response.data.results[1];
        this.skills = response.data.allSkills;
        this.isDeveloperFound = true;
        this.loaderVisible = false;

      } else {
        this.isDeveloperFound = false;
      }

    });
  },

  getSkillName(){
    for (let i = 0; i < this.skills.length; i++) {
        
      if(this.skills[i].id == this.store.selectedSkill){

        this.store.skillName =  this.skills[i].name;        
      }
    }

  },

  }, 
  created(){
    this.getDevelopers();
  }, 
}
</script>
<template>
  <AppHeader></AppHeader>
  <div class="container my-4">
    <h1>Sviluppatori</h1>
    <form id="search" @submit.prevent="" action="">
      <!-- <label for="skillInput" class="form-label">Ricerca per specializzazione</label>
      <input v-model="this.selectedSkill" class="form-control" list="skillList" id="skillInput" @change="getDevelopers()" placeholder="Nome Specializzazione...">
      <datalist id="skillList">
        <option value="">Tutte</option>
        <option v-for="skill in this.skills " :value="skill.name">{{ skill.name }}</option>
      </datalist> -->

      <label>Ricerca per specializzazione</label>
      <select v-model="this.store.selectedSkill" id="skill_id" name="skill_id" class="form-select form-select-sm" aria-label=".form-select-sm example">
        <option selected value="">Tutte le specializzazioni</option>
        <option v-for="skill in this.skills" :value="skill.id">{{ skill.name }}</option>
      </select>
      
      <router-link :to="{name:'search' }" type="submit" class="btn btn-primary" @click="this.getSkillName()">CERCA</router-link>

    </form>
    

    <div v-if="this.isDeveloperFound" class="container all-developers">
      <h2 class="w-100">In evidenza</h2>
      <AppSponsor v-for="developer in this.sponsoredDevelopers" :developers="developer"></AppSponsor>

      <h2 class="w-100">Altri sviluppatori</h2>
      <AppDevelopers v-for="developer in this.developers" :developers="developer"></AppDevelopers>
    </div>
    <div v-else class="alert alert-warning">
      Non ci sono sviluppatori con questa specializzazione
    </div>
  </div>

  <div class="loader" v-if="loaderVisible"></div>

</template>
<style lang="scss" scoped>
.all-developers{
  display: flex;
  flex-flow: row wrap;
  gap: 2em;
}

#search{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  // flex

  padding: 2em 0;

  .form-label{
    margin: 0;
    min-width: fit-content;
  }

}

.loader {
   position: fixed;
   top: 50%;
   right: 49%;
   transform: translateX(-50%);
   width:50px;
   height:50px;
   border-radius:100%;
   border:5px solid;
   border-top-color:rgba(254, 168, 23, 0.65);
   border-bottom-color:rgba(57, 154, 219, 0.65);
   border-left-color:rgba(188, 84, 93, 0.95);
   border-right-color:rgba(137, 188, 79, 0.95);
   -webkit-animation: loading 1s ease-in-out infinite alternate;
   animation: loading 1s ease-in-out infinite alternate;
  }

  @keyframes loading {
    from {transform: rotate(0deg);}
    to {transform: rotate(720deg);}
  }

  @-webkit-keyframes loading {
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(720deg);}
  }
</style>
