<style lang="scss" scoped>
@import './win-component.scss';
</style>

<template>
  <div class="intro--win">
    <div class="header-icon">
      <img src="../../../images/prize.svg" alt="prize icon">
    </div>
    <h1>Win!</h1>
    <p>Visit more startups, win more prizes! Check your rewards page to track progress.</p>
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
export default class WinComponent extends Vue {}
</script>

