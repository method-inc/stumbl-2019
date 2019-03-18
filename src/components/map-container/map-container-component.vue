<style lang="scss">
@import "./map-container-component.scss";
@import url('https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css');
</style>

<template>
  <div id="map"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import mapboxgl, { MapboxOptions } from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicHJvd2UiLCJhIjoiY2p0ZXB3NGZ3MDdnNzQ0bnV2OW9sdWthMyJ9.r8ldYBDjW7ZsJ-GNKelFxQ';

@Component({})

export default class MapContainerComponent extends Vue {
  public mapboxOptions: MapboxOptions = {
      container: 'map',
      style: 'mapbox://styles/prowe/cjtet6cwy58qo1fqrowfu9t4i',
      center: [-104.9890, 39.7480], // 1801 California Street, Denver CO
      zoom: 15.0,
    };

  private mounted() {
    this.createMap();
  }

  private createMap() {
    const map = new mapboxgl.Map(this.mapboxOptions);
    map.addControl(new mapboxgl.NavigationControl());
    this.loadMarkers(map);
  }

  private loadMarkers(map: mapboxgl.Map) {
    var geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-104.9890, 39.7480]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-104.9891, 39.7481]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      }]
    };

    geojson.features.forEach((marker) => {

      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates as mapboxgl.LngLatLike)
        .addTo(map);
    });
  }
}
</script>