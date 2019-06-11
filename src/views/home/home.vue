<template>
  <div class="home">
    <Map />
    <AlertBanner class="alert-countdown" :yellow="true" :icon="'clock'">
      The crawl begins in <strong>{{countdownString}}</strong>
    </AlertBanner>
    <AlertBanner class="alert-location-denied" :green="true" :icon="'location'" v-if="!locationPermissionActivated">
      <!-- TODO: Link to location permissions resource for the user's current browser -->
      <a href="">Share your location</a> to crawl!
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
  public countdownString = '';

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

  public mounted() {
    // Set the date we're counting down to
    // TODO: Correct the date when we actually know it
    const countDownDate = new Date("Sep 15, 2019 16:00:00").getTime();

    // Update the count down every 1 second
    setInterval(() => {

      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the countdown date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the countdownString
      this.countdownString = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    }, 1000);

  }
}
</script>