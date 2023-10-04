<template>
	<div class="user-payment">
		<div class="user-payment__row">
			<IconWallet />
			<span class="user-payment__label">
				Оплата
			</span>
		</div>
		<CreditCard />
		<CreditCard />
		<div class="user-payment__info">
			<IconExclamation class="user-payment__info-icon"/>
			<span class="user-payment__info-text">
				Мы не храним данные ваших карт.
				Платежи обрабатываются банком «Тинькофф»
				участника
			</span>
		</div>
		<button class="user-payment__link-button" @click="router.push('/payment')">
			<IconProfilePlus />
			<span class="user-payment__link-button-text">Привязать карту</span>
		</button>
	</div>
</template>

<script setup>
	import IconWallet from '@/components/icons/IconWallet.vue'
	import IconExclamation from '@/components/icons/IconExclamation.vue'
	import IconProfilePlus from '@/components/icons/IconProfilePlus.vue'
	import CreditCard from '@/components/user/CreditCard.vue'
	import { useRouter } from 'vue-router';

	const router = useRouter();
</script>

<style lang="scss">
	.user-payment__label
	{
		font-family: 'Roboto';
		font-weight: 500;
		font-size: 16px;
		color: $primary-text;
		margin-left: 15px;
	}

	.user-payment__link-button
	{
		border-radius: 8px;
		width: 100%;
		border: 1px dashed $secondary-text;
		display: flex;
		padding: 10px 24px 10px 12px;
		align-items: center;
		margin-top: 25px;
		justify-content: center;
	}

	.user-payment__link-button-text { margin-left: 8px; }

	.user-payment__info
	{
		display: flex;
		align-items: center;
		margin: 20px 0;
	}

	.user-payment__info-icon { flex: 0 0 auto; }

	.user-payment__info-text
	{
		font-size: 12px;
		color: $secondary-text;
		font-family: 'Roboto';
		font-weight: 400;
		margin-left: 15px;
	}

	.user-payment__row
	{
		display: flex;
		align-items: center;
	}
</style>