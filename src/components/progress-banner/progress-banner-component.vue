<style lang="scss">
@import './progress-banner-component.scss';
</style>

<template>
  <div class="progress-banner">
    <div class="progress-banner-text">
      <strong>You've visited {{visitedVenues.length}} of {{allVenues.length}} startups</strong>
    </div>
    <div class="progress-banner-indicator">
      <span
        v-for="(isVisited, index) in barsArray"
        class="bar"
        :class="{'visited': isVisited}"
        :key="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Venue } from '@/models/venue-model';

@Component({
  props: {
    allVenues: Array,
    visitedVenues: Array,
  },
})
export default class ProgressBannerComponent extends Vue {
  public allVenues!: Venue[];
  public visitedVenues!: string[];

  public get barsArray() {
    return this.allVenues.map((venue, index) => {
      return index < this.visitedVenues.length;
    });
  }
}
</script>

