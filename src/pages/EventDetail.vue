<template>
	<div class="event-detail" v-if="!loading && game">
		<div class="container-fluid">
			<div class="event-detail__header">
				<IconBackPage class="event-detail__header-back" @click="$router.back()" />
				<h3 class="event-detail__header-title" >Список игр</h3>
				<IconOptions class="event-detail__header-dots" @click="isPopUpFunc"/>
				<div v-if="role == 'user' " class="event-detail__popup-wrapper events-detail__popup-user">
					<div
						v-if="isPopUp"
						v-click-outside="isPopUpClose"
						class="event-detail__popup"
						:class="{ 'active' : isPopUp }"
					>
						<IconPopUpRectangle class="event-detail__popup-rectangle"/>
						<IconCountryRectangleLine class="event-detail__popup-rectangle-line" />

						<div
							id="gameDetailPopupShare"
							class="event-detail__popup-yandex share-btn__action"
							data-curtain
							data-shape="round"
							data-limit="0"
							data-services="telegram,whatsapp,vkontakte,viber"
						>
						</div>
						<div class="event-detail__popup-plate event-detail__popup-share" >
							<ShareIcon class="event-detail__popup-icon"/>
							<span class="event-detail__popup-text">Поделиться</span>
						</div>
						<div
							v-if="!isPassedEvent"
							@click="gameExit"
							class="event-detail__popup-block event-detail__popup-exit"
						>
							<IconEventDetailExit class="event-detail__popup-icon"/>
							<span class="event-detail__popup-text">Выйти из игры</span>
						</div>
					</div>
				</div>

				<div v-if="role == 'admin' " class="event-detail__popup-wrapper events-detail__popup-admin">
					<div
						v-if="isPopUp"
						v-click-outside="isPopUpClose"
						class="event-detail__popup"
						:class="{ 'active' : isPopUp }"
					>
						<IconPopUpRectangle class="event-detail__popup-rectangle"/>
						<IconCountryRectangleLine class="event-detail__popup-rectangle-line" />

						<div class="event-detail__popup-block event-detail__popup-repeat">
							<IconEventsRepeat class="event-detail__popup-icon"/>
							<span class="event-detail__popup-text">Повторить</span>
						</div>
						<div
							id="gameDetailPopupShare"
							class="event-detail__popup-yandex share-btn__action"
							data-curtain
							data-shape="round"
							data-limit="0"
							data-services="telegram,whatsapp,vkontakte,viber"
						>
						</div>
						<div class="event-detail__popup-plate event-detail__popup-share">
							<ShareIcon class="event-detail__popup-icon share-popup-icon"/>
							<span class="event-detail__popup-text share-popup-text">Поделиться</span>
						</div>
						<div @click="gameEdit" class="event-detail__popup-block event-detail__popup-edit">
							<IconEventDetailEdit class="event-detail__popup-icon"/>
							<span class="event-detail__popup-text">Редактировать</span>
						</div>
						<div @click="gameClose" class="event-detail__popup-block event-detail__popup-close">
							<IconEventDetailClose class="event-detail__popup-icon"/>
							<span class="event-detail__popup-text">Закрыть игру</span>
						</div>
					</div>
				</div>

			</div>
			<div class="event-detail__content">
				<CardBox>
					<div class="event-detail__info">
						<div class="event-detail__info-header">
							<h1 class="event-detail__label"> {{game.name}} </h1>
							<div class="event-detail__info-join" v-if="!isPassedEvent">
								<button
									v-if="!isJoin"
									class="event-detail__button event-detail__button-join"
									@click="joinToEvent"
								>
									<Icon name="PlusIcon" size="19" fill="#fff" />
									Участвовать
								</button>
								<button
									v-if="isJoin"
									class="event-detail__button event-detail__button-exit"
									@click="exitGame"
								>
									<IconEventDetailExit class="event-detail__button-icon"/>
									Выйти из игры
								</button>
							</div>
							<div class="event-detail__info-passed" v-if="isPassedEvent">
								<button
									v-if="isJoin"
									class="event-detail__button event-detail__button-rating"
									@click="router.push('/rating/')"
								>
									<IconEventMembersRating class="event-detail__button-icon"/>
									Оценить
								</button>
								<button
									class="event-detail__button event-detail__button-close"
									@click="closeGame"
									v-if="role == 'admin' "
								>
									<IconEventDetailClose class="event-detail__button-icon"/>
									Закрыть игру
								</button>
							</div>
						</div>
						<div class="event-detail__map">
							<DetailMap :address="game.address"/>
						</div>
						<Date :date="game.date" :dateAndTime="game.datetime" :startTime="game.time_start" />
						<GameDuration :duration="game.duration" :starTime="game.time_start" />
						<TotalPrice :totalCost="game.totalCost" :membersCount="game.membersCount" :paymentMethod="game.paymentMethod" />
						<GameCategory :category="game.category"/>
					</div>
				</CardBox>
				<CardBox>
					<GameNotification />
				</CardBox>
				<CardBox v-if="game.comment">
					<GameComment :comment="game.comment" />
				</CardBox>
				<div class="event-detail__block event-detail__block--members">
					<Members
						:role="role"
						:isJoin="isJoin"
						:isPassedEvent="isPassedEvent"
						:game="game"
						@joinToEvent="joinToEvent"
					/>
					<button @click="editGame()">редактировать</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import IconEventDetailPlus from '@/components/icons/IconEventDetailPlus.vue'
	import Date from '@/components/eventDetail/Date.vue';
	import GameDuration from '@/components/eventDetail/Duration.vue';
	import Members from '@/components/eventDetail/Members.vue';
	import ShareBtn from '@/components/ShareBtn.vue';
	import GameComment from '@/components/eventDetail/Comment.vue';
	import IconBackPage from '@/components/icons/IconBackPage.vue';
	import IconPopUpRectangle from '@/components/icons/IconPopUpRectangle.vue';
	import IconCountryRectangleLine from '@/components/icons/IconCountryRectangleLine.vue';
	import IconEventsRepeat from '@/components/icons/IconEventsRepeat.vue';
	import ShareIcon from '@/components/icons/ShareIcon.vue';
	import IconEventDetailExit from '@/components/icons/IconEventDetailExit.vue';
	import IconEventDetailClose from '@/components/icons/IconEventDetailClose.vue';
	import IconEventDetailEdit from '@/components/icons/IconEventDetailEdit.vue';
	import IconOptions from '@/components/icons/IconOptions.vue';
	import IconEventMembersRating from '@/components/icons/IconEventMembersRating.vue';

	import GameNotification from '@/components/eventDetail/Notification.vue';
	import TotalPrice from '@/components/eventDetail/TotalPrice.vue';
	import CardBox from '@/ui/CardBox.vue';
	import DetailMap from '@/components/eventDetail/Map.vue';
	import GameCategory from '@/components/eventDetail/Category.vue';
	import { onMounted } from 'vue';
	import api from '@/api/api.client';
	import { useRoute, useRouter } from 'vue-router';
	import { ref, nextTick, computed } from 'vue';
	import { useNavBarStore } from '@/stores/navBar';
	import { useUserStore } from '@/stores/user';
	import moment from 'moment';
	import "moment/dist/locale/ru"

	moment.locale("ru");

	const currentDate = moment().format('DD.MM.YYYY');

	const userStore = useUserStore();
	const isJoin = ref(true);
	const role = ref('admin');
	const isPopUp = ref(false);
	const navBarStore  = useNavBarStore();
	navBarStore.isShow = null;
	const route        = useRoute();
	const router       = useRouter();
	const loading      = ref(false);
	const slug         = route.params.id;
	const game         = ref(null);

	const editGame = () => {
		router.push(`/game/edit/${slug}`);
	}

	async function joinToEvent()
	{
		const response = await api.events.joinToEvent(slug);
		fetchGame();
	}

	async function fetchGame()
	{
		loading.value = true;

			const response = await api.events.fetchEvents(slug);
			game.value = response.data.event;

		checkMemberJoin();

		loading.value = false;
	}

	const checkMemberJoin = () => {
		isJoin.value = (
			game.value &&
			game.value.members &&
			game.value.members.some(member => member.id === userStore.user.id)
		);
	};

	const shareIsSupported = ('share' in navigator);

	const share = function()
	{
		if (!shareIsSupported)
		{
			setupShare();
			return false;
		}

		const shareData =
		{
			title : `${game.value.name}`,
			text  : `${game.value.name}`,
			url   : window.location.href
		};

		navigator.share(shareData).catch(error => {
			console.error('Error sharing:', error);
		});

	};

	const setupShare = () =>
	{
		window.Ya.share2('gameDetailPopupShare',
		{
			content:
			{
				url: window.location.href,
				title: `${game.value.name}`,
				description: `${game.value.name}`,
			}
		});
	};

	const loadYandexShare = () =>
	{
		if (window?.Ya?.share2)
			setupShare();
		else
		{
			const script = document.createElement('script');

			script.setAttribute('src', 'https://yastatic.net/share2/share.js');
			script.addEventListener('load', () => setupShare());
			document.head.appendChild(script);
		}
	};

	onMounted(async () =>
	{
		await fetchGame()

		if(!shareIsSupported)
			loadYandexShare();
	});

	const isPopUpFunc = async () =>
	{
		isPopUp.value = !isPopUp.value;

		await nextTick();
		setupShare()
	}

	const isPopUpClose = () => isPopUp.value = false;

	const isPassedEvent = computed(() => {
	const currentDateMoment = moment(currentDate, "DD.MM.YYYY");
	const gameDateMoment = moment(game.value.date, "DD.MM.YYYY");

	if (currentDateMoment.isAfter(gameDateMoment))
		return true;
	 else
		return false;
	});

</script>

<style lang="scss">
	.event-detail__block
	{
		margin-bottom: 12px;
		border-radius: 8px;
		padding: 16px 12px;
		background: #fff;
		overflow: hidden;

		&--members { padding: 16px 0 16px 12px; }
	}

	#map
	{
		width: 100%;
		height: 400px;
	}

	.event-detail__header
	{
		justify-content: left;
		align-items: center;
		display: flex;
		position: relative;
	}

	.event-detail__header-dots { margin-left: auto; }

	.event-detail__header-title
	{
		font-family: "Roboto";
		color: #1B1E22;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
		margin-left: 12px;
	}

	.event-detail__map .ymap-container
	{
		width: 100%;
		height: 80px;
		border-radius: 8px;
		overflow: hidden;

		.ymaps-2-1-79-map-copyrights-promo, .ymaps-2-1-79-copyright__content-cell { display: none; }
	}

	.event-detail__info-header
	{
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.event-detail__label
	{
		font-family: 'Roboto';
		font-size: 22px;
		font-style: normal;
		color: $primary;
		margin: 0;
		max-width: 20%;
		font-weight: 500;
		line-height: normal;
	}

	.event-detail__button
	{
		font-family: 'Roboto';
		color: #1B1E22;
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
		letter-spacing: 0.1px;
		border: none;
		border-radius: 6px;
		background: #E5E5ED;
		display: flex;
		align-items: center;
		padding: 5px 11px 5px 10px;
		outline: none;
	}

	.event-detail__button-join
	{
		background: $button;
		color: #fff;
	}

	.event-detail__button-rating
	{
		background: #FF9F0A;
		color: #fff;
	}

	.event-detail__button-icon
	{
		width:13.5px;
		height:13.5px;
		margin-right: 5px;
	}

	.event-detail__popup-block
	{
		display: flex;
		align-items: center;
		padding: 14.3px 17px 14px 14px;
		border-top: 1px solid #e5e5ed;

		&:hover,&:focus,&:active
		{
			.event-detail__popup-text { color: #239735; }

			.event-detail__popup-icon path{ fill: #239735; }
		}

	}

	.event-detail__popup-repeat { border: none; }

	.event-detail__popup-share { padding: 0px 22px 17px 12px; }

	.event-detail__popup-yandex
	{
		border-top: 1px solid #e5e5ed;
		padding: 0 17px 0 14px;
		position: relative;
		width: 82%;
		z-index: 2;
	}

	.event-detail__popup-yandex,.ya-share2__link
	{
		&:hover + .event-detail__popup-share
		{
			.event-detail__popup-text { color: #239735; }

			.event-detail__popup-icon path { fill: #239735; }
		}
	}

	.event-detail__popup-repeat
	{
		& .event-detail__popup-icon
		{
			position: relative;
			left: -2px;
		}

		& .event-detail__popup-text
		{
			position: relative;
			left: -3px;
		}
	}

	.event-detail__popup-edit
	{
		& .event-detail__popup-icon
		{
			position: relative;
			left: -2px;
			top: -2px;
		}

		& .event-detail__popup-text
		{
			position: relative;
			left: -3px;
		}
	}

	.event-detail__popup-close
	{
		& .event-detail__popup-icon
		{
			position: relative;
			left: -3px;
		}

		& .event-detail__popup-text
		{
			position: relative;
			left: -5px;
		}
	}

	.events-detail__popup-admin { .event-detail__popup-plate { top: 65px; } }

	.events-detail__popup-user
	{
		.event-detail__popup-yandex
		{
			border: none;
			// padding: 18px 17px 0px 14px;
			padding: 0;
			width: 82%;
		}
	}

	.event-detail__popup
	{
		background: #fff;
		border-radius: 8px;
		border: 0.5px solid #E5E5ED;
		position: absolute;
		z-index: 2;
		right: -7px;
		top: 45px;
		min-width: 170px;
		max-width: 172px;

		&:first-child { border-bottom: 1px solid #e5e5eD; }

		&.active{ z-index: 3; }

		.ya-share2__container, .ya-share2__container .ya-share2__item { width: 93%; }
	}
	.event-detail__popup .ya-share2__container, .event-detail__popup .ya-share2__container .ya-share2__item
	{
		width: 110%;
		height: 52px;
		left: 0px;
		position: relative;
		border-radius: 10px;
	}
	.event-detail__popup-rectangle,.event-detail__popup-rectangle-line
	{
		position: absolute;
		top: -9px;
		margin: 0 auto;
		right: 8px;
	}

	.event-detail__popup-rectangle-line
	{
		top: 0;
		margin-right: 1px;
	}

	.event-detail__popup-icon
	{
		margin-right: 13px;

		& path { fill: #8E8E9A; }
	}

	.event-detail__popup-text
	{
		font-size: 14px;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;
		color: #8E8E9A;
	}

	.event-detail__line
	{
		width: 100%;
		height: 1px;
		background: #E5E5ED;
		position: relative;
		top: -1px;
	}

	.event-detail__popup-plate
	{
		position: absolute;
		top: 11px;
		z-index: 1;
		display: flex;
		align-items: center;
		padding: 0 10px;

		svg
		{
			width: 26px;
			height: 26px;
			margin-right: 11px;

			& path { fill: #8E8E9A; }
		}
	}

	.event-detail__info-passed
	{
		display: flex;
		gap: 12px;
	}
</style>