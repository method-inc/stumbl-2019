<style lang="scss">
@import './venue-list-component.scss';
</style>

<template>
  <div class="venue-list">
    <ul>
      <li v-for="(venue, index) in allVenues" :key="index">
        <VenueListItem :venue="venue" :index="index" />
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
  props: {
    allVenues: Array,
  },
})
export default class VenueListComponent extends Vue {}
</script>
