<style lang="scss">
@import "./venue-list-component.scss";
</style>

<template>
  <div class="venue-list">
    <ul>
      <li v-for="(venue, index) in venues" :key="index">
        <VenueListItem :venue="venue" />
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import VenueListItem from '@/components/venue-list/venue-list-item/venue-list-item-component.vue';

@Component({
  components: {
    VenueListItem,
  },
})
export default class VenueListComponent extends Vue {
 public data() {
    return {
      venues: [
        {
          name: 'Signpost',
          address: '2363 Blake St',
          mapIcon: require('../../images/map-icons/signpost-map-icon.svg'),
        },
        {
          name: 'Skookum',
          address: '1801 California St.',
          mapIcon: require('../../images/map-icons/skookum-map-icon.svg'),
        },
        {
          name: 'Super long startup name that doesnt fit on the screen in one line',
          address: '2120 Market St.',
          mapIcon: require('../../images/map-icons/supperLongName-map-icon.svg'),
        },
      ],
    };
  }
}
</script>