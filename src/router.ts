import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/home/home.vue';
const About = () => import('./views/about/about.vue');
const Rewards = () => import('./views/rewards/rewards.vue');
const VenueDetails = () => import('./views/venue-details/venue-details.vue');
const Intro = () => import('./views/intro/intro.vue');
const PrizeEarned = () => import('./views/prize-earned/prize-earned.vue');
const VenueDiscovered = () => import('./views/venue-discovered/venue-discovered.vue');
const Confirmation = () => import('@/views/confirmation/confirmation.vue');
const Recovery = () => import('@/views/recovery/recovery.vue');

Vue.use(Router);

const router = new Router({
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
    },
    {
      path: '/prize_earned',
      name: 'prize',
      component: PrizeEarned,
    },
    {
      path: '/venue_discovered/:venueId',
      name: 'discovered',
      component: VenueDiscovered,
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
  if ((router.app as any).$auth.isAuthenticated() ||
    to.name === 'confirmation' ||
    to.name === 'recovery' ||
    to.name === 'intro') {
    next();
  } else {
    next({ name: 'intro' });
  }
});

export default router;
