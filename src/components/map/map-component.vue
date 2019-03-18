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

export default class MapComponent extends Vue {
  public message = 'Hello Map Component';

}
</script>

