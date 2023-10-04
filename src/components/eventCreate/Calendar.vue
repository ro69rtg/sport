<template>
	<VueDatePicker
		v-model="date"
		@update:model-value="handleDate"
		@open="openCalendar"
		@closed="closeCalendar"
		locale="ru"
		class="event-create-calendar"
		auto-apply
	>
		<template #trigger>
			<div :class="{'edited':dateActive,'opened':isOpen}">
				<slot name="trigger"></slot>
			</div>
		</template>
		<template #month-year="{month, year, months, handleMonthYearChange}">
			<div class="custom-month-year-component">
				<span class="event-create__custom-month">{{months[month].text}}</span>
				<span class="event-create__custom-year">{{year}}</span>
			</div>
			<div class="icons">
				<span
					class="custom-icon"
					@click="handleMonthYearChange(false)">
					<IconCalendarArrowLeft/>
				</span>
				<span
					class="custom-icon"
					@click="handleMonthYearChange(true)">
					<IconCalendarArrowRight/>
				</span>
			</div>
		</template>
	</VueDatePicker>
</template>

<script setup>
	import { ref, computed } from 'vue';
	import IconCalendarArrowLeft from '@/components/icons/IconCalendarArrowLeft.vue';
	import IconCalendarArrowRight from '@/components/icons/IconCalendarArrowRight.vue';
	import VueDatePicker from '@vuepic/vue-datepicker';
	import '@vuepic/vue-datepicker/dist/main.css';
	import moment from 'moment';
	import "moment/dist/locale/ru"
	moment.locale("ru");

	const date       = ref(new Date);
	const isOpen     = ref(false);
	const dateActive = ref(false);
	const props      = defineProps({
		'date':{type: String, default:''},
		'open':{type: Boolean, default:false}
	});
	const emit       = defineEmits(['update','update:open']);

	const handleDate = (newDate)=>{
		emit('update', moment(newDate).format('D.MM.YYYY'));
		dateActive.value = true;
	}

	const openCalendar = ()=>{
		isOpen.value = true;
		if(props.date !== '')
			date.value = moment(props.date,'D.MM.YYYY');
		emit('update:open', true);
	}

	const closeCalendar = ()=>{
		isOpen.value = false;
		emit('update:open', false);
	}
</script>

<style lang="scss">
	.event-create__custom-year{ color: #1B1E22; font-weight: 500;}
	.event-create__custom-month{color: #8E8E9A; margin-right: 9px; }
	.event-create-calendar
	{
		.dp__month_year_row
		{
			padding: 0 4px;
			justify-content: space-between;

			& .icons {margin-top: 7px; margin-right: -5px; }
		}

		.custom-icon
		{
			margin: 10px;
			svg {path { fill:#1B1E22; } }
		}

		.dp__arrow_top { display: none;}
		.dp__active_date
		{
			background: #239735 ;
			border-radius: 8px;
		}

		.dp__today { border: none; }
		.dp__menu
		{
			background: transparent;
			position: relative;
			left: 0;
			top: 0 !important;
		}

		.dp__button{ display: none; }
		.dp__action_row{ display: none; }
		.dp__month_year_wrap{ width: auto; }
		.dp__btn:first-child {position: relative; left: 85% }
		.dp__btn:last-child {position: absolute; left: 90% }
		.dp__inner_nav
		{
			background-color: none;
			width: 	25px;
			height: 30px;
			color: #239735;
		}
		.dp__inner_nav:hover{ background-color: none; }
		.dp__overlay_cell_active{ background-color: #239735; }
		.dp__menu { border: none; }
		.dp__calendar{ padding: 0; }
		.dp__calendar_header{
			padding: 0;
			justify-content:space-between;
		}
		.dp__calendar_header_item
		{
			font-size: 14px;
			font-weight: 400;
			line-height: 18px;
			max-width: 31px;
			color: #8E8E9A;
			text-transform: capitalize;
		}

		.dp__calendar_row
		{
			margin: -5px 0;
			padding: 0;
			justify-content: space-between;
		}
		.dp__cell_inner
		{
			width: 100%;
			height: 31px;
			margin: 3.8px 0;
		}
		.dp__calendar_item
		{
			font-size: 14px;
			line-height: 18px;
			letter-spacing: 0.25px;
			text-align: center;
			max-width: 31px;
		}
		.dp__calendar_header_separator{display: none;}
		.dp__cell_offset{visibility: hidden;}
	}
</style>