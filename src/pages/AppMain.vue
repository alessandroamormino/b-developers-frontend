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
      };
  },
  components: { AppDevelopers }, 

  methods: {
  getDevelopers(){
    axios.get(this.URI+this.APIPath).then(response => {
      console.log(response.data.results);
      this.developers = response.data.results;
    });
  }
  }, 
  created(){
    this.getDevelopers();
  }, 
}
</script>
<template>
  <div class="container my-2">
    <h1>Tutti gli sviluppatori</h1>
    <div class="container all-developers">
      <AppDevelopers v-for="developer in this.developers" :developers="developer"></AppDevelopers>
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
