<style lang="scss">

</style>

<template>
  <div>
    Map goes here
    <div>{{message}}</div>
    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import googleMapsInit from './google-map-init';
import * as GoogleMaps from 'vue2-google-maps';

const API_KEY = 'AIzaSyD3WdTxeTZ9YGZw8SrMyuuG7A2c7dPrltc';

Vue.use(GoogleMaps, {
  load: {
    key: API_KEY,
    libraries: '',
  },
});

export default class GoogleMapComponent extends Vue {
  public message = 'Hello Google Map Component';

}
</script>

