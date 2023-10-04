<template>
	<div class="events-item" @click="router.push(`/event/${event.slug}`)">
		<div class="events-item__top">
			<IconNotCategory v-if="event.icon == ''" class="events-item__top-icon"/>
			<span v-else class="events-item__top-icon" v-html="event.icon"></span>
			<div class="events-item__top-block">
				<span class="events-item__title">{{ event.name }}</span>
				<span class="events-item__address">{{ event.address }}</span>
			</div>
			<div class="events-item__top-block">
				<IconPayOrangeCard v-if="event.payment_method === 'online' " class="events-item__pay-icon" />
				<IconPayCash v-if="event.payment_method === 'cash' " class="events-item__pay-icon events-item__pay-icon--cash" />
				<div v-if="event.payment_method === 'free' " class="events-item__free">
					<span class="events-item__free-text">Бесплатно</span>
				</div>
				<span v-if="event.cost_per_person" class="events-item__price">
					{{ (event.cost_per_person).toLocaleString('ru-RU', { minimumFractionDigits: 0 } ) }}
					<span> ₽ </span>
				</span>
			</div>
		</div>
		<div class="events-item__bottom">
			<div class="events-item__bottom-block">
				<IconEventCalendar class="events-item__calendar" />
				<span class="events-item__date">{{ moment(event.date,'D.MM.YYYY').format('dd, D MMM') }}</span>
				<span class="events-item__date">{{ event.time_start }}</span>
			</div>
			<div class="events-item__bottom-time">
					<IconEventClock />
					<span class="events-item__bottom-time-text">{{ event.time_end }}</span>
			</div>
			<div class="events-item__members">
				<IconEventMembers class="events-item__members-icon" />
				<span class="events-item__members-text">Участники</span>
				<span class="events-item__members-count">
					<span class="events-item__count-green">
						{{ event.entered_members_count }}
					</span>
					<span class="events-item__count-slash">/</span>
					<span :class="{ 'events-item__count-green': event.entered_members_count === event.members_count }">
						{{ event.members_count }}
					</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	import IconPayOrangeCard from '@/components/icons/IconPayOrangeCard.vue';
	import IconPayCash from '@/components/icons/IconPayCash.vue';
	import IconNotCategory from '@/components/icons/IconNotCategory.vue';
	import IconEventClock  from '@/components/icons/IconEventClock.vue';
	import IconEventCalendar  from '@/components/icons/IconEventCalendar.vue';
	import IconEventMembers from '@/components/icons/IconEventMembers.vue';
	import { useRouter } from 'vue-router';
	import moment from 'moment';
	import "moment/dist/locale/ru"
	moment.locale("ru");

	const props = defineProps(['event']);
	const router = useRouter();
</script>

<style lang="scss">
	.events-item
	{
		cursor: pointer;
		background: #fff;
		border-radius: 10px;
		align-items: center;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 14px;
	}

	.events-item__free
	{
		color: #fff;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.1px;
		padding: 3px 5px;
		background: #239735;
		border-radius: 5px;
	}

	.events-item__calendar { margin-right: 4px; }

	.events-item__top
	{
		display: flex;
		padding: 12px 11px 10px 12px;
		width: 100%;
		align-items: center;
		border-bottom: 1px solid #E5E5ED;
	}

	.events-item__top-block
	{
		cursor: pointer;
		max-width: 65%;
		&:last-child
		{
			margin-left: auto;
			margin-right: 7px;
			display: flex;
			align-items: center;
			position: relative;
			top: -8px;

			& svg
			{
				margin-right: 4px;
				min-width: 16px;
				min-height: 16px;
			}
		}

		.events-item__free
		{
			color: #fff;
			font-size: 12px;
			font-weight: 500;
			letter-spacing: 0.1px;
			padding: 3px 5px;
			background: #239735;
			border-radius: 5px;
		}

		.events-item__calendar { margin-right: 4px; }

		.events-item__top
		{
			display: flex;
			padding: 12px 11px 10px 12px;
			width: 100%;
			align-items: center;
			border-bottom: 1px solid #E5E5ED;
		}

		.events-item__top-icon
		{
			margin-right: 8px;
			display: block;
		}

		.events-item__title
		{
			color: #1B1E22;
			font-size: 14px;
			font-weight: 500;
			line-height: 18px;
			letter-spacing: 0.35px;
			display: block;
			position: relative;
			top: 1px;
		}


		.events-item__address
		{
			color: #8E8E9A;
			font-size: 12px;
			font-weight: 400;
			letter-spacing: 0.1px;
		}

		.events-item__price
		{
			color: #1B1E22;
			font-size: 14px;
			font-weight: 500;
			letter-spacing: -0.45px;
		}

		.events-item__bottom
		{
			padding: 11px 10px 12px 12px;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			width: 100%;
		}

		.events-item__date
		{
			color: #1B1E22;
			font-size: 12px;
			font-weight: 400;
			letter-spacing: 0.1px;
			word-break: break-all;

			&:nth-child(2){ margin-right: 3px; }

			&:nth-child(3){ margin-right: 8px; }
		}

		.events-item__bottom-time
		{
			display: flex;
			gap: 0 4px;
		}

		.events-item__bottom-time-text
		{
			color: #1B1E22;
			font-size: 12px;
			font-weight: 400;
			letter-spacing: 0.1px;
			word-break: break-all;
		}

		.events-item__members
		{
			display: flex;
			align-items: center;
			margin-left: auto;
			margin-right: 2px;
		}

		.events-item__members-text
		{
			color: #1B1E22;
			font-size: 12px;
			font-weight: 400;
			margin-right: 5px;
			letter-spacing: 0.1px;
		}

		.events-item__members-count
		{
			color: #1B1E22;
			font-size: 12px;
			font-weight: 500;
			letter-spacing: 0.1px;
			gap: 4px;
			word-break: break-all;
		}

		.count-green { color: #239735 }

		.events-item__members-icon
		{
			margin-right: 2px;
			min-width: 16px;
			min-height: 16px;
		}
	}

	.events-item__top-icon
	{
		margin-right: 8px;
		width: 32px;
		height: 32px;
		svg{
			width: 32px;
			height: 32px;
			path{fill:#B9B9CE;}
		}
	}

	.events-item__title
	{
		color: #1B1E22;
		font-size: 14px;
		font-weight: 500;
		line-height: 18px;
		letter-spacing: 0.35px;
		display: block;
		position: relative;
		top: 1px;
	}

	.events-item__pay-icon {
		margin-right: 4px;
		fill:#FF9F0A;
		&--cash{
			fill:#0A84FF;
		}
	}

	.events-item__address
	{
		color: #8E8E9A;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.1px;
	}

	.events-item__price
	{
		color: #1B1E22;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: -0.45px;
	}

	.events-item__bottom
	{
		padding: 11px 10px 12px 12px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		height: auto;
	}

	.events-item__bottom-block
	{
		display: flex;
		align-items: center;
	}

	.events-item__date
	{
		color: #1B1E22;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.1px;
		word-break: break-all;
		&:nth-child(2){ margin-right: 3px; }
		&:nth-child(3){ margin-right: 8px; }
	}

	.events-item__bottom-time
	{
		display: flex;
		align-items: center;
		gap: 0 4px;
	}

	.events-item__bottom-time-text
	{
		color: #1B1E22;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.1px;
		word-break: break-all;
	}

	.events-item__members
	{
		display: flex;
		align-items: center;
		margin-left: auto;
		margin-right: 2px;
	}

	.events-item__members-text
	{
		color: #1B1E22;
		font-size: 12px;
		font-weight: 400;
		margin-right: 4px;
		letter-spacing: 0.1px;
	}

	.events-item__members-count
	{
		color: #1B1E22;
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.1px;
		gap: 4px;
		word-break: break-all;
	}

	.events-item__count-green
	{
		color: #239735;
		&:first-child{ margin-right: 2px; };
	}

	.events-item__count-slash
	{
		color: #B9B9CE;
		margin: 0 4px 0 2px;
	}

	.events-item__members-icon { margin-right: 3px; }
</style>