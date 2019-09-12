import authService from '@/services/auth-service';

export default {
  install(Vue: any) {
    Vue.prototype.$auth = authService;

    Vue.mixin({
      created() {
        if (this.handleLoginEvent) {
          authService.addListener('login', this.handleLoginEvent);
        }
      },

      destroyed() {
        if (this.handleLoginEvent) {
          authService.removeListener('login', this.handleLoginEvent);
        }
      },
    });
  },
};
