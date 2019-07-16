<style lang="scss">
@import './trophy-banner-component.scss';
</style>

<template>
  <div class="trophy-banner" :class="{'green': green, 'purple': purple, 'orange': orange}"/>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    green: Boolean,
    purple: Boolean,
    orange: Boolean,
  },
})

export default class TrophyBannerComponent extends Vue {}
</script>
