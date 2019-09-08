<style lang="scss">
@import './rewards.scss';
</style>

<template>
  <div>
    <Header :showClose="true" />
    <div class="rewards">
      <h1 class="header-2">Your Rewards</h1>
      <ProgressBannerComponent />
      <RewardDetails
        :title="'Visit 3'"
        :subTitle="'One entry to win'"
        :unLocked="this.visitedVenues.length > 2 ? true : false"
      />
      <RewardDetails
        :title="'Visit 8'"
        :subTitle="'Two entries to win'"
        :unLocked="this.visitedVenues.length > 7 ? true : false"
      />
      <RewardDetails
        :title="'Visit all 12'"
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

@Component({
  components: {
    Header,
    ProgressBannerComponent,
    RewardDetails
  }
})
export default class Rewards extends Vue {
  public venuesService = new VenuesService();
  public visitedVenues = this.venuesService.visitedVenues;
  public allVenues = this.venuesService.getAllVenues();

  public beforeMount() {
    console.log(this.visitedVenues.length);
    console.log(this.allVenues.length);
  }
}
</script>

