<style lang="scss">
@import "./venue-list-component.scss";
</style>

<template>
  <div class="venue-list">
    <ul>
      <li v-for="(venue, index) in venues" :key="index">
        <Venue :venue="venue" />
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import Venue from '@/components/venue-list/venue/venue-component.vue';

@Component({
  components: {
    Venue,
  },
})
export default class VenueListComponent extends Vue {
 public data() {
    return {
      venues: [
        {
          name: 'Signpost',
          address: '2363 Blake St',
        },
        {
          name: 'Skookum',
          address: '1801 California St.',
        },
        {
          name: 'Super long startup name that doesnt fit on the screen in one line',
          address: '2120 Market St.',
        },
      ],
    };
  }
}
</script>