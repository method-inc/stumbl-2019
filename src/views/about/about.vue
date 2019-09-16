<style lang="scss">
@import './about.scss';
</style>

<template>
  <div>
    <Header :showClose="true" />
    <div class="about">
      <div>
        <p class="about__header">Instructions</p>
        <ul>
          <li>Share your location.</li>
          <li>Follow the map to visit as many startups (in any order) that you can.</li>
          <li>Visit this site whenever you arrive at a startup and be prompted to check in.</li>
          <li>
            Win! Check the
            <router-link to="/rewards">
              <img
                class="about__header-rewards-icon"
                src="../../images/rewards_icon.svg"
                alt="Rewards icon"
              />
            </router-link>page to see what rewards you’ve earned.
          </li>
        </ul>
      </div>
      <div>
        <p class="about__header">About this app</p>
        <p>
          The Denver Startup Week Crawl app was built by Skookum in Denver. For more than a decade,
          Skookum has been helping businesses solve their most pressing and complex digital challenges.
          Our diverse team of strategists, designers, and developers offer clients the best partnership and
          results they’ve ever experienced.
        </p>
      </div>
      <Button
        title="More about skookum"
        :showImage="true"
        backgroundColor="white"
        href="https://skookum.com/"
      />
      <div @click="logout()">
        <Button
          title="Log out"
          backgroundColor="white"
        />
      </div>
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
export default class About extends Vue {
  private $auth: any;

  public logout() {
    this.$auth.logOut();
  }
}
</script>

