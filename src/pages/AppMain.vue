<script>
// importo axios
import axios from 'axios';
import {store} from '../store.js';


import AppDevelopers from '../components/AppDevelopers.vue';
import AppSponsor from '../components/AppSponsor.vue';
import AppHeader from '../components/AppHeader.vue';
import AppCategories from '../components/AppCategories.vue';
import AppSection from '../components/AppSection.vue';


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
  components: { AppDevelopers, AppHeader, AppSponsor, AppCategories, AppSection }, 

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
    console.log(this.store.skillName);

  },

  scrollFunction() {
    let mybutton = document.querySelector("#myBtn");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
  },

  topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  },

  }, 
  created(){
    this.getDevelopers();
    window.onscroll = () => {this.scrollFunction()};
  }, 
}
</script>
<template>
  <AppHeader :skills="this.skills"></AppHeader>

  <div id="companies">
    <div class="container">
      <ul class="p-0">
        <li>
          <img class="company" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png" alt="google">
        </li>
        <li>
          <img class="company" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png" alt="netflix">
        </li>
        <li>
          <img class="company" src="https://logolook.net/wp-content/uploads/2021/06/Paypal-Logo-2007.png" alt="paypal">
        </li>
        <li>
          <img class="company" src="https://th.bing.com/th/id/OIP.0hq62bdD9-fLp_GDPz-k4wHaBf?pid=ImgDet&rs=1" alt="meta">
        </li>
      </ul>
    </div>
  </div>

  <div class="container my-4">    

    <div v-if="this.isDeveloperFound" class="container all-developers d-flex justify-content-center">
      <button @click="topFunction()" id="myBtn">&ShortUpArrow;</button>
      <h2 class="w-100 pt-4 text-center">Sviluppatori in evidenza</h2>
      <AppSponsor v-for="developer in this.sponsoredDevelopers" :developers="developer"></AppSponsor>

      <h2 class="w-100 pt-4 text-center">Altri sviluppatori</h2>
      <AppDevelopers v-for="developer in this.developers" :developers="developer"></AppDevelopers>
    </div>
    <div v-else class="alert alert-warning">
      Non ci sono sviluppatori con questa specializzazione
    </div>
  </div>

  <div class="loader" v-if="loaderVisible"></div>

  <AppSection></AppSection>
  <AppCategories></AppCategories>
</template>
<style lang="scss" scoped>

#myBtn {
  display: none;
  position: fixed;
  bottom: 30px;
  right: 20px;

  width: 80px;
  height: 80px;
  border-radius: 50%;

  z-index: 2;
  font-size: 18px;
  border: 1px solid #fff;

  background-color: #166DBE;
  color: #fff;

  cursor: pointer;

  padding: 10px;

  font-size: 30px;
}

#companies {
  height: 100px;
  background-color: #fafafa;

  .container {
    height: 100%;

    ul {
      display: flex;
      gap: 2em;
      margin-bottom: 0;
    }
  }

  li {
    list-style-type: none;
    height: 50px;
    .company {
    object-fit: contain;
    width: 100px;
    height: 100%;

    filter: grayscale(100%);
  }
  }



  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.all-developers{
  display: flex;
  flex-flow: row wrap;
  gap: 2em;
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


  @media screen and (max-width: 768){

    
    
       
  }
</style>
