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

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class VenuListComponent extends Vue {
  data() {
    return {
      venus: [
        { name: "apple", price: "10" },
        { name: "orange", price: "12" }
      ]
    };
  }
}
</script>