import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRx from 'vue-rx';

import App from './app.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueRx);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
