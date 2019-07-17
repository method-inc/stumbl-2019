<style lang="scss">
@import './scroll-component.scss';
</style>

<template>
  <div class="scroll">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  components: {
  },
  props: {
  },
})
export default class ScrollComponent extends Vue {

  public mounted() {}
}
</script>
