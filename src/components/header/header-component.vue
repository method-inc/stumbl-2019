<style lang="scss">
@import "./header-component.scss";
</style>

<template>
  <header>
    <div class="header--nav">
      <router-link class="header--nav-logo" to="/">
        <img src="../../images/DSW-Logo.svg" alt="Denver startup week logo">
      </router-link>
      <router-link to="/points">
        <img src="../../images/Points-Icon.svg" alt="Points Icon">
      </router-link>
      <router-link to="/about">
        <img src="../../images/Info-Icon.svg" alt="Info Icon">
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class HeaderComponent extends Vue {}
</script>