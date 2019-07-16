<style lang="scss">
@import './prize-earned.scss';
</style>

// todo: Kick off email once this comes into view
// todo: Pull count and email dynamically

<template>
  <div>
    <h1>Prize unlocked!</h1>

    <div v-if="visitCount === 4">
      <TrophyBanner :green="true" />
      <img class="trophy" src="../../images/prizes/trophy-green.svg" alt="Green trophy" />
    </div>
    <div v-else-if="visitCount === 8">
      <TrophyBanner :purple="true" />
      <img class="trophy" src="../../images/prizes/trophy-purple.svg" alt="Purple trophy" />
    </div>
    <div v-else-if="visitCount === 12">
      <TrophyBanner :orange="true" />
      <img class="trophy" src="../../images/prizes/trophy-orange.svg" alt="Orange trophy" />
    </div>

    <img class="line--top" src="../../images/line.svg" alt="Horizontal line" />
    <img class="checkmark" src="../../images/checkmark.svg" alt="checkmark" />
    <div class="prize-details-container">
      <h3 class="prize-details">Visit {{visitCount}} startups</h3>
      <div class="prize-details">Win a badass prize yo!</div>
    </div>
    <img class="line--bottom" src="../../images/line.svg" alt="Horizontal line" />

    <div class="prize-details-two">
      You've earned a prize for visiting {{visitCount}} crawl locations.
      We've sent an email to {{personEmail}} with instructions to claim your prize.
    </div>

    <div v-on:click="goHome()">
      <Button :title="'Keep Crawlin\''" />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import router from '@/router';
import Button from '@/components/button/button-component.vue';
import TrophyBanner from '@/components/trophy-banner/trophy-banner-component.vue';

@Component({
  components: {
    Button,
    TrophyBanner,
  },
})
export default class PrizeDetails extends Vue {
  // pull these values dynamically
  public visitCount = 8;
  public personEmail = 'test@test.com';

  public goHome() {
    router.push({ name: 'home', params: { authenticated: 'true' } });
  }
}
</script>