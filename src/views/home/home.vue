<template>
  <div class="home">
    <h1>Welcome to the Stumbl App!</h1>
    <Counter/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Counter from '@/components/counter/counter-component.vue';

@Component({
  components: {
    Counter,
  },
})
export default class Home extends Vue {}
</script>
