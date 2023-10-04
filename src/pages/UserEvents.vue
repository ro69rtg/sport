<template>
	<div class="user-events">
		<div class="user-events__header">
			<button @click="router.push('/profile/1')" class="user-events__back-button">
				<IconArrowBack name="arrowleft" size="24"/>
			</button>
			<span class="user-events__label"> Мои события </span>
		</div>
		<div v-if="plannedEvents" class="user-events__card-box-now">
			<h2>Запланированные</h2>
			<div class="user-events__planned">
				<MyItem
					:event="event"
					v-for="plannedEvent in plannedEvents"
					:key="plannedEvent.id"
					:userEvent="plannedEvent"
					:userEvents="userEvents"
				/>
			</div>
		</div>
		<div v-if="passedEvents" class="user-events__card-box-past">
			<h2>Прошедшие</h2>
			<MyItem
				:event="event"
				v-for="passedEvent in passedEventsToShow"
				:key="passedEvent.id"
				:userEvent="passedEvent"
				:userEvents="userEvents"
			/>
			<button
				v-if="isShowBtn"
				@click="showAllPassedEvents = true"
				class="user-events__pagination"
			>Показать все <IconEventPaginationArrow/>
			</button>
		</div>
	</div>
</template>

<script setup>
	import IconArrowBack from '@/components/icons/IconArrowBack.vue';
	import IconEventPaginationArrow from '@/components/icons/IconEventPaginationArrow.vue';
	import MyItem from '@/components/events/MyItem.vue';
	import { ref ,onMounted, computed } from 'vue';
	import api from '@/api/api.client';
	import { useNavBarStore } from '@/stores/navBar';

	const isShowBtn = ref(true);
	const navBarStore = useNavBarStore();
	navBarStore.isShow = null;

	import { useRouter } from 'vue-router';

	const router = useRouter();


	const plannedEvents = ref(null);
	const passedEvents = ref(null);

	async function myUserEvents()
	{
		const response = await api.events.myUserEvents();
		plannedEvents.value = response.data.events.planned;
		passedEvents.value = response.data.events.passed;
	}

	onMounted(() => myUserEvents() )

	const showAllPassedEvents = ref(false);

	const passedEventsToShow = computed(() =>
	{
		if (showAllPassedEvents.value)
		{
			isShowBtn.value = false;
			return passedEvents.value;
		}
		else
		{
			isShowBtn.value = true;
			return passedEvents.value.slice(0, 3);
		}
	});
</script>

<style lang="scss" >
	.user-events
	{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-width: 1440px;
		width: calc(100% - 24px);
		margin: 0 auto;
		font-family: Roboto;

		.user-events__header
		{
			font-size: 16px;
			font-style: normal;
			font-weight: 500;
			line-height: 24px;
			letter-spacing: 0.5px;
			color: $primary;
			padding: 8px 0;
			height: 24px;
			width: 55%;
			display: flex;
			justify-content: space-between;
			margin-bottom: 9px;
		}

		.user-events__back-button
		{
			width: 24px;
			height: 24px;
			border: none;
		}

		h2
		{
			font-size: 22px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
			color: $primary;
			margin-top: 0;
			margin-bottom: 12px;
		}

		.user-events__card-box-now { margin-bottom: 4px; }

		.user-events__pagination
		{
			background-color: $minor;
			display: flex;
			padding: 10px 24px;
			justify-content: center;
			align-items: center;
			gap: 8px;
			align-self: stretch;
			border:none;
			border-radius: 8px;
			width: 100%;
			margin-bottom: 20px;
		}
	}

	.user-events__plate
	{
		z-index:1;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
</style>