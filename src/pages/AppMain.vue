<script>
// importo axios
import axios from 'axios';
import {store} from '../store.js';


import AppDevelopers from '../components/AppDevelopers.vue';

export default{
  name: "AppMain",
  data() {
      return {
        developers: [],
        skills: [],
        isDeveloperFound: false,
        store,

      };
  },
  components: { AppDevelopers }, 

  methods: {
  getDevelopers(){

    axios.get(this.store.apiURLsearch).then(response => {
      
      if(response.data.success) {
        this.developers = response.data.results;
        this.skills = response.data.allSkills;
        this.isDeveloperFound = true;
    console.log(this.developers)

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
  <div class="container my-2">
    <h1>Tutti gli sviluppatori</h1>

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
      <AppDevelopers v-for="developer in this.developers" :developers="developer"></AppDevelopers>
    </div>
    <div v-else class="alert alert-warning">
      Non ci sono sviluppatori con questa specializzazione
    </div>
  </div>
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
</style>
