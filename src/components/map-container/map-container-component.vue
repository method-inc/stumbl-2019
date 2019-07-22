<style lang="scss">
@import "./map-container-component.scss";
</style>

<template>
  <div id="map">
    <div class="map-hidden-alert" v-if="!mapLoaded">
      The map is probably not broken, the mapbox access token 
      is just commented out to reduce API requests during dev.<br/><br/>
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
import { VenuesService } from '@/services/venue-service';

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_KEY as string;

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
  public venuesService = new VenuesService();
  public mapLoaded = false;
  public markers: mapboxgl.Marker[] = [];
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
    zoom: 13.0,
  };

  // Lifecycle hook
  private mounted() {
    this.createMap();
  }

  // Build the Mapbox instance and draw the map
  private createMap() {
    if (!this.mapLoaded && mapboxgl.accessToken) {
      const map = new mapboxgl.Map(this.mapboxOptions);

      // Zoom controls
      map.addControl(new mapboxgl.NavigationControl());

      // Add geolocator to map to track user's Current Location
      const geolocator = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });
      map.addControl(geolocator);

      // When map is loaded, programmatically request user's location
      // TODO: Trigger when user selects "YES" for location services on walkthrough
      map.on('load', () => {
        geolocator.trigger();
      });

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
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // TODO: These are sample data points to test markers.  Replace with points from database.
    const geojson = this.venuesService.getAllVenuesAsGeoJSON();

    geojson.features.forEach((marker: GeoJsonFeature, index: number) => {
      const markerLabel = alphabet[index];
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';
      el.id = 'marker-' + markerLabel;
      el.innerHTML = markerLabel;

      // make a marker for each feature and add to the map
      const markerRef = new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates as mapboxgl.LngLatLike)
        .addTo(map);

      this.markers.push(markerRef);
    });
  }
}
</script>