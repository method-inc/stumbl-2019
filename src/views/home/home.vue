<template>
  <div class="home">
    <Map />
    <VenuList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Map from '@/components/map/map-component.vue';
import VenuList from '@/components/venu-list/venu-list-component.vue';

@Component({
  components: {
    Map,
    VenuList,
  },
})
export default class Home extends Vue {}
</script>