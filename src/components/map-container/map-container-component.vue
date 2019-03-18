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
  /**
   * This component leverages `Mapbox GL JS`
   * Mapbox GL JS documentation:  https://docs.mapbox.com/mapbox-gl-js/api/
   * Tutorials:                   https://docs.mapbox.com/help/tutorials/
   */

  // Default options for map to load
  public mapboxOptions: MapboxOptions = {
    // ID of container element that will host the map
    container: 'map',

    // Custom style for coloring the map
    // Can be changed in Mapbox Studio using Paul's credentials
    style: 'mapbox://styles/prowe/cjtet6cwy58qo1fqrowfu9t4i', 

    center: [-104.9890, 39.7480], // 1801 California Street, Denver CO
    zoom: 15.0,
  };

  // Lifecycle hook
  private mounted() {
    this.createMap();
  }

  // Build the Mapbox instance and draw the map
  private createMap() {
    const map = new mapboxgl.Map(this.mapboxOptions);
    map.addControl(new mapboxgl.NavigationControl());
    this.loadMarkers(map);
  }

  // Load and place location markers on the map
  private loadMarkers(map: mapboxgl.Map) {
    // TODO: These are sample data points to test markers.  Replace with points from database.
    const geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-104.9890, 39.7480] // 1801 California St, Denver
        },
        properties: {
          title: 'Skookum',
          description: 'Skook City USA'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-104.9891, 39.7481] // right next to 1801 California St, Denver
        },
        properties: {
          title: 'Jimmy Johns',
          description: 'Denver, CO'
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