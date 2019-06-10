<style lang="scss" scoped>
@import './follow-map-component.scss';
</style>

<template>
  <div class="intro--follow">
    <div class="header-icon">
      <img src="../../../images/walking.svg" alt="person icon">
    </div>
    <h1>Follow the map</h1>
    <p>You’ll be prompted to check in when you arrive at each startup location, so be sure to open this website when you’re there!</p>
    <IntroStepCounter :step="3" />
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
export default class FollowMapComponent extends Vue {}
</script>
