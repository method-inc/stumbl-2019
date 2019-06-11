<style lang="scss" scoped>
@import './alert-banner-component.scss';
</style>

<template>
  <div class="alert-banner">
    Hello
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class AlertBannerComponent extends Vue {}
</script>
