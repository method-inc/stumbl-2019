<style lang="scss" scoped>
@import './home.scss';
</style>

<template>
  <div>
    <Header :showRewards="true" :showInfo="true" />
    <div class="home">
      <Map :all-venues="venuesToDisplay" :visited-venues="visitedVenues"/>
      <VenueListScroll>
        <Countdown />
        <AlertBanner
          class="alert-location-denied"
          :color="'green'"
          :icon="'location'"
          v-if="!locationPermissionActivated"
        >
          <a :href="locationPermissionLink || ''" target="_blank">Share your location</a> to crawl!
        </AlertBanner>
        <ProgressBanner :all-venues="allVenues" :visited-venues="visitedVenues"/>
        <div class="venue-select">
          <div :class="{'venue-select--container': true, 'selected': displayAll}" @click="updateDisplay(0)">
            <span class="venue-select--label">All Days</span>
          </div>
          <div :class="{'venue-select--container': true, 'selected': displayDayOne}" @click="updateDisplay(1)">
            <span class="venue-select--label">Tue 9/15</span>
          </div>
          <div :class="{'venue-select--container': true, 'selected': displayDayTwo}" @click="updateDisplay(2)">
            <span class="venue-select--label">Thu 9/17</span>
          </div>
        </div>
        <VenueList :all-venues="venuesToDisplay" :visited-venues="visitedVenues"/>
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
import { LocationService } from '../../services/location-service';
import { Venue } from '../../models/venue-model';
import { AlertTypeEnum } from '../../models/alert-model';

const DAY_ONE = '9/17/2019';
const DAY_TWO = '9/19/2019';

@Component<Home>({
  components: {
    Header,
    AlertBanner,
    Countdown,
    Map,
    VenueList,
    VenueListScroll,
    ProgressBanner,
  },
  props: {
    allVenues: Array,
    visitedVenues: Array,
  },
})

export default class Home extends Vue {
  public locationService = new LocationService();
  public locationPermissionActivated = false;
  public polling: any = null; // polling interval
  public allVenues: any;
  public displayAll = false;
  public displayDayOne = false;
  public displayDayTwo = false;
  public visitedVenues!: string[];


  public async created() {
    // set venue display list default for the day
    this.venueDisplayDefault();

    // parameters for geolocation.watchPosition are success, error, and options
    /// called automatically each time the position of the device changes
    const success = (location: Position) => {
      this.locationPermissionActivated = true;
      this.pollData(location);
    };
    /// error handling callback function
    const error = (e: any) => {
      // error, location permission denied
      this.locationPermissionActivated = false;
      navigator.geolocation.clearWatch(this.polling);
      this.$emit(
        'send-alert',
        AlertTypeEnum.warn,
        `Geolocation error: ${e.message}.`,
      );
    };
    /// https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
    const options = {
      enableHighAccuracy: true, // default: false
      maximumAge: 0,            // default: 0
      timeout: 8000,            // default: Infinity
    };
    this.polling = navigator.geolocation.watchPosition(success, error, options);
  }

  public beforeDestroy() {
    navigator.geolocation.clearWatch(this.polling);
  }

  private async pollData(location: Position) {
   if ((this as any).$events.stumblin()) {
    // Determing which array of venues to use
    const daySpecificVenues = (this.isDayOne) ? this.dayOneVenues : this.dayTwoVenues;
    // retrieve list of venues that have not been visited
    const venuesToCheck = daySpecificVenues.filter(
        (n: Venue) => !this.visitedVenues.includes(n.id!),
      );

    venuesToCheck.forEach((venue: Venue, index: number) => {
      this.locationService
        .isWithinGeoRadius(
          location,
          50,
          parseFloat(venue.latitude),
          parseFloat(venue.longitude),
        )
        .then((response) => {
          if (response) {
            // navigate to venue discovered
            this.goToVenueDiscovered(venue, location);
            return;
          }
        });
      });
    }
  }

  private goToVenueDiscovered(venue: Venue, location: Position) {
    // tslint:disable-next-line:max-line-length
    this.$router.push({ path: `/venue_discovered/${venue.id}/lng/${location.coords.longitude}/lat/${location.coords.latitude}` });
  }


  private isToday(someDate: Date) {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear();
  }

  private updateDisplay(selection: number) {
    if (selection === 0) {
      this.displayAll = true;
      this.displayDayOne = false;
      this.displayDayTwo = false;
    } else if (selection === 1) {
      this.displayAll = false;
      this.displayDayOne = true;
      this.displayDayTwo = false;
    } else if (selection === 2) {
      this.displayAll = false;
      this.displayDayOne = false;
      this.displayDayTwo = true;
    }
  }

  private venueDisplayDefault() {
    if (this.isDayOne) {
      this.displayDayOne = true;
    } else if (this.isDayTwo) {
      this.displayDayTwo = true;
    } else if (!this.isDayOne && !this.isDayTwo) {
      this.displayAll = true;
    }
  }

  get isDayOne() {
    return this.isToday(new Date(DAY_ONE));
  }

  get isDayTwo() {
    return this.isToday(new Date(DAY_TWO));
  }

  get dayOneVenues() {
    return this.allVenues.filter((venue: Venue) => venue.crawl_day === 1);
  }

  get dayTwoVenues() {
    return this.allVenues.filter((venue: Venue) => venue.crawl_day === 2);
  }

  get venuesToDisplay() {
    if (this.displayAll) {
      return this.allVenues;
    } else if (this.displayDayOne) {
      return this.dayOneVenues;
    } else if (this.displayDayTwo) {
      return this.dayTwoVenues;
    }
  }

  get locationPermissionLink() {
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