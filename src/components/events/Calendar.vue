<template>
	<div class="events-calendar">
		<div v-if="!isOpen" class="events-calendar__week">
			<div class="events-calendar__item" v-for="day in week" :key="day.name">
				<span class="events-calendar__item-text">{{ day.name }}</span>
				<button
					@click="activateDate(day.date)"
					class="events-calendar__item-day"
					:class="{ 'active': day.active }"
				>
					{{ day.number }}
				</button>
				<span :class="{ 'active': day.circle }" class="events-calendar__item-circle"></span>
			</div>
		</div>

		<div class="calendar__mounth">
			<EventCreateCalendar
				@update="activateDate"
				v-model:date="bigCalDate"
				v-model:open="isOpen"
			>
				<template v-slot:trigger>
					<div @click="toggleCalendar" v-if="!isOpen">
						<IconCalendarArrowBottom class="events-calendar__arrow" :class="{ 'active' :isOpen }"/>
					</div>
				</template>
			</EventCreateCalendar>

			<div @click="toggleCalendar" v-if="isOpen">
				<IconCalendarArrowBottom class="events-calendar__arrow" :class="{ 'active' :isOpen }"/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted, reactive} from 'vue';
	import '@vuepic/vue-datepicker/dist/main.css';
	import EventCreateCalendar from '@/components/eventCreate/Calendar.vue';
	import IconCalendarArrowBottom from '@/components/icons/IconCalendarArrowBottom.vue';
	import moment from 'moment';
	import "moment/dist/locale/ru"
	moment.locale("ru");

	const props      = defineProps(['selectedDate']);
	const emit       = defineEmits(['update:selectedDate']);
	const week       = reactive([]);
	const isOpen     = ref(false);
	const bigCalDate = ref(null);

	const toggleCalendar = () => isOpen.value = !isOpen.value;

	const activateDate = (date) => {
		week.forEach((day, index) => {
			day.active = false;
			if(day.date == date)
				day.active = true;
		});
		bigCalDate.value = date;
		emit('update:selectedDate', date);
	}

	// заплняет дни недели в маленьком календаре
	const createWeekDates = () =>
	{
		const today            = new Date();
		const day              = today.getDate();
		const month            = today.getMonth();
		const year             = today.getFullYear();
		const currentDayOfWeek = today.getDay();
		const startDate        = new Date(year, month, day - currentDayOfWeek + 1);

		for (let weekDayIndex = 0; weekDayIndex<7; weekDayIndex++)
		{
			const weekDay = new Date(startDate);
			weekDay.setDate(startDate.getDate() + weekDayIndex);

			week.push({
				name   : moment(weekDay).format('dd'),
				number : weekDay.getDate(),
				date   : moment(weekDay).format('D.MM.YYYY'),
				active : false
			});
		}
	}

	// mounted
	onMounted(() => createWeekDates())
</script>

<style lang="scss">
	.events-calendar
	{
		align-items: center;
		text-align: center;
		margin-bottom: 8px;
	}

	.events-calendar__week
	{
		display: flex;
		gap: 0 3px;
		text-align: center;
		padding: 0 1px;
	}

	.events-calendar__item
	{
		display: block;
		width: 14%;
		cursor: pointer;
	}

	.events-calendar__item-text
	{
		display: block;
		color: #8E8E9A;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.1px;
		margin-bottom: 8px;
	}

	.events-calendar__item-day
	{
		font-weight: 400;
		border: none;
		width: 26px;
		height: 26px;
		font-size: 14px;
		line-height: 18px;
		text-align: center;
		color: #1B1E22;
		letter-spacing: 0.25px;
		&:hover,&:focus,&.active
		{
			background: #239735;
			padding: 4px;
			color:#fff;
			border-radius: 6px;
		}
	}

	.events-calendar__arrow
	{
		cursor: pointer;
		position: relative;
		top: -4px;
		&.active { transform:rotate(180deg); }
	}

	.events-calendar__mounth
	{
		&.active { display: flex; }
	}

	.events-calendar__arrow { cursor: pointer; }

	.events-calendar__open-icon
	{
		width: 100%;
		margin-top: 15px;
		cursor: pointer;
	}

	.events-calendar__arrow
	{
		cursor: pointer;
		z-index:9;

		&.active { transform:rotate(180deg); }
	}

	.events-calendar__item-circle
	{
		display: none;
		width: 4px;
		height: 4px;
		border-radius: 6px;
		background: #FF3B30;
		margin:0 auto;
		margin-top:2px;
		&.active{ display:block; }
	}
</style>