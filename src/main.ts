import dotenv from 'dotenv';
dotenv.config({debug: true});
import Vue from 'vue';
import App from './app.vue';
import router from './router';

Vue.config.productionTip = false;

// Set page title (Vue overrides html title tag)
document.title = 'Stumbl | Denver Startup Week';

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
