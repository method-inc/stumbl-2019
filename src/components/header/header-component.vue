<style lang="scss">
@import "./header-component.scss";
</style>

<template>
  <header>
    <nav class="header--nav">
      <router-link class="header--nav-logo" to="/">
        <img src="../../images/dsw_logo.svg" alt="Denver startup week logo">
      </router-link>
      <router-link class="header--nav-rewards-icon"  v-if="!routes.includes($route.name)" to="/rewards">
        <img src="../../images/rewards_icon.svg" alt="Points icon">
      </router-link>
      <router-link v-if="!routes.includes($route.name)" to="/about">
        <img src="../../images/info_icon.svg" alt="Info icon">
      </router-link>
      <router-link v-if="routes.includes($route.name)" to="/">
        <img src="../../images/close_page_icon.svg" alt="Close page icon">
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class HeaderComponent extends Vue {
  routes = ['about', 'rewards', 'venue']
}
</script>