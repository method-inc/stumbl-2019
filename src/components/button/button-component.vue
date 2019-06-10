<style lang="scss">
@import "./button-component.scss";
</style>

<template>
  <button  class="button" :class="{'buttonBackgroundWhite': whiteBackground, 'buttonBackgroundGreen': greenBackground, 'buttonBackgroundBlue': blueBackground,}">
    <img v-if="showImage" src="../../images/skookum-logo.svg" alt="Skookum Logo" class="button--image">
    <p class="button--text">{{title}}</p>
    <router-link v-if="routerLink" class="button--router-link" :to="routerLink">
    </router-link>
    <a v-if="href" class="button--router-link" :href="href"  target="_blank">
    </a>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    title: String,
    routerLink: {
      default: '',
      type: String,
    },
    href: {
      default: '',
      type: String,
    },
    whiteBackground: Boolean,
    greenBackground: Boolean,
    blueBackground: Boolean,
    showImage: Boolean,
    },
  })
export default class ButtonComponent extends Vue {}
</script>