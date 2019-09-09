<style lang="scss">
@import './app.scss';
</style>

<template>
  <div id="app">
    <div>
      <AlertBanner v-if="showAlert" :color="alertTypeColor" :icon="'clock'">
        <strong>{{message}}</strong>
      </AlertBanner>
      <router-view @send-alert="showAlertBanner" :all-venues="allVenues"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setTimeout } from 'timers';
import { AlertTypeEnum } from './models/alert-model';
import AlertBanner from '@/components/alert-banner/alert-banner-component.vue';
import { VenuesService } from '@/services/venue-service';
import { Venue } from '@/models/venue-model';

const ALERT_TIMEOUT = 2500;

@Component({
  components: {
    AlertBanner,
  },
})
export default class App extends Vue {
  public venueService: VenuesService = new VenuesService();
  public allVenues: Venue[] = [];

  // TODO: Set to true when authentication is completed
  public authenticated = false;
  public alertTypeColor = 'green';
  public showAlert = false;
  public message = '';

  public async beforeMount() {
    this.allVenues = await this.venueService.getAllVenues();
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
}
</script>
