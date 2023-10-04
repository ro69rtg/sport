<template>
	<div class="event-detail-date">
		<div class="event-detail-date__block">
			<span class="event-detail-date__text">
				<IconEventDetailCalendar class="event-detail-date__icon"/>
				Дата и время
			</span>
		</div>
		<div class="event-detail-date__info">
			<div class="event-detail-date__info-text">
				<span class="event-detail-date__info-value"> {{ moment(date,'D.MM.YYYY').format('D MMM YYYY') }} </span>
			</div>
			<div class="event-detail-date__info-text">
				<span class="event-detail-date__info-value"> {{startTime}} </span>
			</div>
		</div>
	</div>
</template>
<script setup>
	import PageItem from '@/components/PageItem.vue';
	import IconEventDetailCalendar from '@/components/icons/IconEventDetailCalendar.vue';

	import moment from 'moment';
	import "moment/dist/locale/ru"
	moment.locale("ru");

	const props = defineProps(['startTime', 'date']);
</script>
<style lang="scss">
	.event-detail-date
	{
		display: flex;
		align-items: center;
		margin-top: 30px;
		justify-content: space-between;
		font-family: Roboto;
	}

	.event-detail-date__icon{ margin-right: 12px; }

	.event-detail-date__info
	{
		display: flex;
		align-items: center;
	}

	.event-detail-date__info-text { margin-right: 6px; }

	.event-detail-date__info-value
	{
		color: $primary;
		text-align: center;
		background: $primary-background;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		border-radius: 6px;
		line-height: 18px;
		padding: 4px 8px;
		letter-spacing: 0.25px;
	}

	.event-detail-date__text
	{
		color: $primary;
		font-size: 16px;
		font-weight: 500;
		display: flex;
		align-items: center;
		letter-spacing: 0.5px;
	}
</style>