<style lang="scss" scoped>
@import './intro-step-counter-component.scss';
</style>

<template>
  <div class="intro-steps">
    <span v-for="n in numberOfSteps"  v-bind:key="`step-counter${n}`" :class="{'dot': true, 'dot--filled': step === n}"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    numberOfSteps: Number,
    step: Number,
  },
})
export default class IntroStepCounterComponent extends Vue {}
</script>

