<style lang="scss">
@import "./map-container-component.scss";
#map {
  height: 500px;
  width: 100%;
  display: block;
}
</style>

<template>
  <div id="map">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicHJvd2UiLCJhIjoiY2p0ZXB3NGZ3MDdnNzQ0bnV2OW9sdWthMyJ9.r8ldYBDjW7ZsJ-GNKelFxQ';

@Component({})

export default class MapContainerComponent extends Vue {
  public message = 'Hello MapContainer Component';

  private mounted() {
    this.createMap();
  }

  private createMap() {
    new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/prowe/cjtet6cwy58qo1fqrowfu9t4i',
      center: [-75.911136, 42.097267],
      zoom: 13.0,
    });
  }
}
</script>