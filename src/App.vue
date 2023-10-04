<script setup>
	import { computed, defineAsyncComponent } from 'vue';
	import { RouterLink, RouterView } from 'vue-router'
	import { useUserStore } from './stores/user';
	import { useNavBarStore } from './stores/navBar';


	const userStore = useUserStore();
	const navBarStore = useNavBarStore();

	const currentUser = computed(() => userStore.currentUser)
	const isUserAuth = computed(() => userStore.isUserAuth);
	const isNavBarShow = computed(() => navBarStore.isNavBarShow);
	let currentLayout = computed(()=>
	{
		if(isUserAuth.value && isNavBarShow.value)
		{
			return defineAsyncComponent(() => import('./layouts/Authorized.vue'))
		}
		return defineAsyncComponent(() => import('./layouts/Unauthorized.vue'))
	});
</script>

<template>
	<component :is="currentLayout">
		<RouterView />
	</component>
</template>
