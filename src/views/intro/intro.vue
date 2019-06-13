<style lang="scss" scoped>
@import './intro.scss';
</style>

<template>
  <div class="intro">
    <div class="intro-logo">
      <img src="../../images/dsw_logo.svg" alt="denver startup week logo">
    </div>
    <div class="intro-content">
      <GetStarted v-if="introStep === 1" :numberOfSteps="totalSteps" :stepNumber="1"/>
      <ShareLocation v-if="introStep === 2" :numberOfSteps="totalSteps" :stepNumber="2"/>
      <FollowMap v-if="introStep === 3" :numberOfSteps="totalSteps" :stepNumber="3"/>
      <IntroWin v-if="introStep === 4" :numberOfSteps="totalSteps" :stepNumber="4"/>
      <EnterEmail v-if="introStep === 5" :numberOfSteps="totalSteps" :stepNumber="5"/>
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
import router from '@/router';

import Button from '@/components/button/button-component.vue';

import GetStarted from '@/components/onboarding/get-started/get-started-component.vue';
import ShareLocation from '@/components/onboarding/share-location/share-location-component.vue';
import FollowMap from '@/components/onboarding/follow-map/follow-map-component.vue';
import IntroWin from '@/components/onboarding/win/win-component.vue';
import EnterEmail from '@/components/onboarding/email/enter-email-component.vue';

@Component({
  components: {
    Button,
    GetStarted,
    ShareLocation,
    FollowMap,
    IntroWin,
    EnterEmail,
  },
})
export default class Intro extends Vue {
  public introStep = 1;
  public totalSteps = 5;

  get label() {
    return (this.introStep === 1 || this.introStep === this.totalSteps)
      ? 'Get Started'
      : 'Next';
  }

  public nextStep() {
    this.$set(this, 'buttonText', 'Next');
    this.introStep += 1;
    if (this.introStep > this.totalSteps) {
      router.push({name: 'home', params: {authenticated: 'true'}});
    }
  }
}
</script>

