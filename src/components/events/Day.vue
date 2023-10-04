<template>
	<div class="events-day">
		<div class="events-day__block">
			<div class="events-day__block-title">
				<h3 class="events-day__title">{{ moment(props.date,'D.MM.YYYY').format('dddd') }}</h3>
				<h3 class="events-day__text">{{ moment(props.date,'D.MM.YYYY').format('D MMM YYYY') }}</h3>
			</div>
			<div class="events-day__row">
				<Item
					v-for="eventItem in events"
					:key="eventItem.id"
					:event="eventItem"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import Item from '@/components/events/Item.vue';
	import moment from 'moment';
	import "moment/dist/locale/ru"
	moment.locale("ru");

	const props = defineProps({
		events: {type: Array, default: () => [], },
		date: String,
	});

</script>

<style lang="scss">
	.events-day{ margin-bottom: 6px; }
	.events-day__row {width: 100%; padding: 10px 4px 0 2px; }
	.events-day__item { width: 100%; }
	.events-day__block
	{
		display: flex;
		align-items: center;
		gap: 2px;
		padding-left: 2px;
		flex-wrap: wrap;
	}
	.events-day__block-title
	{
		width: 100%;
		display: flex;
		gap: 6px;
		position: relative;
		top: 1px;
		left: 2px;
		align-items: center;
	}
	.events-day__title
	{
		color: #1B1E22;
		font-size: 22px;
		font-weight: 500;
		margin: 0;
		text-transform: capitalize;
	}
	.events-day__text
	{
		color: #8E8E9A;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
		margin: 0;
		position: relative;
		top: 2px;
		left: -1px;
	}
</style>