<style lang="scss">
@import './venue-discovered.scss';
</style>

<template>
  <div class="venue-discovered">
    <div class="venue-discovered--icon">
      <img src="../../images/visited.svg" alt="discovered icon">
    </div>

    <p class="venue-discovered--sub-header">Looks like you found</p>

    <div class="venue-discovered--details">
      <div class="venue-discovered--details-title global-title">{{venue.name}}</div>
      <div class="venue-address" v-on:click="openDirections(`1801 california st, Denver Co`)">
        <img class="venue-address--image" src="../../images/location-icon.svg" alt="Location icon">
        {{venue.address}}
      </div>
      <div>
        <p class="venue-discovered--details-description">{{venue.description}}</p>
      </div>
      <Button :title="'CHECK IN'" :routerLink="`/venue/${this.venue.Id}`" class="button--background-green"/>
      <div>
      <router-link to="/home">
        <p class="venue-discovered--route-exit">I'm not at this location</p>
      </router-link>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import Button from '@/components/button/button-component.vue';

import { Venue } from '@/models/venue-model';
import { VenuesService, DEFAULT_VENUE } from '@/services/venue-service';

@Component({
  components: {
    Button,
  },
})

export default class VenueDiscovered extends Vue {
  public venueSevice = new VenuesService();
  public venue: Venue = DEFAULT_VENUE;

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