<template>
  <div class="full-width center-content">
    <hello-component name="Everyone" message="What's up?"></hello-component>
  </div>
</template>

<script>
import HelloComponent from "./components/HelloComponent/HelloComponent.vue";

export default {
  components: {
    HelloComponent
  }
}
</script>


<style lang="scss">
  .full-width {
    // note that in app.scss, `color: red;`
    color: blue;
  }
</style>

