<style lang="scss">
@import './counter-component.scss';
</style>

<template>
  <div class="counter">
    <h3>Counter</h3>
    <label class="counter__label">{{count}}</label>
    <div>
    <button class="counter__button" @click="increment()">Increment Count</button>
    <button class="counter__button" @click="decrement()">Decrement Count</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Counter extends Vue {
  public count = 0;

  public increment() {
    this.count++;
  }

  public decrement() {
    this.count--;
  }
}
</script>