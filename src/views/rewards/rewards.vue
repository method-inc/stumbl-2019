<style lang="scss">
@import './rewards.scss';
</style>

<template>
  <div>
    <Header/>
    <div class="rewards">
      <h1 class="rewards__header">This is the rewards page</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Header from '@/components/header/header-component.vue';

@Component({
  components: {
    Header
  }
})
export default class Rewards extends Vue {}
</script>

