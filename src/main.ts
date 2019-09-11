import dotenv from 'dotenv';
dotenv.config({debug: true});
import Vue from 'vue';
import App from './app.vue';
import router from './router';
import AuthPlugin from '@/plugins/auth';

Vue.config.productionTip = false;

// Set page title (Vue overrides html title tag)
document.title = 'Stumbl | Denver Startup Week';

Vue.use(AuthPlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
