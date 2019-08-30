<template>
  <AlertBanner v-if="showCountdown" :color="'yellow'" :icon="'clock'">
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
    countdownDateString: String,
  },
})
export default class CountdownComponent extends Vue {
  public countdownString = '';

  public mounted() {
    // Set the date we're counting down to
    const countdownDate = new Date(this.$props.countdownDateString).getTime();

    // Update the count down every 1 second
    setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // skip math if the current date is past the countdownDate
      if (countdownDate < now) {
        this.countdownString = '';
        return;
      }

      // Find the distance between now and the countdown date
      const distance = countdownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);


      // Display the result in the countdownString
      this.countdownString = '';
      this.countdownString += days > 0 ? days + 'd ' : '';
      this.countdownString += hours > 0 ? hours + 'h ' : '';
      this.countdownString += minutes > 0 ? minutes + 'm ' : '';
      this.countdownString += seconds > 0 ? seconds + 's ' : '';
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
