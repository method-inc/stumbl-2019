<style lang="scss">
  .menu--toggle {
    display: block;
    position: relative;
    z-index: 1;
    -webkit-user-select: none;
    user-select: none;

    & a {
      text-decoration: none;
      color: #232323;
      transition: color 0.3s ease;
      &:hover {
        color: #71C4C7 !important;
      }
    }

    & input {
      display: block;
      width: 40px;
      height: 32px;
      position: absolute;
      top: -7px;
      left: -5px;
      cursor: pointer;
      opacity: 0; /* hide this */
      z-index: 2; /* and place it over the hamburger */
      -webkit-touch-callout: none;
    }

    // Hamburger
    & span {
      display: block;
      width: 33px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;
      background: #cdcdcd;
      border-radius: 3px;
      z-index: 1;
      transform-origin: 4px 0px;

      transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                  background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                  opacity 0.55s ease;
    }
    & span:first-child {
      transform-origin: 0% 0%;
    }

    & span:nth-last-child(2) {
      transform-origin: 0% 100%;
    }
    //  Transform all the slices of hamburger into a crossmark.
    & input:checked ~ span {
      opacity: 1;
      transform: rotate(45deg) translate(-2px, -1px);
      background: #232323;
    }
    // Hide the middle one.
    & input:checked ~ span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }
    //  The last one should go the other direction
    & input:checked ~ span:nth-last-child(2) {
      transform: rotate(-45deg) translate(0, -1px);
    }
    // Slide it in from the left
    & input:checked ~ ul {
      transform: none;
    }
    //  Make this absolute positioned at the top left of the screen
    &-menu {
      position: absolute;
      margin: -100px 0 0 -50px;
      padding: 50px;
      padding-top: 125px;
      
      background: #ededed;
      list-style-type: none;
      -webkit-font-smoothing: antialiased;
      //  To stop flickering of text in safari
      transform-origin: 0% 0%;
      transform: translate(-100%, 0);
      
      transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);

      & li {
        padding: 10px 0;
        font-size: 22px;
      }
    }
  }
</style>

<template>
<nav role="navigation">
  <div class="menu--toggle">
    <input :checked="showMenu" @click="showMenu = !showMenu" type="checkbox" />
    <span></span>
    <span></span>
    <span></span>
    <ul class="menu--toggle-menu">
      <a 
      v-for="(menuTitle, index) in menuTitles"
      :key="index"
      :href="menuTitle.href"
      target="_blank"
      >
      <li>{{menuTitle.title}}</li>
      </a>
    </ul>
  </div>
</nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    menuTitles: Array,
  },
})

export default class MenuComponent extends Vue {
  public showMenu = false;
}
</script>