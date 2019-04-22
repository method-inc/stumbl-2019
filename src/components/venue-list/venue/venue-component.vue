<style lang="scss">
@import "./venue-component.scss";
</style>

<template>
  <div>
    <ul>
      <li v-for="(venue, index) in venues" :key="index">
        {{ venue.name }}
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class VenueComponent extends Vue {
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