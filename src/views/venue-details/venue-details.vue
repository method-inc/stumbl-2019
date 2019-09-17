<style lang="scss">
@import './venue-details.scss';
</style>

<template>
  <div>
    <Header :showClose="true" />
    <img class="venue-details--image" :src="venue ? venue.company_img_url : ''" alt="Company Image" />
    <AlertBanner
      class="venue-details-checked-in-banner"
      :color="'green'"
      :icon="'location'"
      v-if="checkedIn"
    >You checked in here!</AlertBanner>
    <div class="venue-details">
      <div class="venue-details--title global-title">{{ venue ? venue.name : '' }}</div>
      <div class="venue-address" @click="openDirections(venue ? venue.address : '')">
        <img class="venue-address--image" src="../../images/location-icon.svg" alt="Location icon" />
        {{ venue ? venue.address : '' }}
      </div>
      <div class="admin-button-container" v-if="isVenueAdmin">
        <router-link :to="{name: 'admin-portal', params: {venueId: venue.id}}">
          <Button title="Admin Portal" backgroundColor="green"></Button>
        </router-link>
      </div>
      <div v-if="venue ? venue.special_instructions : null">
        <p class="header-2 venue-details--about">Special Instructions</p>
        <p class="venue-details--description">{{ venue ? venue.special_instructions: '' }}</p>
      </div>
      <div v-if="venue ? venue.features : null">
        <p class="header-2 venue-details--about">Features</p>
        <p class="venue-details--description">{{ venue ? venue.features : '' }}</p>
      </div>
      <div v-if="venue ? venue.description : null">
        <p class="header-2 venue-details--about">About</p>
        <p class="venue-details--description">{{ venue ? venue.description : '' }}</p>
      </div>
      <Button
        :title="'Visit Website'"
        v-if="venue ? venue.website : null"
        :href="venue ? venue.website : ''"
      />
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

const ADMIN_VENUES = 'admin_venues';
const ROOT_ADMIN = 'root_admin';

@Component({
  components: {
    Header,
    AlertBanner,
    Button,
  },
  props: {
    allVenues: Array,
    venueId: String,
    visitedVenues: Array,
  },
})
export default class VenueDetails extends Vue {
  public allVenues!: Venue[];
  public venueId!: string;
  public visitedVenues!: string[];

  get venue() {
    return this.allVenues.find((v: Venue) => v.id === this.venueId);
  }

  get checkedIn() {
    return this.visitedVenues.includes(this.venueId);
  }

  get isVenueAdmin() {
    const isRootAdmin = localStorage.getItem(ROOT_ADMIN) || 'false';
    const hasAdminVenues = localStorage.getItem(ADMIN_VENUES) || false;
    const parsedVenues = hasAdminVenues ? JSON.parse(hasAdminVenues) : [];

    return (JSON.parse(isRootAdmin) || parsedVenues.includes(this.venueId));
  }

  public openDirections(destination: string) {
    const urlEncodedDestination = encodeURIComponent(destination);
    const fullUrlPath =
      'https://www.google.com/maps/dir/?api=1&destination=' +
      urlEncodedDestination +
      '&travelmode=walking';

    window.open(fullUrlPath);
  }
}
</script>
