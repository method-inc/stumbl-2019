<template>
<div>
  <Header :showRewards=true :showInfo=true />
  <div class="home">
    <Map/>
    <Countdown :countdownDateString="eventStart"/>
    <AlertBanner
      class="alert-location-denied"
      :green="true"
      :icon="'location'"
      v-if="!locationPermissionActivated"
    >
      <a :href="locationPermissionLink" target="_blank">Share your location</a> to crawl!
    </AlertBanner>
    <ProgressBanner/>
    <VenueListScroll>
      <VenueList/>
    </VenueListScroll>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/header/header-component.vue';
import Map from '@/components/map/map-component.vue';
import VenueListScroll from '@/components/venue-list-scroll/venue-list-scroll-component.vue';
import VenueList from '@/components/venue-list/venue-list-component.vue';
import AlertBanner from '@/components/alert-banner/alert-banner-component.vue';
import Countdown from '@/components/countdown/countdown-component.vue';
import ProgressBanner from '@/components/progress-banner/progress-banner-component.vue';

// TODO: Correct the date when we actually know it
const START_DATE = 'Sep 15, 2019 16:00:00';

@Component({
  components: {
    Header,
    AlertBanner,
    Countdown,
    Map,
    VenueList,
    VenueListScroll,
    ProgressBanner,
  },
})
export default class Home extends Vue {
  public locationPermissionActivated = false;
  public eventStart = START_DATE;
  public locationPermissionLink = '';

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

    this.locationPermissionLink = this.getLocationPermissionLink();
  }

  private getLocationPermissionLink() {
    const isIphone = navigator.userAgent.toLowerCase().includes('iphone');
    const isAndroid = navigator.userAgent.toLowerCase().includes('android');

    if (isIphone) {
      return 'https://support.apple.com/en-us/HT207092';
    } else if (isAndroid) {
      return 'https://support.google.com/chrome/answer/114662?co=GENIE.Platform%3DAndroid&hl=en';
    } else {
      // Desktop case. Hope they're using Chrome!
      return 'https://support.google.com/chrome/answer/114662?co=GENIE.Platform%3DDesktop&hl=en';
    }
  }
}
</script>