<style lang="scss">
@import "./button-component.scss";
</style>

<template>
  <div class="button" :class="{'buttonBackgroundWhite': whiteBackground, 'buttonBackgroundGreen': greenBackground,}">
    <img v-if="showImage" src="../../images/skookum-logo.svg" alt="Skookum Logo">
    <p class="button--text">{{title}}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    title: String,
    href: String,
    routerLink: String,
    whiteBackground: Boolean,
    greenBackground: Boolean,
    showImage: Boolean
    }
  })
export default class ButtonComponent extends Vue {}
</script>