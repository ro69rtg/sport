<template>
	<div class="event-detail-duration">
		<div class="event-detail-duration__block">
			<IconEventDetailDuration class="event-detail-duration__icon"/>
			<span class="event-detail-duration__title">
				Длительность
			</span>
		</div>
		<div class="event-detail-duration__info">
			<div class="event-detail-duration-text">
				<span class="event-detail-duration-value"> {{ formatTime() }} </span>
			</div>
		</div>
	</div>
</template>
<script setup>
	import PageItem from '@/components/PageItem.vue';
	import IconEventDetailDuration from '@/components/icons/IconEventDetailDuration.vue';
	import { ref } from 'vue';

	const props = defineProps(['duration', 'starTime'])

	const formatTime = ()=> {
		let [hours, minutes] = props.duration.split(":");
		hours = parseInt(hours);
		minutes = parseInt(minutes);
		let formattedTime = "";

		if (hours > 0)
		{
			formattedTime += hours + " ";
			if (hours === 1 || hours === 21)
				formattedTime += "час";
			else if ( (hours >= 2 && hours <= 4) || (hours >= 22 && hours <= 23) )
				formattedTime += "часа";
			else
				formattedTime += "часов";
		}

		if (minutes > 0)
		{
			if (formattedTime.length > 0)
				formattedTime += " ";

			formattedTime += minutes + " ";
			if (minutes === 1 || minutes === 21 || minutes === 31 || minutes === 41 || minutes === 51 )
				formattedTime += "минута";
			else if (
				(minutes >= 2 && minutes <= 4) ||
				(minutes >= 22 && minutes <= 24) ||
				(minutes >= 32 && minutes <= 34) ||
				(minutes >= 42 && minutes <= 44) ||
				(minutes >= 52 && minutes <= 54)
			)
				formattedTime += "минуты";
			else
				formattedTime += "минут";
		}

		return formattedTime;
	}

</script>
<style lang="scss">
	.event-detail-duration
	{
		display: flex;
		align-items: center;
		margin-top: 30px;
		justify-content: space-between;
		font-family: "Roboto";
	}

	.event-detail-duration__title
	{
		color: #1B1E22;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
	}

	.event-detail-duration__block
	{
		display: flex;
		align-items: end;
	}

	.event-detail-duration__icon{ margin-right: 12px; }

	.event-detail-duration__info
	{
		display: flex;
		align-items: center;
	}

	.event-detail-duration-value
	{
		color: $primary;
		text-align: center;
		background: $primary-background;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		border-radius: 6px;
		line-height: 18px;
		padding: 4px     8px;
		letter-spacing: 0.25px;
	}
</style>