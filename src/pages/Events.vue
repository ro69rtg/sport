<template>
	<div class="pages-events">
		<div class="pages-events__search">
			<IconInputSearch class="pages-events__search-icon"/>
			<input placeholder="Поиск" type="text" class="pages-events__search-input">
		</div>
		<Calendar
			:selectedDate="selectedDate"
			@update:selectedDate="getEvents"
		/>
		<Day
			v-for="(day,dayDate) in events"
			:events="day"
			:date="dayDate"
			:key="day.id"
		/>
		<Null v-if="events == false" v-model:selectedDate="selectedDate" />
	</div>
</template>

<script setup>
	import Calendar from '@/components/events/Calendar.vue';
	import Day from '@/components/events/Day.vue';
	import IconInputSearch from '@/components/icons/IconInputSearch.vue';
	import Null from '@/components/events/Null.vue';
	import { ref, onMounted } from 'vue';
	import { useNavBarStore } from '@/stores/navBar';
	import api from '@/api/api.client.js';

	const navBarStore  = useNavBarStore();
	const selectedDate = ref();
	const events       = ref(false);

	navBarStore.isShow = true;
	const getEvents = async (date = '')=> {
		selectedDate.value = date;
		const response = await api.events.getEvents(date);
		if(Object.keys(response.data.events).length == 0)
		{
			events.value = false;
			return false;
		}
		events.value   = response.data.events;
	}

	onMounted(async () =>{
		getEvents();
	});
</script>

<style lang="scss">
	.pages-events
	{
		width: calc(100% - 16px);
		padding-top: 10px;
		margin: 0 auto;
		font-family: "Roboto";
	}

	.pages-events__search
	{
		display: flex;
		padding: 8px;
		align-items: center;
		border-radius: 12px;
		background: #fff;
		overflow: hidden;
		margin-bottom: 8px;
		gap: 3px;

		& svg
		{
			margin-right: 1px;
			min-width: 24px;
		}
	}

	.pages-events__search-icon { position: relative; }

	.pages-events__search-input
	{
		width: 100%;
		border: none;
		overflow: hidden;
		color: #1B1E22;
		font-size: 14px;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;
		outline: none;
		padding: 0;
		margin: 0;
		&::placeholder
		{
			width: calc(100% - 16px);
			padding-top: 10px;
			margin: 0 auto;
			font-family: "Roboto";
		}

		.pages-events__search
		{
			display: flex;
			padding: 8px 12px 8px 9px;
			align-items: center;
			border-radius: 12px;
			background: #fff;
			overflow: hidden;
			margin-bottom: 8px;
			gap: 3px;
		}

		.pages-events__search-icon { position: relative; }

		.pages-events__search-input
		{
			width: 100%;
			border: none;
			overflow: hidden;
			color: #1B1E22;
			font-size: 14px;
			font-weight: 400;
			line-height: 18px;
			letter-spacing: 0.25px;
			outline: none;
			&::placeholder { color: #8E8E9A; }
		}
	}
</style>