<style lang="scss">
@import "./map-container-component.scss";
</style>

<template>
  <div class="map-container">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  components: {
  },
})
export default class MapContainerComponent extends Vue {
  public message = 'Hello MapContainer Component';
}
</script>