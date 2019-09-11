<style lang="scss" scoped>
@import './enter-email-component.scss';
</style>

<template>
  <div class="intro--enter-email">
    <div v-if="!accountCreated && !resetSuccess">
      <h1>Track Progress</h1>
      <p>Enter your email to track your progress and be rewarded!</p>
      <input class="first" :class="{'valid': validEmail}" type="text" name="email" id="email" placeholder="ILove@DenStartupWeek.com" v-model="email" >
      <input :class="{'valid': validPassword}" type="password" name="password" id="password" placeholder="Password" v-model="password" >
      <p>Email will ONLY be used as login and to inform you if you've won</p>
      <IntroStepCounter :numberOfSteps="numberOfSteps" :step="stepNumber" />
      <div @click="signUp()">
        <Button title="Sign Up" backgroundColor="green"/>
      </div>
      <span v-if="showError" class="form-error">Please correct form errors</span>
      <div @click="logIn()">
        <Button title="Log In" backgroundColor="blue"/>
      </div>
      <p @click="forgotPassword()">Forgot Password?</p>
      <p v-if="resetPasswordWarning">Please provide valid email address</p>
    </div>
    <div v-if="accountCreated">
      <h1>Account Created!</h1>
      <p>Please check your email to verify your account</p>
    </div>
    <div v-if="resetSuccess">
      <h1>Password Reset</h1>
      <p>Please check your email to create a new password</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import IntroStepCounter from '@/components/intro-step-counter/intro-step-counter-component.vue';
import Button from '@/components/button/button-component.vue';
import { Watch } from 'vue-property-decorator';

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
  public showError = false;
  public accountCreated = false;
  public resetPasswordWarning = false;
  public resetSuccess = false;
  public $auth: any;

  public async logIn() {
    if (!this.formValid) {
      this.showError = true;
      return;
    }

    this.$auth.logIn({
      email_address: this.email,
      password: this.password,
    });
  }

  public async signUp() {
    if (!this.formValid) {
      this.showError = true;
      return;
    }

    const result = this.$auth.signUp({
      email_address: this.email,
      password: this.password,
    });

    if (result) {
      this.accountCreated = true;
    }
  }

  public async forgotPassword() {
    if (!this.validEmail) {
      this.resetPasswordWarning = true;
      return;
    }

    const result = this.$auth.recovery({
      email_address: this.email,
    });

    if (result) {
      this.resetSuccess = true;
    }
  }

  @Watch('email')
  public onEmailChange(email: string) {
    this.showError = false;
  }

  @Watch('password')
  public onPasswordChange(password: string) {
    this.showError = false;
  }

  get validEmail() {
    // Super simple email validation
    // Checks if there's chars before and after @,
    // and if there's chars before and after dot
    return /^.+@.+\..+$/.test(this.email);
  }

  get validPassword() {
    return this.password.length > 6;
  }

  get formValid() {
    return this.validEmail && this.validPassword;
  }
}
</script>

