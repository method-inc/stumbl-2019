<template>
  <div class="home">
    <Map/>
    <Countdown :countdownDateString="eventStart"/>
    <AlertBanner
      class="alert-location-denied"
      :green="true"
      :icon="'location'"
      v-if="!locationPermissionActivated"
    >
      <!-- TODO: Link to location permissions resource for the user's current browser -->
      <a href>Share your location</a> to crawl!
    </AlertBanner>
    <ProgressBanner/>
    <VenueList/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Map from '@/components/map/map-component.vue';
import VenueList from '@/components/venue-list/venue-list-component.vue';
import AlertBanner from '@/components/alert-banner/alert-banner-component.vue';
import Countdown from '@/components/countdown/countdown-component.vue';
import ProgressBanner from '@/components/progress-banner/progress-banner-component.vue';

// TODO: Correct the date when we actually know it
const START_DATE = 'Sep 15, 2019 16:00:00';

@Component({
  components: {
    AlertBanner,
    Countdown,
    Map,
    VenueList,
    ProgressBanner,
  },
})
export default class Home extends Vue {
  public locationPermissionActivated = false;
  public eventStart = START_DATE;

  public beforeMount() {
    navigator.geolocation.getCurrentPosition(
      () => {
        // success
        // If browser can get location, permission was granted
        this.locationPermissionActivated = true;
      },
      () => {
        // error
        // If it can't, permission was denied
        this.locationPermissionActivated = false;
      },
    );
  }
}
</script>