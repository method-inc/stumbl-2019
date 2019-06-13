<style lang="scss" scoped>
@import './get-started-component.scss';
</style>

<template>
<div class="intro--get-started">
  <h1>Let's crawl, Denver.</h1>
  <p>
    Welcome to the official app of the Denver Startup Week Crawl!  Follow the map, meet friends, win prizes. Get started for free below!
  </p>
  <IntroStepCounter :numberOfSteps="numberOfSteps" :step="stepNumber"/>
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
export default class GetStartedComponent extends Vue {}
</script>
