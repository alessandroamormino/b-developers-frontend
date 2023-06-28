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

        loaderVisible: false,
      };

  },
  components: { AppDevelopers }, 

  methods: {
  getDevelopers(){
    this.loaderVisible = true;
    axios.get(this.store.apiURLsearch + this.store.selectedSkill + '&avg=' + this.selectedAVG + '&numRevs=' + this.selectedRevs).then(response => {
      if(response.data.success) {
        this.developers = response.data.results;

        this.skills = response.data.allSkills;
        this.isDeveloperFound = true;
        this.loaderVisible = false;

      } else {
        this.isDeveloperFound = false;
        this.loaderVisible = false;
      }
    });
  },

  getSkillName(){
    if(this.store.selectedSkill == '') {
      this.store.skillName = 'Tutte le specializzazioni';
    } else {
      for (let i = 0; i < this.skills.length; i++) {
  
          if(this.skills[i].id == this.store.selectedSkill){
              this.store.skillName = this.skills[i].name;        
          }
      }
    }

  },

  }, 
  created(){
    this.getDevelopers();
    this.getSkillName();
  }, 
}
</script>
<template>
  <div class="container my-2">
    <h1>Tutti gli sviluppatori</h1>

    <form id="search" @submit.prevent="" action="" class="">

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

    <div id="search-results">
      <span >Risultati per ricerca: {{ this.store.skillName }}</span>
    </div>
    

    <div v-if="this.isDeveloperFound" class="container all-developers">
      <AppDevelopers v-for="developer in this.developers" :developers="developer"></AppDevelopers>
    </div>
    <div v-else class="alert alert-warning">
      Non ci sono sviluppatori con questa specializzazione
    </div>
  </div>

  <div class="loader" v-if="loaderVisible"></div>

</template>


<style lang="scss" scoped>

.container{
  padding-top: 100px;
}
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



  @media only screen and (max-width: 576px) {
    .container {
      h1 {
        text-align: center;
        margin-top: 20px;
      }
    }
    #search {
      display: flex;
      flex-flow: column;
      align-items: center;
    }

    #search-results {
      display: flex;
      justify-content: center;
    }

    .all-developers {
      display: flex;
      justify-content: center;

      padding-top: 50px;
    }
   }












</style>
