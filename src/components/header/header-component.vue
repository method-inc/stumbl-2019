<style lang="scss">
@import "./header-component.scss";
</style>

<template>
  <header>
    <nav class="header--nav">
      <router-link class="header--nav-logo" to="/home">
        <img src="../../images/dsw_logo.svg" alt="Denver startup week logo">
      </router-link>
      <router-link class="header--nav-rewards-icon"  v-if="showRewards" to="/rewards">
        <img src="../../images/rewards_icon.svg" alt="Points icon">
      </router-link>
      <router-link v-if="showInfo" to="/about">
        <img src="../../images/info_icon.svg" alt="Info icon">
      </router-link>
      <router-link v-if="showClose" to="/home">
        <img src="../../images/close_page_icon.svg" alt="Close page icon">
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    showClose: {
      default: false,
      type: Boolean,
    },
    showRewards: {
      default: false,
      type: Boolean,
    },
    showInfo: {
      default: false,
      type: Boolean,
    },
  },
})
export default class HeaderComponent extends Vue {
  private $auth: any;

  public logout() {
    this.$auth.logOut();
  }
}
</script>