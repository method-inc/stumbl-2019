<style lang="scss">
@import './venue-discovered.scss';
</style>

<template>
  <div>
    <Header/>
    <div class="venue-discovered">
      <div class="venue-discovered--icon">
        <img src="../../images/visited.svg" alt="discovered icon">
      </div>

      <p class="venue-discovered--sub-header">Looks like you found</p>

      <div class="venue-discovered--details">
        <div class="venue-discovered--details-title global-title">{{ venue ? venue.name : '' }}</div>
        <div class="venue-address" @click="openDirections(venue ? venue.address : '' )">
          <img class="venue-address--image" src="../../images/location-icon.svg" alt="Location icon">
          {{ venue ? venue.address : '' }}
        </div>
        <div>
          <p class="venue-discovered--details-description">{{ venue ? venue.description : ''}}</p>
        </div>
        <div @click="checkin()">
          <Button title="CHECK IN" class="button--background-green" @click="checkin()"/>
        </div>
        <div>
        <router-link to="/home">
          <p class="venue-discovered--route-exit">I'm not at this location</p>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import Header from '@/components/header/header-component.vue';
import Button from '@/components/button/button-component.vue';

import { Venue } from '@/models/venue-model';

@Component({
  components: {
    Button,
    Header,
  },
  props: {
    allVenues: Array,
    venueId: String,
    lng: String,
    lat: String,
  },
})

export default class VenueDiscovered extends Vue {
  public allVenues!: Venue[];
  public venueId!: string;
  public lng!: string;
  public lat!: string;

  get venue() {
    return this.allVenues.find((v: Venue) => v.id === this.venueId );
  }

  public async checkin() {
    const checkedIn = await (this as any).$venues.checkin({
      venueId: this.venueId,
      latitude: this.lat,
      longitude: this.lng,
    });

    if (checkedIn) {
      this.$router.push({ name: 'venue', params: { venueId: this.venueId }});
    }
  }

  public openDirections(destination: string) {
    const urlEncodedDestination = encodeURIComponent(destination);
    const fullUrlPath =
      `https://www.google.com/maps/dir/?api=1&destination=${urlEncodedDestination}&travelmode=walking`;

    window.open(fullUrlPath);
  }
}
</script>