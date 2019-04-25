<style lang="scss">
@import "./map-container-component.scss";
</style>

<template>
  <div id="map">
    <div class="map-hidden-alert" v-if="!mapLoaded">
      The map is probably not broken, the mapbox access token 
      is just commented out to reduce API requests during dev.<br/>
      Uncomment the Access Token in the MapContainer Component
      if you'd like to see it!
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import mapboxgl, { MapboxOptions, LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * ⚠️ ️⚠️ ⚠️ ️⚠️ ⚠️ ️⚠️ ⚠️ ️⚠️ ⚠️ ️⚠️ ⚠️ ️⚠️
 * ---------HEY, SKOOKUM DEV!!------------
 * 
 * In an effort to reduce API calls during 
 * development, leave the map access token
 * commented out unless you are explicitly
 * working on the functionality of the map
 * 
 * This will keep us on a free tier 
 * for the Mapbox API (less than 50k req)
 * 
 * TODO: 
 * Uncomment this access token for prod
 * ---------------------------------------
 */

// ⚠️PR REVIEWERS - Make sure this is commented out before merge!
// mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_KEY as string;

interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[] | LngLatLike;
  };
  properties: {
    title: string;
    description: string;
  };
}

@Component({})

export default class MapContainerComponent extends Vue {
  public mapLoaded = false;
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
    if (!this.mapLoaded && mapboxgl.accessToken) {
      const map = new mapboxgl.Map(this.mapboxOptions);
      map.addControl(new mapboxgl.NavigationControl());
      this.loadMarkers(map);

      // Assures that the map is only loaded once
      //  so we are less likely to hit our free-tier api request limit
      // 
      // ...but it still can be loaded multiple 
      //  times per session if route is reloaded...
      //
      //  TODO: Load map globally only once
      this.mapLoaded = true;
    }
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
          coordinates: [-104.9890, 39.7480], // 1801 California St, Denver
        },
        properties: {
          title: 'Skookum',
          description: 'Skook City USA',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-104.9891, 39.7481], // right next to 1801 California St, Denver
        },
        properties: {
          title: 'Jimmy Johns',
          description: 'Denver, CO',
        },
      }],
    };

    geojson.features.forEach((marker: GeoJsonFeature) => {
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