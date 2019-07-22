<style lang="scss">
@import './progress-banner-component.scss';
</style>

<template>
  <div class="progress-banner">
    <div class="progress-banner-text">
      <strong>{{visitedVenues.length}} of {{allVenues.length}} visited</strong>
    </div>
    <div class="progress-banner-indicator">
      <span v-for="(isVisited, index) in barsArray" class="bar" :class="{'visited': isVisited}" :key="index"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { VenuesService } from '@/services/venue-service';

@Component({})
export default class ProgressBannerComponent extends Vue {
  public venuesService = new VenuesService();
  public visitedVenues = this.venuesService.visitedVenues;
  public allVenues = this.venuesService.getAllVenues();
  public barsArray = this.allVenues.map((venue, index) => {
    return index < this.visitedVenues.length;
  });
}
</script>

