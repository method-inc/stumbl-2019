<style lang="scss">
@import './venue-details.scss';
</style>

<template>
  <div>
    <img class="venue-details--image" :src="venue.companyImage" alt="Company Image">
    <div class="venue-details">
      <div class="venue-details--title global-title">{{venue.name}}</div>
      <div class="venue-address">
        <img class="venue-address--image" src="../../images/location-icon.svg" alt="Location icon">
        {{venue.address}}
      </div>
      <div>
        <p class="header-2 venue-details--about">About</p>
        <p class="venue-details--description">{{venue.description}}</p>
      </div>
      <Button :title="'Visit Website'" :href="venue.url"/>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import Button from '@/components/button/button-component.vue';

import { Venue } from '@/models/venue-model';
import { VenuesService, DEFAULT_VENUE } from '@/services/venue-service';
import { Prop } from 'vue-property-decorator';

@Component({
  components: {
    Button,
  },
})
export default class VenueDetails extends Vue {
  public venueSevice = new VenuesService();
  public venue: Venue = DEFAULT_VENUE;

  public beforeMount() {
    const Id: number = parseFloat(this.$route.params.venueId);
    this.venue = this.venueSevice.getSelectedVenue(Id);
  }
}
</script>