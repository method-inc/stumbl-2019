<style lang="scss">
@import "./venue-details.scss";
</style>

<template>
  <div>
    <div v-if="!venue">
      Loading...
    </div>

    <div class="venue-details" v-else>
      {{venue.name}}
      {{venue.address}}
      <!-- <Button :title="'Visit Website'" :href="'{{venue.url}}'"/> -->
    </div>
    
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { log } from 'util';

import venueService from '../../services/venue-service'

@Component({

})

export default class VenueDetails extends Vue {
  venueSevice = new venueService()
  venue: any;

  public async beforeMount() {
    const Id: number = await parseFloat(this.$route.params.venueId);
    this.venue = this.venueSevice.getSelectedVenue(Id)
    console.log(this.venue);
  }

}
</script>