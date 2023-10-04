<template>
	<div class="user-events__slides" v-if="userEvents">
		<div class="user-events__slides-header">
			<div class="user-events__block">
				<IconUserEvents class="user-events__block-icon"/>
				<span class="user-events__block-title">Мои события</span>
			</div>
			<router-link class="user-events__link" to="/user-events">
				<IconArrowRight class="user-events__link-icon"/>
			</router-link>
		</div>
		<div class="user-events__slides-content">
			<Slider :userEvents="userEvents"/>
		</div>
	</div>
</template>
<script setup>
	import IconArrowRight from '@/components/icons/IconArrowRight.vue';
	import IconUserEvents from '@/components/icons/IconUserEvents.vue';
	import Slider from '@/components/user/Slider.vue';
	import { onMounted, ref } from 'vue';
	import api from '@/api/api.client';

	const userEvents = ref(null);

	async function fetchUserEvents()
	{
		const response   = await api.events.fetchUserEvents(1);
		userEvents.value = response.data.events.passed;
	}

	onMounted(() => fetchUserEvents() )
</script>

<style lang="scss">
	.user-events__slides
	{
		font-family: "Roboto";
		position: relative;
		top: -5px;
		overflow: hidden;
	}

	.user-events__slides-header
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.user-events__link
	{
		position: relative;
		right: 12px;
	}

	.user-events__link-icon
	{
		min-width: 16px;
		min-height: 16px;
		max-width: 16px;
		max-height: 16px;
		position: relative;
		right: -3px;
	}

	.user-events__slides-content { margin-top: 12px; }

	.user-events__block
	{
		display: flex;
		align-items: center;
		margin-left: 12px;
	}

	.user-events__block-icon
	{
		fill: #B9B9CE;
		min-width: 24px;
		min-height: 24px;
		margin-right: 12px;
	}

	.user-events__block-title
	{
		color: #1B1E22;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
	}
</style>