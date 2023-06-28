<script>
import { store } from '../store';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

export default {
    name: "AppHeader",
    data() {
        return {
          jumboImage: [
            "public/img/jumbo1.jpeg",
            "public/img/jumbo2.jpeg",
            "public/img/jumbo3.jpeg",
        ],
          store,
          mainIndex: 0,
        };
    },

    props: {
      skills: Object,
    },

    methods: {
      switchImg() {
        this.mainIndex++;
        if(this.mainIndex >= this.jumboImage.length) {
          this.mainIndex = 0;
        }
      },

      getSkillName() {
      for (let i = 0; i < this.skills.length; i++) {

        if (this.skills[i].id == this.store.selectedSkill) {

          this.store.skillName = this.skills[i].name;
        }

      }
    },

    },

    mounted() {
      AOS.init();
      setInterval(() => {
            this.switchImg()
        }, 4000);
    }


}
</script>
<template>
<div id="jumbo" data-aos="fade-in">

  <div id="jumbo-carousel">
    <img class="jumbo-images" :src="this.jumboImage[this.mainIndex]" alt="jumbo-img">
  </div>


  <div id="jumbo-content">
    <h1 data-aos="fade-right" data-aos-duration="1700">Professionisti del settore</h1>
  
    <form id="search" @submit.prevent="" action="">
        <!-- <label for="skillInput" class="form-label">Ricerca per specializzazione</label>
        <input v-model="this.selectedSkill" class="form-control" list="skillList" id="skillInput" @change="getDevelopers()" placeholder="Nome Specializzazione...">
        <datalist id="skillList">
          <option value="">Tutte</option>
          <option v-for="skill in this.skills " :value="skill.name">{{ skill.name }}</option>
        </datalist> -->
  
        <label id="spec-title">Specializzazioni</label>
        <select v-model="this.store.selectedSkill" id="skill_id" name="skill_id" class="form-select form-select-sm" aria-label=".form-select-sm example">
          <option selected value="">Tutte le specializzazioni</option>
          <option v-for="skill in this.skills" :value="skill.id">{{ skill.name }}</option>
        </select>
        
        <router-link :to="{name:'search' }" type="submit" class="btn btn-primary" @click="this.getSkillName()"><i class="fa-solid fa-magnifying-glass"></i></router-link>
  
      </form>

  </div>



</div>
  
</template>
<style lang="scss" scoped>



  #jumbo {
    position: relative;
    width: 100%;
    height: 700px;
        
    #jumbo-carousel {
      width: 100%;
      height: 100%;
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.205);
      }

      .jumbo-images {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
    }



      #jumbo-content {
        min-width: 800px;
        position: absolute;
        top: 60%;
        left: 30%;
        transform: translate(-50%, -50%);

        h1 {
          font-size: 3em;
          color: rgba(255, 255, 255, 0.815);
        }

        #search{
          display: flex;
          align-items: center;
          width: 100%;
          height: 100px;
          padding: 2em 0;

          #spec-title {
            font-size: 2em;
            margin-right: 30px;
            color: white;
          }

          select {
            background-color: #4ba4f1d3;
            padding: 5px;
            color: white;
            font-size: 1.1em;
            border: none;

            &:hover {
              cursor: pointer;
            }
          }

          .btn {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 70px;
            height: 50px;
            margin-left: 10px;
          }

          .form-label{
            margin: 0;
            min-width: fit-content;
          }

        }
      }



  }
</style>
