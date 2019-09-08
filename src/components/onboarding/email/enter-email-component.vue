<style lang="scss" scoped>
@import './enter-email-component.scss';
</style>

<template>
  <div class="intro--enter-email">
    <h1>Track Progress</h1>
    <p>Enter your email to track your progress and be rewarded!</p>
    <input :class="{'valid': validEmail}" type="text" name="email" id="email" :placeholder="placeholder" v-model="email" >
    <input :class="{'valid': validPassword}" type="password" name="password" id="password" :placeholder="'Password'" v-model="password" >
    <div style="color: red;" v-if="email">Testing binding: {{entered}}</div>
    <p>Email will ONLY be used as login and to inform you if you've won</p>
    <IntroStepCounter :numberOfSteps="numberOfSteps" :step="stepNumber" />
    <Button :title="'Sign Up'" backgroundColor="green"/>
    <Button :title="'Log In'" backgroundColor="blue"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import IntroStepCounter from '@/components/intro-step-counter/intro-step-counter-component.vue';
import Button from '@/components/button/button-component.vue';

@Component({
  props: {
    numberOfSteps: Number,
    stepNumber: Number,
  },
  components: {
    IntroStepCounter,
    Button,
  },
})
export default class EnterEmailComponent extends Vue {
  public email = '';
  public password = '';
  public placeholder = 'ILove@DenStartupWeek.com';

  // API CALL
  // Creates a user, or returns user data if user already exists

  // TODO: Need to create a submit function...

  get validEmail() {
    // Super simple email validation
    // Checks if there's chars before and after @,
    // and if there's chars before and after dot
    return /^.+@.+\..+$/.test(this.email);
  }

  get validPassword() {
    return this.password.length > 6;
  }
}
</script>

