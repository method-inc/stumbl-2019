<style lang="scss">
  .container {
    display: inline-block;
    cursor: pointer;
  }

  .bar1, .bar2, .bar3 {
    width: 26px;
    height: 2px;
    background-color: #A9A9A9;
    margin: 6px 0;
    transition: 0.4s;
  }

  /* Rotate first bar */
  .change .bar1 {
    -webkit-transform: rotate(-45deg) translate(-5px, 3px) ;
    transform: rotate(-45deg) translate(-5px, 3px) ;
  }

  /* Fade out the second bar */
  .change .bar2 {
    opacity: 0;
  }

  /* Rotate last bar */
  .change .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px) ;
    transform: rotate(45deg) translate(-8px, -8px) ;
  }

</style>

<template>
  <div class="container" @click="myFunction()">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class MenuComponent extends Vue {
    public myFunction() {
    this.$el.classList.toggle("change");
  }
}

</script>