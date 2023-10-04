<template>
	<div class="container-fluid">
		<div class="create-game">
			<div class="create-game__header">
				<IconBackPage @click="router.back" class="create-game__header-svg"/>
				<h2 class="create-game__title">Создание игры</h2>
			</div>
			<div class="personal-info">
				<CustomInput
					:error="postCreateGame.name"
					v-model="postCreateGame.name"
					placeholder="Название" icon="close"
					class="personal-name"
				/>
				<hr class="user-edit__personal-delimetr" />
				<CreateGameInputAddress
					title="Адреc"
					v-model="postCreateGame.address"
					placeholder="Адресс"
					icon="close"
					class="personal-lastname"
				/>
			</div>
			<div class="create-game__date-box">
				<CreateGameCalendar
					:fullDate="postCreateGame.date"
					@update="(newDate) => postCreateGame.date = newDate"
				/>
				<div class="create-game__date-item">
					<label for="timeId" class="create-game__date-item-label">
						<div class="create-game__title">
							<IconClock class="create-game__icon-item" />
							<h3 class="create-game__title-h3">Время Начала</h3>
						</div>
						<div class="create-game__timer-wrapper">
							<CreateGameTime
								@update="(startGame)=> postCreateGame.timeStart = startGame"
								:types="['h','m']"
								:count="2"
								id="timeId"
							/>
						</div>
						<div class="create-game__line"> </div>
					</label>
				</div>
				<div class="create-game__date-item">
					<label for="durationId" class="create-game__date-item-label">
						<div class="create-game__title">
							<IconTimer class="create-game__icon-item" />
							<h3 class="create-game__title-h3">Длительность</h3>
						</div>
						<div class="create-game__timer-wrapper">
							<CreateGameTime
								@update="(duratinGame) => postCreateGame.duration = duratinGame"
								:types="['h','m']"
								:count="2"
								id="durationId"
							/>
						</div>
					</label>
					<div class="create-game__line"> </div>
				</div>
			</div>
			<div class="create-game__categorie-box">
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
			<div class="create-game__item-box">
				<CreateGameVisble  @update="(value)=> postCreateGame.gameType=value "/>
			</div>
			<textarea
				v-model="postCreateGame.comment"
				class="create-game__instruction"
				placeholder="Инструкция по проезду, правила игры и другая информация для участников"
			/>
			<button class="create-game__create-new"
				@click="sendForm"
				:class="{'create-game__create-new--active' :postCreateGame.name && postCreateGame.address
					&& postCreateGame.membersCount && postCreateGame.gameType }"
			>
				Cоздать игру
			</button>
		</div>
	</div>
</template>

<script setup>
	import CustomInput from '@/ui/CustomInput.vue';
	import CreateGameTime from '@/components/CreateGame/CreateGameTime.vue';
	import CreateGameInputAddress from '@/components/CreateGame/CreateGameInputAddress.vue';
	import CreateGameCalendar from '@/components/CreateGame/CreateGameCalendar.vue';
	import CreateGameCategories from '@/components/CreateGame/CreateGameCategoris.vue';
	import CreateGameVisble from '@/components/CreateGame/CreateGameVisible.vue';
	import CreateGamePayment from '@/components/CreateGame/CreateGamePayment.vue';
	import IconBackPage from '@/components/icons/IconBackPage.vue'
	import IconClock from '@/components/icons/IconClock.vue';
	import IconTimer from '@/components/icons/IconTimer.vue';

	import api from '@/api/api.client.js'
	import { reactive} from 'vue';
	import router from '@/router';

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
	.create-game
	{
		.create-game__header
		{
			.create-game__header-svg{ margin-right: 16%; }
			.create-game__title
			{
				text-align: center;
				display: inline-block;
			}
		}
		.categiries-animation-enter-active, .categiries-animation-leave-active { transition: all 0.3s ease-in-out; }
		.categiries-animation-leave-active  { transition-delay: 0.25s; }

		.categiries-animation-enter-from,
		.categiries-animation-leave-to
		{
			transform: translateY(30px);
			opacity: 0;
		}
		.categiries-animation-enter-active .inner,
		.categiries-animation-leave-active .inner { transition: all 0.3s ease-in-out; }
		.categiries-animation-enter-active .inner { transition-delay: 0.25s; }
		.categiries-animation-enter-from .inner,
		.categiries-animation-leave-to .inner
		{
			transform: translateX(30px);
			opacity: 0.001;
		}
		.create-game__wrapper{border-radius: 8px;}
		.create-game__timer[type='number']{-moz-appearance: textfield;}
		.create-game__timer::-webkit-outer-spin-button,
		.create-game__timer::-webkit-inner-spin-button{-webkit-appearance: none;}
		.create-game__tipical-box
		{
			height: 36px;
			align-items: center;
			display: flex;
			justify-content: space-between;
			outline:none;
			border:none;
			padding: 6px 12px;
		}
		.personal-info
			{
				position: relative;
				margin-bottom: 12px;
				.personal-name
				{
					border-radius: 8px 8px 0 0;
					.custom-input__input::after
					{
						content: "";
						display: block;
						position: absolute;
						height: 1px;
						width: 96%;
						background: #f0f0f0;
						bottom: -30px;
						right: 0;
					}
				}
				.personal-lastname
				{
					border-radius: 0 0 8px 8px;
				}
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
			}
		.create-game__line
		{
			background-color: #F2F2F7;
			height: 1px;
			width: 96%;
			position: absolute;
			top: 0;
			left: 5%;
		}
		.create-game__line-item
		{
			background-color: #F2F2F7;
			height: 1px;
			width: 95%;
			position: relative;
			top: 0;
			left: 5%;
		}
		.create-game__input-box:first-child .create-game__input
		{
			border-radius: 0;
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}

		.create-game__input-box:last-child .create-game__input
		{
			border-radius: 0;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
		}
		.create-game__wrapper{border-radius: 8px;}
		.create-game
		{
			display: flex;
			justify-content: space-between;
		}
		.create-game__title
		{
			font-size: 16px;
			line-height: 24px;
			letter-spacing: 0.5px;
			width: 56%;
		}
		.create-game__item-box
		{
			position: relative;
			margin-bottom: 13px;
			background: #fff;
			border-radius: 8px;
		}
		.create-game__create-new
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
		}
		.create-game__create-new--active
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
		.create-game__instruction
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
		}
		.create-game__instruction:placeholder
		{
			font-size: 12px;
			font-weight: 400;
			line-height: 18px;
			letter-spacing: 0.25px;
		}
		.create-game__title-users
		{
			display: flex;
			align-items: center;
		}

		.create-game__closer
		{
			border: none;
			font-size: 14px;
			line-height: 17px;
			letter-spacing: 0.25px;
			color: #8E8E9A;
		}
		.create-game__categories-item--active
		{
			path
			{
				transition: 300ms ease-in all;
				fill:#239735;
			}
			p
			{
				transition: 300ms ease-in color;
				color: #239735;
			}
		}
	}
</style>