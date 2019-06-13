<style lang="scss" scoped>
@import './enter-email-component.scss';
</style>

<template>
  <div class="intro--enter-email">
    <h1>Track Progress</h1>
    <p>Enter your email to track your progress and be rewarded!</p>
    <input :class="{'valid': validEmail}" type="text" name="email" id="email" :placeholder="placeholder" v-model="entered" >
    <div style="color: red;" v-if="entered">Testing binding: {{entered}}</div>
    <p>This will ONLY be used to inform you if you've won</p>
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
export default class EnterEmailComponent extends Vue {
  public entered = '';
  public placeholder = 'ILove@DenStartupWeek.com';

  get validEmail() {
    // Super simple email validation
    // Checks if there's chars before and after @,
    // and if there's chars before and after dot
    return /^.+@.+\..+$/.test(this.entered);
  }
}
</script>

