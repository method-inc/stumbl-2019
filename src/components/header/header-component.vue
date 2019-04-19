<style lang="scss">
@import "./header-component.scss";
</style>

<template>
  <header>
    <nav class="header--nav">
      <router-link class="header--nav-logo" to="/">
        <img src="../../images/dsw-logo.svg" alt="Denver startup week logo">
      </router-link>
      <router-link  v-if="!['about', 'rewards'].includes($route.name)"  to="/rewards">
        <img src="../../images/rewards-icon.svg" alt="Points icon">
      </router-link>
      <router-link v-if="!['about', 'rewards'].includes($route.name)" to="/about">
        <img src="../../images/info-icon.svg" alt="Info icon">
      </router-link>
      <router-link v-if="['about', 'rewards'].includes($route.name)" to="/">
        <img src="../../images/close-page-icon.svg" alt="Close page icon">
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class HeaderComponent extends Vue {
}
</script>