<template>
  <div class="home">
    <h1>Welcome to the Stumbl App!</h1>
    <Counter/>
    <SearchComponent />
  </div>
</template>

<script lang="ts">
import Counter from '@/components/counter/counter.vue';
import SearchComponent from '@/components/search/search.component.vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Counter,
    SearchComponent
  },
})
export default class Home extends Vue {}
</script>
