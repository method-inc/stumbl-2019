import Vue from 'vue';
import Router from 'vue-router';
import ApiService from '@/services/api-service';

const Home = () => import('@/views/home/home.vue');
const About = () => import('@/views/about/about.vue');
const Rewards = () => import('@/views/rewards/rewards.vue');
const VenueDetails = () => import('@/views/venue-details/venue-details.vue');
const Intro = () => import('@/views/intro/intro.vue');
const PrizeEarned = () => import('@/views/prize-earned/prize-earned.vue');
const VenueDiscovered = () => import('@/views/venue-discovered/venue-discovered.vue');
const Confirmation = () => import('@/views/confirmation/confirmation.vue');
const Recovery = () => import('@/views/recovery/recovery.vue');
const AdminPortal = () => import('./views/admin-portal/admin-portal.vue');

const apiService = new ApiService();

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: Rewards,
    },
    {
      path: '/venue/:venueId',
      name: 'venue',
      component: VenueDetails,
      props: true,
    },
    {
      path: '/admin/:venueId',
      name: 'admin-portal',
      component: AdminPortal,
      props: true,
    },
    {
      path: '/prize_earned',
      name: 'prize',
      component: PrizeEarned,
    },
    {
      path: '/venue_discovered/:venueId/lng/:lng/lat/:lat',
      name: 'discovered',
      component: VenueDiscovered,
      props: true,
    },
    {
      path: '/confirmation/:confirmationId',
      name: 'confirmation',
      component: Confirmation,
      props: true,
    },
    {
      path: '/recovery/:recoveryId',
      name: 'recovery',
      component: Recovery,
      props: true,
    },
    {
      path: '*',
      name: 'other',
      redirect: '/',
    },
  ],
});

// Sets up protected routes
router.beforeEach((to, from, next) => {
  if ((router.app as any).$auth.isAuthenticated() && to.name === 'admin-portal') {
    apiService.getUserData().then((result) => {
      const { venueId}  = to.params;

      if (result.managed_locations.includes(venueId) || result.access.includes('admin')) {
        next();
      } else {
        next({ name: 'home' });
      }
    });
  } else if ((router.app as any).$auth.isAuthenticated() ||
    to.name === 'intro' || to.name === 'recovery' || to.name === 'confirmation') {
    next();
  } else {
    next({ name: 'intro' });
  }

});

export default router;
