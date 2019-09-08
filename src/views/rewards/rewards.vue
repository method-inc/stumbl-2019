<style lang="scss">
@import './rewards.scss';
</style>

<template>
  <div>
    <Header :showClose="true" />
    <div class="rewards">
      <h1 class="header-2">Your Rewards</h1>
      <p class="rewards-email">{{email}}</p>
      <ProgressBannerComponent />
      <RewardDetails
        :title="'Visit 1'"
        :subTitle="'One entry to win'"
        :unLocked="this.visitedVenues.length ? true : false"
      />
      <RewardDetails
        :title="'Visit 3'"
        :subTitle="'Two entries to win'"
        :unLocked="this.visitedVenues.length > 2 ? true : false"
      />
      <RewardDetails
        :title="'Visit 5'"
        :subTitle="'Three entries to win'"
        :unLocked="this.visitedVenues.length > 4 ? true : false"
      />
      <RewardDetails
        :title="'Visited all'"
        :subTitle="'Three entries to win'"
        :unLocked="this.visitedVenues.length === this.allVenues.length ? true : false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Header from '@/components/header/header-component.vue';
import ProgressBannerComponent from '@/components/progress-banner/progress-banner-component.vue';
import RewardDetails from '@/components/rewards-details/reward-details.vue';
import { VenuesService } from '@/services/venue-service';
import { log } from 'util';
import { Venue } from '@/models/venue-model';

@Component({
  components: {
    Header,
    ProgressBannerComponent,
    RewardDetails,
  },
})
export default class Rewards extends Vue {
  public email = 'test@test.com';
  public venuesService = new VenuesService();
  public visitedVenues = this.venuesService.visitedVenues;
  public allVenues: Venue[] = [];

  public async mounted() {
    this.allVenues = await this.venuesService.getAllVenues();
  }
}
</script>

