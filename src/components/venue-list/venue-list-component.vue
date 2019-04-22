<style lang="scss">
@import "./venue-list-component.scss";
</style>

<template>
  <div>
    <ul>
      <li v-for="(venue, index) in venues" :key="index">
        <Venue  />
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
      ],
    };
  }
}
</script>