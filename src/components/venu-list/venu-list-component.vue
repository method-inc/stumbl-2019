<style lang="scss">
@import "./venu-list-component.scss";
</style>

<template>
  <div>
    <ul>
      <li v-for="(venu, index) in venus" :key="index">
        {{ venu.name }}
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class VenuListComponent extends Vue {
 public data() {
    return {
      venus: [
        {
          name: 'Signpost',
          address: '2363 Blake St',
        },
        {
          name: 'Skookum',
          address: '1801 California St.',
        },
      ],
    };
  }
}
</script>