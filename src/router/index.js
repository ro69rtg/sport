import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import User from '@/pages/User.vue';
import UserEdit from '@/pages/UserEdit.vue';
import EventCreate from '@/pages/EventCreate.vue';
import EventDetail from '@/pages/EventDetail.vue';
import InviteFriends from '@/pages/InviteFriends.vue';
import UserEvents from '@/pages/UserEvents.vue';
import Events from '@/pages/Events.vue';
import Rating from '@/pages/Rating.vue';
import payment from '@/pages/Payment.vue';
import PaymentEvent from '@/pages/PaymentEvent.vue';
import About from '@/pages/About.vue';
import shouldBeAllowed from '@/router/middlewares/shouldBeAllowed.js';
import shouldBeGuest from '@/router/middlewares/shouldBeGuest.js';


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '',
			name: 'home',
			beforeEnter: shouldBeAllowed,
			redirect: to =>
			{
				return { path: '/events' };
			},
		},
		{
			path: '/',
			name: 'homed',
			beforeEnter: shouldBeAllowed,
			redirect: to =>
			{
				return { path: '/events' };
			},
		},
		{
			path: '/login',
			name: 'login',
			component: LoginPage,
			beforeEnter: shouldBeGuest
		},
		{
			path: '/profile/:id',
			name: 'profile',
			component: User,
			beforeEnter: shouldBeAllowed

		},
		{
			path: '/event/:id',
			name: 'event-detail',
			component: EventDetail,
			beforeEnter: shouldBeAllowed

		},
		{
			path: '/profile/edit/:id',
			name: 'edit-user',
			component: UserEdit,
			beforeEnter: shouldBeAllowed
		},
		{
			path: '/event-create',
			name: 'event-create',
			component: EventCreate,
			beforeEnter: shouldBeAllowed
		},
		{
			path: '/events',
			name: 'events',
			component: Events,
			beforeEnter: shouldBeAllowed
		},
		{
			path: '/rating',
			name: 'Rating',
			component: Rating,
			beforeEnter: shouldBeAllowed
		},
		{
			path: '/inviteFriends',
			name: 'InviteFriends',
			component: InviteFriends,
			beforeEnter: shouldBeAllowed
		},
		{
			path: '/payment',
			name: 'payment',
			component: payment,
			beforeEnter: shouldBeAllowed
		},
		{
			path:'/payment-event',
			name:'PaymentEvent',
			component: PaymentEvent,
			beforeEnter: shouldBeAllowed
		},
		{
			path: '/user-events',
			name: 'user-events',
			component: UserEvents,
		},
		{
			path:'/about',
			name:'About',
			component: About,
			beforeEnter: shouldBeAllowed
		}
	]
});

export default router;
