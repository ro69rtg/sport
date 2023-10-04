<template>
	<div class="event-detail-price">
		<div class="event-detail-price__row">
			<div class="event-detail-price__block">
				<IconWallet class="event-detail-price__icon"/>
				<span class="event-detail-price__text">
					Общая стоимость
				</span>
			</div>
			<span class="event-detail-price__money"> {{ totalCost.toLocaleString('ru-RU') }} ₽ </span>
		</div>
		<div class="event-detail-price__info">
			<span class="event-detail-price__info-text"> Стоимость для участника </span>
			<span class="event-detail-price__info-value"> {{ priceForOne.toLocaleString('ru-RU')}} ₽ </span>
		</div>
		<div class="event-detail-price__pay">
			<span class="event-detail-price__info-text"> Способо оплаты </span>
			<div class="event-detail-price__info-value">
				<IconPayOrangeCard class="event-detail-price__info-icon" v-if="paymentMethod === 'online' "/>
				<IconPayMoney class="event-detail-price__info-icon" v-if="paymentMethod === 'cash' "/>
				<span class="event-detail-price__info-value-text">{{ paymentType }}</span>
			</div>
		</div>
	</div>
</template>
<script setup>
	import PageItem from '@/components/PageItem.vue';
	import IconPayOrangeCard from '@/components/icons/IconPayOrangeCard.vue';
	import IconPayMoney from '@/components/icons/IconPayMoney.vue';
	import IconWallet from '@/components/icons/IconWallet.vue';
	import { computed } from 'vue';

	const props = defineProps(['totalCost', 'membersCount', 'paymentMethod'])
	const priceForOne = computed(() => props.totalCost / props.membersCount)
	const paymentType = computed(() => {
		return props.paymentMethod === 'cash' ? 'Наличные' : 'Онлайн'
	})
</script>
<style lang="scss">
	.event-detail-price__block
	{
		display: flex;
		align-items: end;
	}

	.event-detail-price
	{
		margin-top: 25px;
		font-family: 'Roboto';
	}

	.event-detail-price__row
	{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.event-detail-price__text
	{
		color: #1B1E22;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		letter-spacing: 0.5px;
		margin-left: 12px;
	}

	.event-detail-price__pay
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-left: 37px;
		margin-top: 5px;
	}

	.event-detail-price__info-text
	{
		color: $secondary-text;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;
	}

	.event-detail-price__info-value
	{
		color: $primary;
		text-align: right;
		font-size: 14px;
		font-weight: 500;
		line-height: 18px;
		letter-spacing: 0.25px;
	}

	.event-detail-price__info
	{
		margin-top: 10px;
		margin-left: 37px;
		display: flex;
		justify-content: space-between;
	}

	.event-detail-price__info-value
	{
		display: flex;
		align-items: center;
	}

	.event-detail-price__info-icon
	{
		fill:#FF9F0A;
		margin-right: 4px;
	}
</style>