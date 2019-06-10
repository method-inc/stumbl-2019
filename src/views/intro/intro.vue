<style lang="scss" scoped>
@import './intro.scss';
</style>

<template>
  <div class="intro">
    <div class="intro-logo">
      <img src="../../images/dsw_logo.svg" alt="denver startup week logo">
    </div>
    <div class="intro-content">
      <GetStarted v-if="introStep === 1"/>
    </div>
    <div class="intro-next" v-on:click="nextStep()">
      <Button :title="label" :blueBackground="true"/>
    </div>
    <div class="intro-mountains">
      <img src="../../images/mountains.svg" alt="mountain scenery">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import GetStarted from '../../components/onboarding/get-started/get-started-component.vue';
import Button from '../../components/button/button-component.vue';

@Component({
  components: {
    GetStarted,
    Button,
  },
})
export default class Intro extends Vue {
  public introStep = 2;

  get label() {
    return this.introStep === 1
      ? 'Get Started'
      : 'Next';
  }

  public nextStep() {
    this.$set(this, 'buttonText', 'Next');
    this.introStep += 1;
  }
}
</script>

