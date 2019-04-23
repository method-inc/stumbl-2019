<style lang="scss">
@import "./venue-component.scss";
</style>

<template>
  <div class="venue">
    <div class="venue--map-icon">
      <img src="../../../images/map-icon.svg" alt="Map icon">
    </div>
    <div class="venue--details">
      <div class="venue--details-name">
        {{venue.name}}
      </div>
      <div class="venue--details-address">
        <img class="venue--details-address-image" src="../../../images/location-icon.svg" alt="Location icon">
        {{venue.address}}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    venue: Object,
  },
})

export default class VenueComponent extends Vue {}
</script>