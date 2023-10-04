<template>
	<div class="events-my-item__card">
		<div class="events-my-item__card-header">
			<div class="events-my-item__header-text">
				<IconNotCategory v-if="isIconError" class="events-my-item__event-type"/>
				<div v-if="userEventObj?.icon" class="events-my-item__icon" v-html="userEvent.icon"></div>
				<div class="events-my-item__text-box">
					<p class="events-my-item__event-name">{{ userEventObj.name }}</p>
					<p class="events-my-item__event-address">{{ userEventObj.address }}</p>
				</div>
			</div>
			<div class="events-my-item__block" >
				<button
					@click="isPopUpFunc"
					class="events-my-item__event-social"
				>
					<IconUserEventsOther
						class="events-my-item__event-social-icon"
						:class="{'active' : isPopUp}"
						ref="refPopUpOpenIcon"/>
				</button>
			</div>
			<div
				v-if="isPopUp"
				v-click-outside="isPopUpClose"
				class="events-my-item__popup"
				:class="{ 'active' : isPopUp }"
			>
				<IconPopUpRectangle class="events-my-item__popup-rectangle"/>
				<IconCountryRectangleLine class="events-my-item__popup-rectangle-line" />
				<div class="events-my-item__popup-block">
					<IconEventsRepeat class="events-my-item__popup-icon"/>
					<span class="events-my-item__popup-text green">Повторить</span>
				</div>
				<div
					id="userPopupShare"
					class="events-my-item__popup-block share-btn__action"
					data-curtain
					data-shape="round"
					data-limit="0"
					data-services="telegram,whatsapp,vkontakte,viber"
				>
				</div>
				<div class="events-my-item__popup-plate">
					<ShareIcon />
					<span class="events-my-item__popup-text">Поделиться</span>
				</div>
			</div>
		</div>
		<div class="events-my-item__line"></div>
		<div class="events-my-item__info-box">
			<div class="events-my-item__card-info">
				<p>
					<IconEventCalendar/>
					<span >{{ formattedDate }}</span>
					<span >{{ userEventObj.time_start }}</span>
				</p>
				<p>
					<IconEventMembers/>
					<span >{{ userEventObj.entered_members_count }}</span>
				</p>
				<p>
					<IconPayOrangeCard v-if="userEventObj.payment_method === 'online' " class="game-item__pay-icon" />
					<IconCreateGameCash v-if="userEventObj.payment_method === 'cash' " class="game-item__pay-icon" />
					<span >500 <span>₽</span></span>
				</p>
			</div>
			<div v-if="vision" class="events-my-item__card-raiting">
				<IconEventsStar/>
				<span class="events-my-item__my-grade">Моя оценка</span>
				<span class="events-my-item__grade">4.2</span>
			</div>
		</div>
		<div  v-if="vision" class="events-my-item__grade-pipls">
			<IconEventExclamation/>
			<p>Вы ещё не оценили участников</p>
			<button>Оценить </button>
		</div>
	</div>
</template>

<script setup>
	import IconProfileDots from '@/components/icons/IconProfileDots.vue';
	import IconEventCalendar  from '@/components/icons/IconEventCalendar.vue';
	import IconPayOrangeCard from '@/components/icons/IconPayOrangeCard.vue';
	import IconCreateEventCash from '@/components/icons/IconCreateEventCash.vue';
	import IconNotCategory from '@/components/icons/IconNotCategory.vue';
	import IconEventMembers from '@/components/icons/IconEventMembers.vue';
	import IconEventsStar from '@/components/icons/IconEventsStar.vue';
	import IconEventExclamation from '@/components/icons/IconEventExclamation.vue';
	import IconEventsRepeat from '@/components/icons/IconEventsRepeat.vue';
	import IconPopUpRectangle from '@/components/icons/IconPopUpRectangle.vue';
	import IconCountryRectangleLine from '@/components/icons/IconCountryRectangleLine.vue';
	import { ref, computed, onMounted, nextTick } from 'vue';
	import { useRouter } from 'vue-router';
	import ShareIcon from '@/components/icons/ShareIcon.vue';
	import IconUserEventsOther from '@/components/icons/IconUserEventsOther.vue';

	const urlSite = process.env.MAIN_HOST;
	const router = useRouter();
	const isPopUp = ref(false);
	const refPopUpOpenBtn = ref(null);
	const refPopUpOpenIcon = ref(null);
	const popUpClose = () => isPopUp.value = false;

	const linkGame = function(event)
	{
		if(event.target == refPopUpOpenIcon.value.$el || event.target == refPopUpOpenBtn.value)
			return false
		else
			router.push(`/game/${userEventObj.slug}`);
	}

	const today = new Date();
	let todayDay = today.getDate() < 10 ? '0' + today.getDate() : '' + today.getDate();
	let todayMonth = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : '' + (today.getMonth() + 1);
	let todayYear = today.getFullYear();
	let todayDate = `${todayDay}.${todayMonth}.${todayYear}`

	const url = process.env.MAIN_HOST

	const isIconError = ref();

	const props = defineProps({
		userEvent: Object,
		userEvents: Object
	});

	const userEventObj = Object.assign({},props.userEvent);
	const vision = ref(false)

	const imageLoadOnError = e => isIconError.value = true;

	const formattedDate = computed(() => {
		if (userEventObj.date) {
			const dateParts = userEventObj.date.split('T');
			const dateOnly = dateParts[0];

			const [year, month, day] = dateOnly.split('-');
			const eventDate = new Date(year, month - 1, day);

			const options = { year: 'numeric', month: 'short', day: 'numeric' };
			const formatted = eventDate.toLocaleDateString('ru-RU', options);
			if (formatted === todayDate) return `Сегодня, `;
			else return formatted;
		}
		return null;
	});

	const shareIsSupported = ('share' in navigator);

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

	const setupShare = () =>
	{
		window.Ya.share2('userPopupShare',
		{
			content:
			{
				url: urlSite + '/' + userEventObj.slug,
				title: userEventObj.name,
				description: userEventObj.name,
			}
		});
	};

	const share = function()
	{
		if (shareIsSupported)
		{
			const shareData =
			{
				title: userEventObj.name,
				text: userEventObj.name,
				url: urlSite + '/' + userEventObj.slug
			};

			navigator.share(shareData).catch(error =>
			{
				console.error('Error sharing:', error);
			});
		}
		else
			setupShare();
	};

	onMounted(async () =>
	{
		if(!shareIsSupported)
			await loadYandexShare()
	});

	const isPopUpFunc = async () =>
	{
		isPopUp.value = !isPopUp.value;

		await nextTick();
		setupShare()
	}

	const isPopUpClose = () => isPopUp.value = false;
</script>

<style lang="scss">
	.events-my-item__card
	{
		background-color: $white;
		padding: 10px 0 12px 0;
		border-radius: 12px;
		margin-bottom: 12px;
		position: relative;
	}

	.events-my-item__text-box
	{
		margin-right: 10px;
		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.events-my-item__event-name,.events-my-item__event-address
	{
		overflow: hidden;
		text-overflow: ellipsis;
		font-style: normal;
		font-weight: 500;
		line-height: 18px;
		margin: 0;
	}

	.events-my-item__event-name
	{
		color: $primary;
		font-size: 14px;
		letter-spacing: 0.25px;
	}

	.events-my-item__event-address
	{
		color:$secondary-text;
		font-size: 12px;
		letter-spacing: 0.1px;
	}

	.events-my-item__header-text
	{
		display: flex;
		align-items: center;
		gap: 8px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 95%;
	}
	.events-my-item__card-header
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 11px;
		padding: 0 12px 0 12px;
	}
	.events-my-item__event-social
	{
		border: none;
		z-index: 2;
		position: relative;
		-webkit-tap-highlight-color:rgba(0,0,0,0);

		& svg
		{
			position: relative;
			top: 2px;
			z-index: 1;
		}
	}

	.events-my-item__event-type
	{
		width: 32px;
		height: 32px;
	}

	.events-my-item__card-info
	{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap:8px;

		p
		{
			display: flex;
			margin: 0;
			gap:2px;
			flex-wrap: wrap;

			&:nth-child(2){ margin-right: 4px; }

			& svg
			{
				margin-right: 2px;
				min-width: 14px;
				min-height: 14px;
			}
		}

		span
		{
			color: $primary;
			text-align: left;
			word-break: break-all;
			font-size: 12px;
			font-style: normal;
			font-weight: 400;
			line-height: 120%;
			letter-spacing: 0.1px;
		}
	}

	.events-my-item__icon
	{
		& svg
		{
			min-width: 32px;
			min-height: 32px;
			max-width: 32px;
			max-height: 32px;
			position: relative;
			top: 2px;
			left: 0;
			fill: #B9B9CE;
		}
	}

	.game-item__pay-icon
	{
		min-width: 14px;
		min-height: 14px;
		path{ fill:#B9B9CE; }
	}

	.events-my-item__info-box
	{
		display: flex;
		justify-content: space-between;
		padding:10px 12px 0 12px;
	}

	.events-my-item__my-grade
	{
		color: $primary;
		font-family: Roboto;
		font-size: 12px;
		font-weight: 400;
		line-height: 120%;
		letter-spacing: 0.1px;
	}

	.events-my-item__grade
	{
		color: #FF9F0A;
		font-family: Roboto;
		font-size: 14px;
		font-weight: 700;
		line-height: 18px;
		letter-spacing: 0.25px;
	}

	.events-my-item__card-raiting
	{
		display: flex;
		align-items: center;
		gap: 2px
	}

	.events-my-item__grade-pipls
	{
		background-color: $darkText;
		display: flex;
		align-items: center;
		padding: 12px 10px;
		gap: 6px;
		border-radius: 8px;
		font-family: Roboto;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 18px;
		letter-spacing: 0.25px;

		button
		{
			display: flex;
			width: 79px;
			padding: 7px 18px;
			justify-content: center;
			align-items: center;
			gap: 6px;
			background: #FF9F0A;
			color: $white;
			border: none;
			border-radius: 8px;
		}

		p { margin: 0; }
	}

	.events-my-item__block
	{
		position: relative;
		width: 5%;
		right: 8px;
	}

	.events-my-item__popup
	{
		background: #fff;
		border-radius: 8px;
		border: 0.5px solid #E5E5ED;
		position: absolute;
		z-index: 2;
		right: -7px;
		top: 45px;

		&:first-child { border-bottom: 1px solid #e5e5eD; }

		&.active{ z-index: 3; }

		.share-btn__action
		{
			position: relative;
			width: 100%;
			z-index: 2;
		}

		.ya-share2__container, .ya-share2__container .ya-share2__item { width: 93%; }
	}

	.events-my-item__popup-rectangle,.events-my-item__popup-rectangle-line
	{
		position: absolute;
		top: -9px;
		margin: 0 auto;
		right: 20px;
	}

	.events-my-item__popup-rectangle-line
	{
		top: 0;
		margin-right: 1px;
	}

	.events-my-item__popup-icon { margin-right: 13px; }

	.events-my-item__popup-block
	{
		display: flex;
		align-items: center;
		padding: 32px 22px 13px 8px;

		&:nth-child(3)
		{
			padding: 14.3px 22px 14px 14px;
			border-bottom: 1px solid #e5e5eD;

			.events-my-item__popup-icon
			{
				margin-right: 11px;
				position: relative;
				left: -2px;
			}

			.events-my-item__popup-text{ margin-right: 9px; }
		}

		&:nth-child(4)
		{
			.share-btn { padding: 0; }

			& svg
			{
				max-width: 24px;
				max-height: 24px;
				position: relative;
			}

			&.ya-share2_inited { padding: 6.5px; }
		}
	}

	.events-my-item__popup-text
	{
		font-size: 14px;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;
		&.green{ color: #239735; }
	}

	.events-my-item__line
	{
		width: 100%;
		height: 1px;
		background: #E5E5ED;
		position: relative;
		top: -1px;
	}

	.events-my-item__popup-plate
	{
		position: absolute;
		bottom: 11px;
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

	.events-my-item__event-social-icon
	{
		&.active
		{
			& path { fill: #239735; }
		}
	}
</style>