<style lang="scss">
@import './prize-earned.scss';
</style>

<template>
  <div>
    <h1>Prize unlocked!</h1>

    <div v-if="visitCount === 4">
      <div class="trophy-banner green" />
      <img class="trophy" src="../../images/prizes/trophy-green.svg" alt="Green trophy" />
    </div>
    <div v-else-if="visitCount === 8">
      <div class="trophy-banner purple" />
      <img class="trophy" src="../../images/prizes/trophy-purple.svg" alt="Purple trophy" />
    </div>
    <div v-else-if="visitCount === 12">
      <div class="trophy-banner orange" />
      <img class="trophy" src="../../images/prizes/trophy-orange.svg" alt="Orange trophy" />
    </div>

    <hr class="top-line" />
    <div class="parent">
      <div class="prize-details-container">
        <img class="checkmark" src="../../images/checkmark.svg" alt="checkmark" />
        <div class="prize-details">
          <h3>Visit {{visitCount}} startups</h3>
          <div>Win a badass prize yo!</div>
        </div>
      </div>
    </div>
    <hr />

    <div class="prize-details-paragraph">
      You've earned a prize for visiting {{visitCount}} crawl locations.
      We've sent an email to {{personEmail}} with instructions to claim your prize.
    </div>

    <div v-on:click="goHome()">
      <Button title="Keep Crawlin" />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import router from '@/router';
import Button from '@/components/button/button-component.vue';

@Component({
  components: {
    Button,
  },
})
export default class PrizeDetails extends Vue {
  // TODO: pull these values dynamically
  public visitCount = 4;
  public personEmail = 'test@test.com';

  public goHome() {
    router.push({ name: 'home', params: { authenticated: 'true' } });
  }
}
</script>