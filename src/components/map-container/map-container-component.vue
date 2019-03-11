<style lang="scss">
@import "./map-container-component.scss";
</style>

<template>
  <div class="counter">
    <h3>MapContainer</h3>
    <div>{{message}}</div>
    <GoogleMapComponent/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import GoogleMapComponent from '@/components/google-map/google-map-component.vue';

@Component({
  components: {
    GoogleMapComponent
  }
})
export default class MapContainerComponent extends Vue {
  public message = "Hello MapContainer Component";
}
</script>