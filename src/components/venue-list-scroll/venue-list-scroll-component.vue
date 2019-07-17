<style lang="scss">
@import './venue-list-scroll-component.scss';
</style>

<template>
  <div class="venue-list-scroll">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class VenueListScrollComponent extends Vue {}
</script>
