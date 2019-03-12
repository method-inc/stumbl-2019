<style lang="scss">
@import './app.scss';
</style>

<template>
  <div id="app">
    <div id="nav">
      <Header/>
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/header/header-component.vue';

@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {}
</script>
