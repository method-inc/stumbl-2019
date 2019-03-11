<style lang="scss">

</style>

<template>
  <div>
    Map goes here
    <div>{{message}}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

export default class GoogleMapComponent extends Vue {
  public message = 'Hello Google Map Comopnent';
}
</script>

