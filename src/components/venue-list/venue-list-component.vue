<style lang="scss">
@import "./venue-list-component.scss";
</style>

<template>
  <div class="venue-list">
    <ul>
      <li v-for="(venue, index) in venues" :key="index">
        <VenueListItem :venue="venue" />
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import VenueListItem from '@/components/venue-list/venue-list-item/venue-list-item-component.vue';
import { log } from 'util';

import venueService from '../../services/venue-service'

@Component({
  components: {
    VenueListItem,
  },
})
export default class VenueListComponent extends Vue {
  venueSevice = new venueService()
  venues = this.venueSevice.getAllVenues()
}
</script>