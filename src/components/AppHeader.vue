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
            "public/img/jumbo2.webp",
            "public/img/jumbo3.webp",
            "public/img/jumbo4.webp",
            "public/img/jumbo5.jpg",
            "public/img/jumbo6.webp",
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
    <h1 data-aos="fade-right" data-aos-duration="1700">Professionisti del settore Tech</h1>
  
    <form id="search" @submit.prevent="" action="">
      <label id="spec-title">Ricerca</label>
      <i class="fa-solid fa-arrow-right"></i>

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
    height: 800px;
        
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
        // background-color: rgba(0, 0, 0,);
      }

      .jumbo-images {
        width: 100%;
        height: 100%;
        object-fit: cover;
        // object-position: 0 10px;
      }
      
    }



      #jumbo-content {
        min-width: 800px;
        position: absolute;
        top: 50%;
        left: 35%;
        transform: translate(-50%, -50%);

        h1 {
          font-size: 3em;
          color: rgba(255, 255, 255, 0.815);
        }

        #search{
          display: flex;
          align-items: center;
          // flex
          width: 100%;
          height: 2.5em;
          // padding: 2em 0;

          #spec-title {
            font-size: 1.5em;
            // margin-right: 30px;
            color: white;
          }

          i{
            color: #fff;
            font-size: 1.5em;
            padding: 0 20px;
          }

          select {
            // background-color: #4ba4f1d3;
            padding: 5px;
            color: #000;
            font-size: 1.1em;
            border: none;

            border-top-right-radius: 0;
            border-bottom-right-radius: 0;

            height: 100%;
            // height: 3em;

            &:hover {
              cursor: pointer;
            }
          }

          .btn {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 50px;
            height: 100%;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;


          }

          .form-label{
            margin: 0;
            min-width: fit-content;
          }

        }
      }

  }


  @media screen and (max-width: 1200px) {
      #jumbo{

        #jumbo-content{
          min-width: 600px;
        }
      }
  }

  @media screen and (max-width: 992px) {
      #jumbo{

        #jumbo-content{
          min-width: 500px;
        }

        #jumbo-carousel{
          .jumbo-images{
            object-fit: cover;
            object-position: right;
          }
        }
      }
  }

  @media screen and (max-width: 768px) {
      #jumbo{

        #jumbo-content{
          min-width: 500px;
          left: 50%;
        }

        #jumbo-carousel{
          .jumbo-images{
            object-fit: cover;
            object-position: 80%;
          }
        }
      }
  }

  @media screen and (max-width: 576px) {
      #jumbo{

        height: 700px;

        #jumbo-content{
          min-width: 200px;
          left: 50%;
          top: 45%;

          h1{
            font-size: 3em;
          }

          #search{
            
            label{
              display: none;
            }
            
            i.fa-arrow-right{
              display: none;
            }

          }
        }

        #jumbo-carousel{
          .jumbo-images{
            object-fit: cover;
            object-position: 75%;
          }
        }
      }
  }


</style>
