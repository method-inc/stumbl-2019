<template>
  <div class="home">
    <Map />
    <AlertBanner class="location-denied-alert" v-if="!locationPermissionActivated">
      Location denied
    </AlertBanner>
    <VenueList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Map from '@/components/map/map-component.vue';
import VenueList from '@/components/venue-list/venue-list-component.vue';
import AlertBanner from '@/components/alert-banner/alert-banner-component.vue';

@Component({
  components: {
    Map,
    VenueList,
    AlertBanner,
  },
})
export default class Home extends Vue {
  public locationPermissionActivated = false;

  public beforeMount() {
    navigator.geolocation.getCurrentPosition(
      () => { // success
        // If browser can get location, permission was granted
        this.locationPermissionActivated = true;
      },
      () => { // error
        // If it can't, permission was denied
        this.locationPermissionActivated = false;
      });
  }
}
</script>