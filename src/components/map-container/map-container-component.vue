<style lang="scss">
@import './map-container-component.scss';
</style>

<template>
  <div id="map"/>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { GeoJsonFeature } from '@/services/venue-service';
import mapboxgl, { MapboxOptions, LngLatLike, ImageSource } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { VenuesService } from '@/services/venue-service';

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_KEY as string;


@Component({})
export default class MapContainerComponent extends Vue {
  public venuesService = new VenuesService();
  public mapLoaded = false;
  public markers: mapboxgl.Marker[] = [];
  public visitedVenues = this.venuesService.visitedVenues;

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
      map.on('load', () => {
        geolocator.trigger();
      });

      this.loadMarkers(map);

      // Assures that the map is only loaded once
      //  so we are less likely to hit our free-tier api request limit
      this.mapLoaded = true;
    }

  }

  // Load and place location markers on the map
  private async loadMarkers(map: mapboxgl.Map) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // TODO: These are sample data points to test markers.  Replace with points from database.
    const geojson = await this.venuesService.getAllVenuesAsGeoJSON();

    geojson.features.forEach((marker: GeoJsonFeature, index: number) => {
      let markerLabel: any;
      // create a HTML element for each feature
      const el = document.createElement('div');

      if (this.visitedVenues.includes(index)) {
        markerLabel = null;
        el.className = 'marker--checkmark';
      } else {
        markerLabel = alphabet[index];
        el.className = 'marker';
      }

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