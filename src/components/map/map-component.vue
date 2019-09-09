<style lang="scss">
@import "./map-component.scss";
</style>

<template>
  <div class="map">
    <MapContainer :all-venues="allVenues"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MapContainer from '@/components/map-container/map-container-component.vue';

@Component({
  components: {
    MapContainer,
  },
  props: {
    allVenues: Array,
  },
})
export default class MapComponent extends Vue {}
</script>