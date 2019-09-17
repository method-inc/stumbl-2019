import dotenv from 'dotenv';
dotenv.config({ debug: true });
import Vue from 'vue';
import App from '@/app.vue';
import router from '@/router';
import Mixins from '@/mixins/mixins';
import VueLazyload from 'vue-lazyload';
import * as loader from '@/images/rolling-loader.gif';
import * as dswImage from '@/images/company-images/dsw-default-company.png';

Vue.config.productionTip = false;

// Set page title (Vue overrides html title tag)
document.title = 'Stumbl | Denver Startup Week';

Vue.use(Mixins);

Vue.use(VueLazyload, {
  error: dswImage,
  loading: loader,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
