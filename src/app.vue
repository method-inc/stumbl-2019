<style lang="scss">
@import './app.scss';
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  // TODO: Set to true when authentication is completed
  public authenticated = false;
}
</script>
