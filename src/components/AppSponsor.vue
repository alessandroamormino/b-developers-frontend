<script>
import {store} from '../store.js';
import AppDevelopers from './AppDevelopers.vue';


export default{
    name: "AppSponsor",
    data() {
        return {
            sponsored: this.developers,
        };
    },


    props: {
        developers: Object,
    },


    components: { AppDevelopers }
}
</script>


<template>
    <AppDevelopers :developers="this.sponsored"></AppDevelopers>
</template>


<style lang="scss" scoped>
</style>
