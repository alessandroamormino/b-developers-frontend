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
        selectedSkill: '',
        selectedAVG: '',
        isDeveloperFound: false,
        store,
        selectedRevs: '1',
        // sponsoredDevs: [],
        // sponsoredDevs2: [],
        // notSponsoredDevs: [],
        // orderedDevs: [],
      };

  },
  components: { AppDevelopers }, 

  methods: {
  getDevelopers(){
    // console.log(this.store.apiURLsearch + this.store.selectedSkill + '&avg=' + this.selectedAVG + '&numRevs=' + this.selectedRevs);
    axios.get(this.store.apiURLsearch + this.store.selectedSkill + '&avg=' + this.selectedAVG + '&numRevs=' + this.selectedRevs).then(response => {
      if(response.data.success) {
        this.developers = response.data.results;
        // console.log(this.developers);
        

        // const m = new Date();
        // const dateString =
        //     m.getUTCFullYear() + "-" +
        //     ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
        //     ("0" + m.getUTCDate()).slice(-2) + " " +
        //     ("0" + m.getUTCHours()).slice(-2) + ":" +
        //     ("0" + m.getUTCMinutes()).slice(-2) + ":" +
        //     ("0" + m.getUTCSeconds()).slice(-2);

        // for(let i=0; i<this.developers.length; i++){
        //   if(this.developers[i].advertisements.length > 0){
        //     this.sponsoredDevs.push(this.developers[i]);
        //   } else {
        //     this.notSponsoredDevs.push(this.developers[i]);
        //   }
        // }

        // for(let z=0; z<this.sponsoredDevs.length; z++){
        //   for(let y=0; y<this.sponsoredDevs[z].advertisements.length; y++){
        //     if(this.sponsoredDevs[z].advertisements[y].pivot.ending_date >= dateString){
        //       this.sponsoredDevs2.push(this.sponsoredDevs[z]); 
        //     } else {
        //       this.notSponsoredDevs.unshift(this.sponsoredDevs[z]);
        //     }
        //   }
        // }
        // this.orderedDevs = [...this.sponsoredDevs2, ...this.notSponsoredDevs];
        // this.developers = [];
        // this.developers = [...this.orderedDevs];
        // this.orderedDevs = [];
        // this.sponsoredDevs = [];
        // this.notSponsoredDevs = [];
        // this.sponsoredDevs2 = [];
        // console.log(this.developers);

        this.skills = response.data.allSkills;
        this.isDeveloperFound = true;
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

      <div class="skills">
        <label>Ricerca per specializzazione</label>
        <select v-model="this.store.selectedSkill" id="skill_id" name="skill_id" class="form-select form-select-sm" aria-label=".form-select-sm example">
          <option value="">Tutte le specializzazioni</option>
          <option v-for="skill in this.skills" :value="skill.id">{{ skill.name }}</option>
        </select>
      </div>

      <div class="ratings">
        <label for="avg">Filtra per media voti</label>
        <select v-model="this.selectedAVG" id="avg" name="avg" class="form-select form-select-sm" aria-label=".form-select-sm example">
          <option v-for="avg in ['', 1, 2, 3, 4, 5]" :value="avg">
            <span v-if="avg != ''">{{ avg }}</span>
            <span v-else>-</span>
          </option>
        </select>
      </div>

      <div class="reviews">
        <label for="numRevs">Ordina per numero di recensioni</label>
        <select v-model="this.selectedRevs" id="numRevs" name="numRevs" class="form-select form-select-sm" aria-label=".form-select-sm example">
          <option value="1" >Maggiore</option>
          <option value="2">Minore</option>
        </select>
      </div>
      
      <button type="submit" class="btn btn-primary" @click="getDevelopers(), this.getSkillName()">CERCA</button>

    </form>

    <span>Risultati per ricerca: {{ this.store.skillName }}</span>
    

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
  align-items: flex-end;
  justify-content: center;
  gap: 1em;
  // flex

  padding: 2em 0;

  .skills{
    flex-grow: 1;
  }

  button {
    font-size: .8em;
  }
  

}
</style>
