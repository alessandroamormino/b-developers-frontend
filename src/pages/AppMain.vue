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
    axios.get(this.URI + this.APIPath + '?skill_name=' + this.selectedSkill ).then(response => {
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

    <form @submit.prevent="" action="" class="d-flex">
      <label for="exampleDataList" class="form-label">Datalist example</label>
      <input v-model="this.selectedSkill" class="form-control" list="datalistOptions" id="exampleDataList" @change="getDevelopers()" placeholder="Type to search...">
      <datalist id="datalistOptions">
        <option value="">Tutte</option>
        <option v-for="skill in this.skills " :value="skill.name">{{ skill.name }}</option>
      </datalist>
      
      <button type="submit">CERCA</button>

    </form>
    <h1>Tutti gli sviluppatori</h1>
    <h3 v-if="this.params == 'Tutte le specializzazioni'">{{ this.params }}</h3>
    <h3 v-else>Risultati per la ricerca: {{ this.params }}</h3>

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
</style>
