import authService from '@/services/auth-service';
import venuesService from '@/services/venue-service';
import eventService from '@/services/event-service';

export default {
  install(Vue: any) {
    Vue.prototype.$auth = authService;
    Vue.prototype.$venues = venuesService;
    Vue.prototype.$events = eventService;

    Vue.mixin({
      created() {
        if (this.handleLoginEvent) {
          authService.addListener('login', this.handleLoginEvent);
          venuesService.addListener('visitedVenuesUpdated', this.handleVisitedUpdate);
        }
      },

      destroyed() {
        if (this.handleLoginEvent) {
          authService.removeListener('login', this.handleLoginEvent);
          venuesService.addListener('visitedVenuesUpdated', this.handleVisitedUpdate);
        }
      },
    });
  },
};
