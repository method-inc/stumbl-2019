<style lang="scss">
@import "./venue-list-item-component.scss";
</style>

<template>
  <div class="venue-list-item">
    <div class="venue-list-item--map-icon">
      <img v-if="visitedVenue()" src="../../../images/checkmark.svg" alt="Checkmark"/>
      <div v-else>{{mapIconLabel()}}</div>
    </div>
    <div class="venue-list-item--details">
      <div class="venue-list-item--details-name header-1">
        {{venue.name}}
      </div>
      <div class="venue-list-item--details-address venue-address">
        <img class="venue-address--image" src="../../../images/location-icon.svg" alt="Location icon">
        {{venue.address}}
      </div>
    </div>
    <router-link class="venue-list-item--router-link"  :to="'/venue/' + venue.id">
    </router-link>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { VenuesService } from '@/services/venue-service';

@Component({
  props: {
    venue: Object,
    index: Number,
  },
})

export default class VenueListItemComponent extends Vue {
  @Prop()
  public index!: number;
  public venuesService = new VenuesService();
  public visitedVenues = this.venuesService.visitedVenues;

  public visitedVenue() {
    if (this.visitedVenues.includes(this.index)) {
      return true;
    } else {
      return false;
    }
  }

  public mapIconLabel = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[this.index];
  }
}
</script>
