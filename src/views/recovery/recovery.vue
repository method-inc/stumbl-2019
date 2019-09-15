<style lang="scss" scoped>
@import './recovery.scss';
</style>

<template>
  <div class="recovery">
      <div class="intro-logo">
        <img src="../../images/dsw_logo.svg" alt="denver startup week logo">
      </div>
      <div class="recovery-content">
        <h1>Reset Password</h1>
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
    recoveryId: String,
  },
})
export default class Reset extends Vue {
  public password = '';
  public passwordConfirmation = '';
  public showError = false;
  public recoveryId!: string;
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

    this.$auth.reset({
      recovery_id: this.recoveryId,
      password: this.password.trim(),
      password_confirmation: this.passwordConfirmation.trim(),
    });
  }

  get validPassword() {
    return this.password.length > 6 && !this.password.includes(' ');
  }

  get validConfirm() {
    return this.password === this.passwordConfirmation && this.password !== '';
  }

  get formError() {
    return this.validConfirm && this.validPassword;
  }
}
</script>

