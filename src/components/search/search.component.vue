<style lang="scss">
@import "./search.component.scss";
</style>

<template>
  <div class="search">
    <label class="search__label" for="search">Search for something:</label>
    <input type="text" id="search" class="search__input">
  </div>
</template>

<script lang="ts">
import { from, Observable } from 'rxjs';
import { debounceTime, map, pluck, switchMap } from 'rxjs/operators';
import Vue from 'vue';
import Component from 'vue-class-component';

interface HackerNewsResult {
  objectID: string;
  title?: string;
  url?: string;
}

interface HackerNewsSearchResponse {
  hits: HackerNewsResult[];
}

interface HandleObservableOptions {
  time?: number;
  scheduler?: any;
}

const hackerNewsEndpoint = 'http://hn.algolia.com/api/v1/search?query=';

export const handleObservable = function(
  observable: Observable<Event>,
  options: HandleObservableOptions = {}
): Observable<any> {
  const { time = 300, scheduler } = options;

  return observable.pipe(
    debounceTime(time, scheduler),
    pluck<Event, string>('target', 'value'),
    map((value) => {
      console.log(value);
    })
  );
};

@Component<Search>({
  subscriptions() {
    return {
      searchValue: handleObservable(this.$fromDOMEvent('input', 'keyup'))
    };
  }
})
export default class Search extends Vue {
  searchValue: string;

  constructor() {
    super();
    this.save();
  }

  async save(): Promise<any> {
    const response = await this.$http.get('http://pokeapi.co/api/v2/');
    console.log(response);

    return response.data;
  }
}
</script>