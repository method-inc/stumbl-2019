<style lang="scss">
@import './reward-details.scss';
</style>

<template>
  <div class="reward-details">
    <div class="reward-details-access-image">
      <img v-if="unLocked" src="../../images/checkmark.svg" alt="Checkmark" />
      <img v-if="!unLocked" src="../../images/rewards-lock.svg" alt="Lock" />
    </div>
    <div>
      <h1 class="header-1">{{title}}</h1>
      <p>{{subTitle}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';

@Component({
  props: {
    title: String,
    subTitle: String,
    unLocked: Boolean
  }
})
export default class RewardDetails extends Vue {}
</script>

