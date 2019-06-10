<style lang="scss" scoped>
@import './share-location-component.scss';
</style>

<template>
  <div class="intro--share-location">
    <div class="header-icon">
      <img src="../../../images/visited.svg" alt="location icon">
    </div>
    <h1>Share your location</h1>
    <p>Requires Copy!!!!!!!!!!</p>
    <IntroStepCounter :step="2" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

import IntroStepCounter from '../../intro-step-counter/intro-step-counter-component.vue';

@Component({
  components: {
    IntroStepCounter,
  },
})
export default class ShareLocationComponent extends Vue {}
</script>

