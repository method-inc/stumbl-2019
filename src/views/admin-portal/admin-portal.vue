<style lang="scss">
@import './admin-portal.scss';
</style>

<template>
  <div>
    <transition name="fade">
      <AlertBanner
        v-if="updatedSuccessfully"
        color="green"
        class="portal__alert-banner"
      >Changes Saved!</AlertBanner>
    </transition>
    <Header></Header>
    <div class="portal">
      <h2 class="header-2">Startup crawl company admin</h2>
      <p>Edit your company details below. This will be visible to crawl participants when they check in to your location.</p>
      <label class="portal__label">
        Company name
        <input
          type="text"
          class="portal__input"
          name="company-name"
          placeholder="Company Name"
          v-model="venue.name"
        />
      </label>
      <label class="portal__label">
        Address
        <input
          type="text"
          class="portal__input"
          name="address"
          placeholder="Company Address"
          v-model="venue.address"
        />
      </label>
      <label class="portal__label">
        Website
        <input
          type="text"
          class="portal__input"
          name="website"
          placeholder="Company Website"
          v-model="venue.website"
        />
      </label>
      <label for="company-image" class="portal__label">Featured Image</label>
      <img
        class="portal__image"
        name="company-image"
        id="company-image"
        ref="company_img"
        :src="venue.company_img_url ? venue.company_img_url : '../../images/company-images/emptyVenue.jpeg'"
      />
      <Button class="portal__button" title="change image"></Button>
      <label for="about-company" class="portal__label">About (What does your company do?)</label>
      <textarea
        id="about-company"
        placeholder="Company Description"
        class="portal__textarea"
        name="about-company"
        v-model="venue.description"
        maxlength="300"
      ></textarea>
      <div @click="updateVenue()">
        <Button class="portal__button" title="save changes"></Button>
      </div>
      <router-link to="/home">
        <p class="portal__route-exit" v-on:click="resetValues()">Cancel and discard changes</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import Button from '@/components/button/button-component.vue';
import AlertBanner from '@/components/alert-banner/alert-banner-component.vue';
import Header from '@/components/header/header-component.vue';
import { VenuesService, DEFAULT_VENUE } from '@/services/venue-service';
import { Venue } from '@/models/venue-model';
import ApiService from '@/services/api-service';
import { Watch } from 'vue-property-decorator';

@Component({
  components: {
    Button,
    Header,
    AlertBanner,
  },
  props: {
    allVenues: Array,
    venueId: String,
  },
})
export default class AdminPortal extends Vue {
  public apiService = new ApiService();
  public updatedCompanyDetails = {};
  public venue: Venue = DEFAULT_VENUE;
  public venueId!: string;
  public allVenues!: Venue[];
  public updatedSuccessfully: boolean = false;

  public resetValues(): object {
    return (this.updatedCompanyDetails = {});
  }

  @Watch('allVenues')
  public handleUpdate() {
    const copy = this.allVenues.find((venue) => venue.id === this.venueId);
    const freshCopy = Object.assign({}, copy);
    this.venue = freshCopy;
  }

  @Watch('updatedSuccessfully')
  public promptSuccessMessage(value: boolean) {
    if (value) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        this.updatedSuccessfully = false;
      }, 3500);
    }
  }

  public async beforeMount() {
    const copy = this.allVenues.find((venue) => venue.id === this.venueId);
    const freshCopy = Object.assign({}, copy);
    this.venue = freshCopy;
  }

  // public async updateVenue() {
  //   debugger;
  //   if (Object.keys(this.updatedCompanyDetails).length === 0) {
  //     return window.prompt('you need some shit homie');
  //   } else {
  //     this.updatedCompanyDetails.id = this.venue.id;
  //     await this.apiService.updateVenue(this.updatedCompanyDetails) {

  //     }
  //   }
  // }
}
</script>