<template>
  <div class="home">
    <Map />
    <VenueList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Map from '@/components/map/map-component.vue';
import VenueList from '@/components/venue-list/venue-list-component.vue';

@Component({
  components: {
    Map,
    VenueList,
  },
})
export default class Home extends Vue {}
</script>