<style lang="scss">
@import './app.scss';
</style>

<template>
  <div id="app">
    <div id="nav">
      <Header/>
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
