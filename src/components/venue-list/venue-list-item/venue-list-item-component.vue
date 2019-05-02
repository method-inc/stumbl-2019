<style lang="scss">
@import "./venue-list-item-component.scss";
</style>

<template>
  <div class="venue-list-item">
    <div class="venue-list-item--map-icon">
      <img :src="venue.mapIcon" alt="Map icon">
    </div>
    <div class="venue-list-item--details">
      <div class="venue-list-item--details-name">
        {{venue.name}}
      </div>
      <div class="venue-list-item--details-address">
        <img class="venue-list-item--details-address-image" src="../../../images/location-icon.svg" alt="Location icon">
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

export default class VenueListItemComponent extends Vue {}
</script>