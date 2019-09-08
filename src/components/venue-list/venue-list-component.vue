<style lang="scss">
@import './venue-list-component.scss';
</style>

<template>
  <div class="venue-list">
    <ul>
      <li v-for="(venue, index) in venues" :key="index">
        <VenueListItem :venue="venue" :index="index" />
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import VenueListItem from '@/components/venue-list/venue-list-item/venue-list-item-component.vue';

import { VenuesService } from '../../services/venue-service';
import { Venue } from '@/models/venue-model';

@Component({
  components: {
    VenueListItem,
  },
})
export default class VenueListComponent extends Vue {
  public venueSevice: VenuesService = new VenuesService();
  public venues: Venue[] = [];

  public async mounted() {
    this.venues = await this.venueSevice.getAllVenues();
  }
}
</script>
