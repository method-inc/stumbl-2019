<style lang="scss">
  .header--navbar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-menu {
      flex-basis: 33%;
    }
    &-logo {
      flex-basis: 33%;
      &-image{
        height: 100px;
      }
    }
  }

</style>

<template>
  <header class="header--navbar">
    <div class="header--navbar-menu">
      <Menu />
    </div>
    <div class="header--navbar-logo">
      <img class="header--navbar-logo-image" src="../../images/DENStartupWeek-Logo.png" alt="Denver startup week logo">
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Menu from '@/components/menu/menu-component.vue';

@Component({
  components: {
    Menu,
  },
})
export default class HeaderComponent extends Vue {}
</script>