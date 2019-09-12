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

interface StumblEvent {
  startTime: string;
  endTime: string;
}

/**
 * ACTIVE => Countdown is running and visible
 * INACTIVE => Countdown is not visible, currently in the middle of event
 * DISABLED => There are no other events, no need for a countdown
 */
enum CountdownState {
  ACTIVE,
  INACTIVE,
  DISABLED,
}

@Component({
  components: {
    AlertBanner,
  },
})
export default class CountdownComponent extends Vue {
  public countdownString = '';
  private currentEvent: StumblEvent | undefined = undefined;
  private currentEventIndex: number = 0;
  private countdownState: CountdownState = CountdownState.INACTIVE;

  public mounted() {
    this.currentEvent = (this as any).$events.getNextEvent(this.currentEventIndex);
    let countdownDate: number;

    if (this.currentEvent !== undefined) {
      countdownDate = new Date(this.currentEvent.startTime).getTime();
    }

    // Update the count down every 1 second
    setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // if the event is not valid and the countdown has not been disabled, find another valid event
      if (!this.isValidEvent(now, this.currentEvent) && this.countdownState !== CountdownState.DISABLED) {

        // Check if the current event is valid, otherwise check for the next event;
        while (!this.isValidEvent(now, this.currentEvent)) {
          this.currentEventIndex++;
          this.currentEvent = (this as any).$events.getNextEvent(this.currentEventIndex);

          // If the event is undefined we have exhausted our events and must break out;
          if (this.currentEvent === undefined) {
            break;
          }
        }
      } else {
        if (this.currentEvent !== undefined) {
          countdownDate = new Date(this.currentEvent.startTime).getTime();
        }
      }

      // Set the state of the countdown
      this.setCountdownState(now, this.currentEvent);

      // skip math if the current date is past the countdownDate
      if (this.countdownState === CountdownState.INACTIVE || this.countdownState === CountdownState.DISABLED) {
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
    return this.countdownState === CountdownState.ACTIVE;
  }

  /**
   * Check to is if event is valid.
   * If our time is before or between the start and end time then the event is valid.
   * If it is after the end time then the event is not valid.
   * If the event is undefined, it is not valid.
   */
  private isValidEvent(currentDate: number, event?: StumblEvent): boolean {
    if (event === undefined) {
      return false;
    }

    const startTimeInMilli = new Date(event.startTime).getTime();
    const endTimeInMilliseconds = new Date(event.endTime).getTime();

    const isBeforeStartOfEvent = currentDate <= startTimeInMilli;
    const isDuringEvent = (currentDate >= startTimeInMilli && currentDate <= endTimeInMilliseconds);

    if (isBeforeStartOfEvent || isDuringEvent) {
      return true;
    }

    return false;
  }

  /**
   * Set the state of the countdown based upon the current event
   */
  private setCountdownState(currentDate: number, event?: StumblEvent) {
    if (event === undefined) {
      this.countdownState = CountdownState.DISABLED;
      return;
    }

    const startTimeInMilli = new Date(event.startTime).getTime();
    const endTimeInMilliseconds = new Date(event.endTime).getTime();
    const isBeforeStartOfEvent = currentDate <= startTimeInMilli;

    if (isBeforeStartOfEvent) {
      this.countdownState = CountdownState.ACTIVE;
    } else {
      this.countdownState = CountdownState.INACTIVE;
    }
  }
}
</script>
