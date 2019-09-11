<style lang="scss" scoped>
@import './confirmation.scss';
</style>

<template>
  <div class="confirmation">
      <div class="intro-logo">
        <img src="../../images/dsw_logo.svg" alt="denver startup week logo">
      </div>
      <div class="confirmation-content">
        <h1>Confirm Account</h1>
        <p>Please enter and confirm and your password to start Stumblin'!</p>
        <input class="first" :class="{'valid': validPassword}" type="password" name="password" id="password" placeholder="Password" v-model="password" >
        <input :class="{'valid': validConfirm}" type="password" name="password_confirmation" id="password_confirmation" placeholder="Password Confirmation" v-model="passwordConfirmation" >
        <button @click="submit()">
          <Button title="Confirm" backgroundColor="green"/>
        </button>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import router from '@/router';

import Button from '@/components/button/button-component.vue';
import { Watch } from 'vue-property-decorator';

@Component({
  components: {
    Button,
  },
  props: {
    confirmationId: String,
  },
})
export default class Confirmation extends Vue {
  public password = '';
  public passwordConfirmation = '';
  public showError = false;
  public confirmationId!: string;
  public $auth: any;

  @Watch('password')
  public onPasswordChange(password: string) {
    this.showError = false;
  }

  @Watch('passwordConfirm')
  public onPasswordConfirmationChange(passwordConfirmation: string) {
    this.showError = false;
  }

  public async submit() {
    if (!this.formError) {
      this.showError = true;
      return;
    }

    this.$auth.confirmation({
      confirmation_id: this.confirmationId,
      password: this.password,
      password_confirmation: this.passwordConfirmation,
    });
  }

  get validPassword() {
    return this.password.length > 6;
  }

  get validConfirm() {
    return this.password === this.passwordConfirmation && this.password !== '';
  }

  get formError() {
    return this.validConfirm && this.validPassword;
  }
}
</script>

