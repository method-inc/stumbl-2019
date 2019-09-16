<style lang="scss">
@import './app.scss';
</style>

<template>
  <div id="app">
    <div>
      <AlertBanner v-if="showAlert" :color="alertTypeColor" :icon="'clock'">
        <strong>{{message}}</strong>
      </AlertBanner>
      <router-view @send-alert="showAlertBanner" :all-venues="allVenues" :visited-venues="visitedVenues"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setTimeout } from 'timers';
import { AlertTypeEnum } from '@/models/alert-model';
import AlertBanner from '@/components/alert-banner/alert-banner-component.vue';
import { Venue } from '@/models/venue-model';
import { User } from '@/models/user-model';
import { Watch } from 'vue-property-decorator';
import ApiService from './services/api-service';

const ALERT_TIMEOUT = 2500;
const ADMIN_VENUES = 'admin_venues';
const ROOT_ADMIN = 'root_admin';
const blankUser = {
  created_at: '',
  email_address: '',
  managed_locations: [],
  access: [],
  visited_venues: [],
};

@Component({
  components: {
    AlertBanner,
  },
})
export default class App extends Vue {
  public apiService = new ApiService();
  public userDetails: User = {...blankUser};
  public allVenues: Venue[] = [];
  public visitedVenues: string[] = [];
  public authenticated = false;
  public alertTypeColor = 'green';
  public showAlert = false;
  public message = '';

  public async beforeMount() {
    this.allVenues = await (this as any).$venues.getAllVenues();

    if (localStorage.getItem('dsw_user_token')) {
      this.authenticated = true;

      this.userDetails = await this.apiService.getUserData();
      if (!!this.userDetails.managed_locations.length) {
        localStorage.setItem(ADMIN_VENUES, JSON.stringify(this.userDetails.managed_locations));
      }
      if (this.userDetails.access.includes('admin')) {
        localStorage.setItem(ROOT_ADMIN, 'admin');
      }
    }
  }

/**
 * Method to dispaly the AlertBanner at the top of the AppComponent.
 * To call, just call `this.$emit('send-alert', AlertTypeEnum, 'YOUR MESSAGE STRING')
 * @param alertTypeEnum - A string enum to set the corresponding color value based on alert type
 * @param message - The message to display in the alert banner.
 * @param alertTimeout - DEFAULT as 2500ms
 */
  public showAlertBanner(
    alertTypeEnum: AlertTypeEnum,
    message: string,
    alertTimeout = ALERT_TIMEOUT,
  ) {
    this.alertTypeColor = alertTypeEnum.toString();
    this.showAlert = true;
    this.message = message;

    setTimeout(() => {
      this.showAlert = false;
      this.message = '';
    }, alertTimeout);
  }

  @Watch('authenticated')
  public async handleAuthChange() {
    this.visitedVenues = await (this as any).$venues.getVisitedVenues();
  }

  /**
   * After login event redirect to the home page
   */
  private handleLoginEvent() {
    this.authenticated = true;
    this.$router.push({ name: 'home' });
  }
  /**
   * After logout event redirect to the intro page
   */
  private handleLogoutEvent() {
    this.authenticated = false;
    this.$router.push({ name: 'intro' });
  }

  /**
   * After user has checked in to a venue we call the API to fetch
   * most recent checkins. This is called when that event is called
   * and updates the visited venues props so that venue isn't polled
   */
  private handleVisitedUpdate(venues: string[]) {
    this.visitedVenues = venues;
  }
}
</script>
