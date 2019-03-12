<style lang="scss">
@import "./menu-component.scss";
</style>

<template>
<nav role="navigation">
  <div class="menu--toggle">
    <input :checked="showMenu" @click="showMenu = !showMenu" type="checkbox"  v-click-outside="clickedOutside"/>
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

Vue.directive('click-outside', {
  bind: (el: any, binding: any, vnode: any) => {
    el.clickOutsideEvent =  (event: any) => {

      if (event.target.className !== 'menu--toggle-menu' && el !== event.target) {

        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind: (el: any) => {
      document.body.removeEventListener('click', el.clickOutsideEvent);
  },
});

@Component({
  props: {
    menuTitles: Array,
  },
})

export default class MenuComponent extends Vue {
  public showMenu = false;

  public clickedOutside() {
    this.showMenu = false;
  }

}
</script>