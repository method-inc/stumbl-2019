<template>
  <AlertBanner v-if="showCountdown" :yellow="true" :icon="'clock'">
    The crawl begins in
    <strong>{{countdownString}}</strong>
  </AlertBanner>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AlertBanner from '@/components/alert-banner/alert-banner-component.vue';

@Component({
  components: {
    AlertBanner,
  },
  props: {
    countdownDate: String,
  },
})
export default class CountdownComponent extends Vue {
  public countdownString = '';

  public mounted() {
    // Set the date we're counting down to
    const countDownDate = new Date(this.$props.countdownDate).getTime();

    // Update the count down every 1 second
    setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // if the event has already started, let's get out of here
      if (countDownDate < now) {
        this.countdownString = '';
        return;
      }

      // Find the distance between now and the countdown date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the countdownString
      this.countdownString =
        days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
    }, 1000);
  }

  /**
   * Hide the countdown timer if the event has already started.
   */
  get showCountdown(): boolean {
    return this.countdownString !== '';
  }
}
</script>
