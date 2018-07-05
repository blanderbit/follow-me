<template>
    <div id="profil">
        <div class="profil">
            <components is="navbar"></components>
<div>v</div>
            <components is="globFooter"></components>
        </div>
    </div>
</template>

<script>

   import GFooter from '../GloballFooter.vue'
   import navBar from './navbarProfil.vue'
    export default {
        name: 'profil',
        data () {
            return {}

        },
        components:{
            globFooter:GFooter,
            navbar:navBar
        },
        ready:{

        }
    }
</script>
<style>
    .profil{
        background: #f5f5f5;
    }
</style>