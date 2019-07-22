<style lang="scss">
@import './venue-details.scss';
</style>

<template>
  <div>
    <Header/>
    <img class="venue-details--image" :src="venue.companyImage" alt="Company Image">
    <AlertBanner
      class="venue-details-checked-in-banner"
      :green="true"
      :icon="'location'"
      v-if="checkedIn">
      You checked in here!
    </AlertBanner>
    <div class="venue-details">
      <div class="venue-details--title global-title">{{venue.name}}</div>
      <div class="venue-address" v-on:click="openDirections(venue.address)">
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
import Header from '@/components/header/header-component.vue';
import AlertBanner from '@/components/alert-banner/alert-banner-component.vue';
import Button from '@/components/button/button-component.vue';

import { Venue } from '@/models/venue-model';
import { VenuesService, DEFAULT_VENUE } from '@/services/venue-service';
import { Prop } from 'vue-property-decorator';

@Component({
  components: {
    Header,
    AlertBanner,
    Button,
  },
})
export default class VenueDetails extends Vue {
  public venueSevice = new VenuesService();
  public venue: Venue = DEFAULT_VENUE;
  public checkedIn = true; // This flag will need to be updated based on the 'Enter Geofence' screen

  public beforeMount() {
    const Id: number = parseFloat(this.$route.params.venueId);
    this.venue = this.venueSevice.getSelectedVenue(Id);
  }

  public openDirections(destination: string) {
    const urlEncodedDestination = encodeURIComponent(destination);
    const fullUrlPath =
      `https://www.google.com/maps/dir/?api=1&destination=${urlEncodedDestination}&travelmode=walking`;

    window.open(fullUrlPath);
  }
}
</script>