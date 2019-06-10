<style lang="scss" scoped>
@import './get-started-component.scss';
</style>

<template>
<div class="intro--get-started">
  <h1>Let's crawl, Denver.</h1>
  <p>
    Welcome to the official app of the Denver Startup Week Crawl!  Follow the map, meet friends, win prizes. Get started for free below!
  </p>
  <IntroStepCounter :step="1"/>
</div>  
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import IntroStepCounter from '../../intro-step-counter/intro-step-counter-component.vue';

@Component({
  components: {
    IntroStepCounter,
  },
})
export default class GetStartedComponent extends Vue {}
</script>
