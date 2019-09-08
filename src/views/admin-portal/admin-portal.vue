<style lang="scss">
@import './admin-portal.scss';
</style>

<template>
  <div>
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
          v-model="editedCompanyDetails.companyName"
        />
      </label>
      <label class="portal__label">
        Address
        <input
          type="text"
          class="portal__input"
          name="address"
          v-model="editedCompanyDetails.address"
        />
      </label>
      <label class="portal__label">
        Website
        <input
          type="text"
          class="portal__input"
          name="website"
          v-model="editedCompanyDetails.website"
        />
      </label>
      <label for="company-image" class="portal__label">Featured Image</label>
      <img
        class="portal__image"
        name="company-image"
        id="company-image"
        src="../../images/company-images/emptyVenue.jpeg"
      />
      <Button class="portal__button" title="change image"></Button>
      <label for="about-company" class="portal__label">About (What does your company do?)</label>
      <textarea id="about-company" class="portal__textarea" name="about-company" maxlength="300"></textarea>
      <Button class="portal__button" title="save changes"></Button>
      <Button class="portal__button" backgroundColor="grey" title="preview company"></Button>
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
import Header from '@/components/header/header-component.vue';

@Component({
  components: {
    Button,
    Header,
  },
})
export default class AdminPortal extends Vue {
  public editedCompanyDetails = {};

  public resetValues(): object {
    return (this.editedCompanyDetails = {});
  }
}
</script>