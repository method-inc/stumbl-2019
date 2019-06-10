<style lang="scss" scoped>
@import './intro-step-counter-component.scss';
</style>

<template>
  <div class="intro-steps">
    <span :class="{'dot': true, 'filled': step === 1}" />
    <span :class="{'dot': true, 'filled': step === 2}" />
    <span :class="{'dot': true, 'filled': step === 3}" />
    <span :class="{'dot': true, 'filled': step === 4}" />
    <span :class="{'dot': true, 'filled': step === 5}" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    step: Number,
  },
})
export default class IntroStepCounterComponent extends Vue {}
</script>

