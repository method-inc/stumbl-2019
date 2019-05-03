<style lang="scss">
@import "./venue-details.scss";
</style>

<template>
  <div>
    <img class="venue-details--image" :src="venue.companyImage" alt="Company Image">
    <div class="venue-details">   
      <div class="venue-details--title global-title">
        {{venue.name}}
      </div>
      <div class="venue-list-item--details-address">
        <img class="venue-list-item--details-address-image" src="../../images/location-icon.svg" alt="Location icon">
        {{venue.address}}
      </div>
      <div>
        <p class="header-3 venue-details--about">About</p>
        <p class="venue-details--description">
          {{venue.description}}
        </p>
      </div>
      <Button :title="'Visit Website'" :href="venue.url"/>
    </div> 
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { log } from 'util';
import Button from '@/components/button/button-component.vue';

import venueService from '../../services/venue-service'

@Component({
  components: {
    Button,
  },
})

export default class VenueDetails extends Vue {
  venueSevice = new venueService()
  venue: any;

  public beforeMount() {
    const Id: number = parseFloat(this.$route.params.venueId);
    this.venue = this.venueSevice.getSelectedVenue(Id)
  }

}
</script>