<style lang="scss" scoped>
@import './get-started-component.scss';
</style>

<template>
<div class="intro--get-started">
  Hello
</div>  
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class GetStartedComponent extends Vue {
  public message = 'hello';
}
</script>
