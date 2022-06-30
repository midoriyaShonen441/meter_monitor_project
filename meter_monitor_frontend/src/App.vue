<script>
import Header from './components/header/Header.vue';
// import Footer from './components/footer/Footer.vue';

export default {
  components:{
    Header,
    // Footer
  }
}

</script>

<template>
  <div class="app">
    <Header/>
    <RouterView />
  
    <!-- <Footer/> -->
  </div>
</template>

<style scoped>
.app{
  margin:0px;
  padding: 0px;
}

 
</style>
