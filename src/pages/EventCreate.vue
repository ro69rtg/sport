<template>
	<div class="container-fluid">
		<div class="event-create">
			<div class="event-create__header">
				<IconBackPage @click="router.back" class="event-create__header-icon"/>
				<h2 class="event-create__header-title">Создание игры</h2>
			</div>
			<div class="event-create__personal">
				<CustomInput
					:error="postCreateGame.name"
					v-model="postCreateGame.name"
					placeholder="Название" icon="close"
					class="event-create__personal-name"
				/>
				<hr class="user-edit__personal-delimetr" />
				<CreateGameInputAddress
					title="Адреc"
					v-model="postCreateGame.address"
					placeholder="Адресс"
					icon="close"
					class="event-create__personal-lastname"
				/>
			</div>
			<div class="event-create__moment">
				<EventCreateCalendar
					:fullDate="postCreateGame.date"
					ref="EventCreateCalendarRef"
					@update="(newDate) => postCreateGame.date = newDate"
				>
					<template v-slot:trigger>
						<div class="event-create__moment-item event-create__moment-calendar-top">
							<div class="event-create__title">
								<IconCalendar class="event-create__title-icon" />
								<h3 class="event-create__title-text">Дата</h3>
							</div>
							<button class="event-create__moment-btn">{{ formattedDate }}</button>
						</div>
					</template>
				</EventCreateCalendar>
				<div class="event-create__moment-item">
					<label for="timeId" class="event-create__moment-item-label">
						<div class="event-create__title">
							<IconClock class="event-create__title-icon" />
							<h3 class="event-create__title-text">Время Начала</h3>
						</div>
						<div class="event-create__time-wrapper">
							<CreateGameTime
								@update="(startGame)=> postCreateGame.timeStart = startGame"
								:types="['h','m']"
								:count="2"
								id="timeId"
							/>
						</div>
						<div class="event-create__line"> </div>
					</label>
				</div>
				<div class="event-create__moment-item">
					<label for="durationId" class="event-create__moment-item-label">
						<div class="event-create__title">
							<IconTimer class="event-create__title-icon" />
							<h3 class="event-create__title-text">Длительность</h3>
						</div>
						<div class="event-create__time-wrapper">
							<CreateGameTime
								@update="(duratinGame) => postCreateGame.duration = duratinGame"
								:types="['h','m']"
								:count="2"
								id="durationId"
							/>
						</div>
					</label>
					<div class="event-create__line"> </div>
				</div>
			</div>
			<div class="event-create__categories">
				<CreateGameCategories
					@click="getCategories"
					@update="(value) => postCreateGame.category=value.id"
				/>
			</div>
			<CreateGamePayment
				@changePrice="(value) => postCreateGame.totalCost = Number(value)"
				@chageParticipants="(value) => postCreateGame.membersCount = Number(value)"
				@update="updateGamePayment"
			/>
			<div class="event-create__item-box">
				<CreateGameVisble  @update="(value)=> postCreateGame.gameType=value "/>
			</div>
			<textarea
				v-model="postCreateGame.comment"
				class="event-create__instruction"
				placeholder="Инструкция по проезду, правила игры и другая информация для участников"
			/>
			<button class="event-create__new"
				@click="sendForm"
				:class="{'active' :postCreateGame.name && postCreateGame.address
					&& postCreateGame.membersCount && postCreateGame.gameType }"
			>
				Cоздать игру
			</button>
		</div>
	</div>
</template>

<script setup>
	import CustomInput from '@/ui/CustomInput.vue';
	import CreateGameTime from '@/components/eventCreate/Time.vue';
	import CreateGameInputAddress from '@/components/eventCreate/Address.vue';
	import EventCreateCalendar from '@/components/eventCreate/Calendar.vue';
	import CreateGameCategories from '@/components/eventCreate/Categories.vue';
	import CreateGameVisble from '@/components/eventCreate/Visible.vue';
	import CreateGamePayment from '@/components/eventCreate/Payment.vue';
	import IconBackPage from '@/components/icons/IconBackPage.vue'
	import IconClock from '@/components/icons/IconClock.vue';
	import IconTimer from '@/components/icons/IconTimer.vue';
	import IconCalendar from '@/components/icons/IconCalendar.vue';
	import moment from 'moment';
	import "moment/dist/locale/ru"
	moment.locale("ru");

	import api from '@/api/api.client.js'
	import {ref,reactive,computed} from 'vue';
	import router from '@/router';

	const formattedDate = computed(() =>{
		if(postCreateGame.date == null)
			return moment().format('MMM YYYY');
		else
			return moment(postCreateGame.date, "D.MM.YYYY").format('D MMM YYYY');
	});

	function getCategories()
	{
		api.user.gettingСategories();
	}

	function sendForm()
	{
		if (postCreateGame.name && postCreateGame.address && postCreateGame.membersCount && postCreateGame.gameType)
			api.user.createGame(postCreateGame).then((data) => {
				router.push(`/game/${data.data.event.slug}`)
			});
	}

	function updateGamePayment(value)
	{
		postCreateGame.membersCount  = value.memberCount;
		postCreateGame.totalCost     = value.priceSum.replaceAll(" ", "");
		postCreateGame.costPerPerson = value.priceForPer;
		postCreateGame.paymentMethod = value.paymentMethod;
	}

	const postCreateGame = reactive({
		name          : null,
		address       : null,
		date          : null,
		timeStart     : null,
		duration       : null,
		membersCount  : null,
		gameType      : "public",
		totalCost     : null,
		category      : null,
		paymentMethod : null,
		costPerPerson : null,
		comment       : null,
	});

</script>

<style lang="scss">
	.event-create__time-wrapper
	{
		display: flex;
		align-items: center;
	}

	.event-create__instruction
	{
		caret-color: #32D74B;
		width: calc(100% - 23px);
		height: 77px;
		outline: none;
		border: none;
		resize: none;
		border-radius: 8px;
		padding: 12px 12px;
		margin-bottom: 12px;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;

		&:placeholder
		{
			font-size: 12px;
			font-weight: 400;
			line-height: 18px;
			letter-spacing: 0.25px;
		}
	}

	.event-create__title-users
	{
		display: flex;
		align-items: center;
	}

	.event-create__closer
	{
		border: none;
		font-size: 14px;
		line-height: 17px;
		letter-spacing: 0.25px;
		color: #8E8E9A;
	}

	.event-create__item-box
	{
		position: relative;
		margin-bottom: 13px;
		background: #fff;
		border-radius: 8px;
	}

	.event-create__line
	{
		background-color: #F2F2F7;
		height: 1px;
		width: 96%;
		position: absolute;
		top: 0;
		left: 5%;
	}

	.event-create__title
	{
		font-size: 16px;
		line-height: 24px;
		letter-spacing: 0.5px;
		width: 56%;
		display: flex;
		align-items: center;
		width: 63%;
		align-items: center;
	}

	.event-create__icon-item
	{
		margin-right: 15px;
		margin-top: 0px;
		margin-bottom: 1px;
	}

	.event-create__header-title
	{
		text-align: center;
		display: inline-block;
		font-size: 16px;
		line-height: 24px;
		letter-spacing: 0.5px;
		width: 56%;
	}

	.event-create__header-icon{ margin-right: 16%; }

	.event-create__personal
	{
		position: relative;
		margin-bottom: 12px;
	}

	.event-create__personal-lastname { border-radius: 0 0 8px 8px; }

	.user-edit__personal-delimetr
	{
		position: absolute;
		width: calc(100% - 15px);
		height: 1px;
		z-index: 2;
		left: 15px;
		margin: 0;
		border: none;
		background: rgba(229, 229, 237, 0.5);
	}

	.event-create__personal-name { border-radius: 8px 8px 0 0; }

	.opened .event-create__moment-calendar-top
	{
		position: relative;
		&::before
		{
			content: '';
			position: absolute;
			z-index: 10;
			height: 1px;
			background: #F2F2F7;
			bottom:0px;
			right: 0px;
			width:96%;
		}
	}

	.edited .event-create__moment-btn{ color: #1B1E22; }

	.opened .event-create__moment-btn
	{
		background: #239735;
		color: #fff;
	}

	.event-create__moment-btn
	{
		min-width: 122px;
		border:0px;
		background: #F2F2F7;
		border-radius: 6px;
		color: #8E8E9A;
		font-size: 14px;
		height: 26px;
		text-transform: capitalize;
	}

	.event-create__moment
	{
		border-radius:8px ;
		align-items: center;
		background: #fff;
		width: 100% ;
		height: auto;
		margin: 16px 0 12px 0;
	}

	.event-create__title-text
	{
		color: #1B1E22;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
	}

	.event-create__title-icon
	{
		margin-right: 12px;
		margin-top: 0px;
		margin-bottom: 1px;
	}

	.event-create__moment-item
	{
		position: relative;
		justify-content: space-between;
		display: flex;
		width: calc(100% - 24px);
		align-items: center;
		height: 36px;
		padding: 6px 12px 6px 12px;
	}

	.event-create__moment-item-label
	{
		font-size: 14px;
		line-height: 17px;
		letter-spacing: -2px;
		text-align: center;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.event-create__categories
	{
		position: relative;
		background: #fff;
		width: 100% ;
		border-radius: 8px;
		margin-bottom: 12px;
		scrollbar-color: #239735;
	}

	.event-create__new
	{
		height: 44px;
		width: 100%;
		background-color: #239735;
		border-radius: 8px;
		outline:none;
		border:none;
		margin-bottom:20px;
		border-radius: 10px;
		color: #fff;
		opacity: 0.4;
		pointer-events: nene;

		&.active
		{
			height: 44px;
			width: 100%;
			background-color: #239735;
			border-radius: 8px;
			outline:none;
			border:none;
			margin-bottom:20px;
			border-radius: 10px;
			color: #fff;
			opacity: 1;
			pointer-events: auto;
		}
	}
</style>