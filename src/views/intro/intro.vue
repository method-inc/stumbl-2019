<template>
  <div class="intro">
    <div class="intro-logo">
      <img src="../../images/dsw_logo.svg" alt="denver startup week logo">
    </div>
    <GetStarted v-if="introStep === 1"/>
    <div class="intro-mountains">
      <img src="../../images/mountains.svg" alt="mountain scenery">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import GetStarted from '../../components/onboarding/get-started/get-started-component.vue';

@Component({
  components: {
    GetStarted,
  },
})
export default class Intro extends Vue {
  public introStep = 1;
}
</script>

