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
    <IntroStepCounter :numberOfSteps="numberOfSteps" :step="stepNumber" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import IntroStepCounter from '@/components/intro-step-counter/intro-step-counter-component.vue';

@Component({
  props: {
    numberOfSteps: Number,
    stepNumber: Number,
  },
  components: {
    IntroStepCounter,
  },
})
export default class FollowMapComponent extends Vue {}
</script>
