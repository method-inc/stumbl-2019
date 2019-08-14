<style lang="scss">
@import './alert-banner-component.scss';
</style>

<template>
  <div class="alert-banner" :class="{'yellow': yellow, 'green': green}">
    <span class="alert-banner-icon">
      <IconClock v-if="icon === 'clock'"/>
      <IconLocation v-if="icon === 'location'"/>
    </span>
    <!-- :src="'@/images/' + iconFilename" -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// import { Prop } from 'vue-property-decorator';
import IconClock from '@/images/icon-clock-component.vue';
import IconLocation from '@/images/icon-location-component.vue';

@Component({
  components: {
    IconClock,
    IconLocation,
  },
  props: {
    green: Boolean,
    yellow: Boolean,
    icon: String,   // 'clock', 'location'
  },
})
export default class AlertBannerComponent extends Vue {
  public name = './../images/mapbox-icon.png';
}
</script>
