<template>
	<Swiper v-if="userEvents" :loop="true" :slides-per-view="2.3" :space-between="8">
		<SwiperSlide v-for="event in events" :key="event.id">
			<div class="user-slider" @click="redirectToEvent(event.slug)">
				<div class="user-slider__row">
					<div class="user-slider__image">
						<IconNotCategory v-if="!event.icon" />
						<div v-else class="user-slider__icon" v-html="event.icon"></div>
					</div>
					<div class="user-slider__options"> <IconOptions /> </div>
				</div>
				<div class="user-slider__content">
					<div class="user-slider__content-name">{{ event.name }}</div>
					<div class="user-slider__content-adress">{{ event.address }}</div>
					<div class="user-slider__content-info">
						<div class="user-slider__date-and-time">
							<IconEventCalendar size="14" />
								<span class="user-slider__date">
								{{ moment(event.date + ' ' + event.time_start, 'DD.MM.YYYY HH:mm').format('dd, D MMM HH:mm') }}
								</span>
						</div>
						<div class="user-slider__content-another-info">
							<div class="user-slider__member-count">
								<IconEventMembers size="16" />
								<span class="user-slider__member-count-text">{{ event.entered_members_count }}</span>
							</div>
							<div class="user-slider__member-price">
								<IconPayGrayCard class="user-slider__member-price-icon" v-if="event.payment_method == 'online'"/>
								<IconPayCash class="user-slider__member-price-icon" v-if="event.payment_method == 'cash'" />
								<span class="user-slider__member-price-text">{{ formattedCost(event.cost_per_person) }} ₽</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SwiperSlide>
	</Swiper>
</template>

<script setup>
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import 'swiper/css';
	import { computed } from 'vue';
	import { useRouter } from 'vue-router';
	import IconPayGrayCard from '@/components/icons/IconPayGrayCard.vue';
	import IconPayCash from '@/components/icons/IconPayCash.vue';
	import IconEventCalendar from '@/components/icons/IconEventCalendar.vue';
	import IconEventMembers from '@/components/icons/IconEventMembers.vue';
	import IconNotCategory from '@/components/icons/IconNotCategory.vue';
	import IconOptions from '@/components/icons/IconOptions.vue';
	import moment from 'moment';
	import "moment/dist/locale/ru"
	moment.locale("ru");

	const props = defineProps(['userEvents']);

	const router = useRouter();

	const events = computed(() => {
		return [...props.userEvents];
	});

	const formattedCost = (cost) => {
		return cost.toLocaleString('ru-RU');
	};

	const redirectToEvent = (slug) => {
		router.push(`/event/${slug}`);
	};
</script>

<style lang="scss">
	.swiper
	{
		margin-right: 48px;
		overflow: visible;
	}

	.swiper-slide
	{
		min-width: 148px;
		max-width: 148px;
		&:first-child{ margin-left: 12px; }
	}

	.user-slider
	{
		overflow: hidden;
		font-family: "Roboto";
		cursor: pointer;
		padding: 12px 0;
		border-radius: 10px;
		position: relative;
		background: $primary-background;
	}

	.user-slider__date
	{
		color: #1B1E22;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		letter-spacing: 0.1px;
		margin-left: 4px;
		text-transform: capitalize;
	}

	.user-slider__icon
	{
		min-width: 32px;
		min-height: 32px;
		max-width: 32px;
		max-height: 32px;
	}

	.user-slider__row
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 12px;
	}

	.user-slider__content-name
	{
		color: $primary;
		font-size: 14px;
		font-style: normal;
		margin:7px 0 1px 0;
		font-weight: 500;
		font-family: 'Roboto';
		line-height: 18px;
		letter-spacing: 0.25px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 200px;
		padding: 0 12px;
	}

	.user-slider__content-adress
	{
		color: $secondary-text;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
		font-family: 'Roboto';
		line-height: 120%;
		letter-spacing: 0.1px;
		border-bottom: 1px solid rgba(142, 142, 154, 0.1);
		padding: 0 12px 12px 12px;
	}

	.user-slider__content-info { padding-top: 11px; }

	.user-slider__content-another-info
	{
		display: flex;
		align-items: center;
		margin-top: 12px;
		padding: 0 12px;
	}

	.user-slider__date-and-time
	{
		display: flex;
		align-items: center;
		font-size: 10px;
		font-weight: 400;
		letter-spacing: 0.1px;
		padding:0 12px;
	}

	.user-slider__member-count, .user-slider__member-price
	{
		font-size: 12px;
		display: flex;
		align-items: center;
		font-weight: 400;
		letter-spacing: 0.1px;
	}

	.user-slider__member-count-text,.user-slider__member-price-text { margin-left: 3px; }

	.user-slider__member-price { margin-left: 12px; }

	.user-slider__member-price-icon
	{
		min-width: 14px;
		min-height: 14px;
		max-width: 14px;
		max-height: 14px;
	}

	.user-slider__member-price-text { margin-right: 4px; }

	.user-slider__member-price-icon
	{
		path{ fill:#B9B9CE; }
	}

	.user-slider__icon svg
	{
		fill:#B9B9CE;
		width:32px;
		height: 32px;
	}

	.user-slider__options
	{
		position: relative;
		top: 2px;
		left: 1px;
	}
</style>