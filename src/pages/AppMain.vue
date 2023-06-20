<script>
// importo axios
import axios from 'axios';

import AppDevelopers from '../components/AppDevelopers.vue';

export default{
  name: "AppMain",
  data() {
      return {
        URI: 'http://127.0.0.1:8000/',
        APIPath: 'api/developers',
        developers: [],
        skills: [],
        selectedSkill: '',
        params: '',
        isDeveloperFound: false,
      };
  },
  components: { AppDevelopers }, 

  methods: {
  getDevelopers(){
    axios.get(this.URI + this.APIPath + '?skill_id=' + this.selectedSkill ).then(response => {
      console.log(response.data);
      if(response.data.success) {
        this.developers = response.data.results;
        this.skills = response.data.allSkills;
        this.params = response.data.params;
        this.isDeveloperFound = true;
      } else {
        this.isDeveloperFound = false;
      }

    });
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
      <select v-model="this.selectedSkill" id="skill_id" name="skill_id" class="form-select form-select-sm" aria-label=".form-select-sm example">
        <option selected value="">Scegli specializzazione</option>
        <option v-for="skill in this.skills" :value="skill.id">{{ skill.name }}</option>
      </select>
      
      <button type="submit" class="btn btn-primary" @click="getDevelopers()">CERCA</button>

    </form>
    

    <div v-if="this.isDeveloperFound" class="results">
      <h3 v-if="this.params == 'Tutte le specializzazioni'">{{ this.params }}</h3>
      <h3 v-else>Risultati per la ricerca: {{ this.params }}</h3>
    </div>

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
