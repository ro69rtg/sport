<template>
	<div class="payment-page__pop-up">
		<div class="payment-page__pop-up-cont">
			<div class="payment-page__pop-up-block">
				<IconPayPopUpPlus class="payment-page__pop-up-icon"/>
			</div>
			<div class="payment-page__pop-up-block">
				<h3 class="payment-page__h3">Карта привязана!</h3>
			</div>
			<div class="payment-page__pop-up-block">
				<button class="payment-event__card-btn">
					<IconPayMirCard class="payment-page__card-btn-icon"/>
					<span class="payment-event__card-btn-text">Мир *</span>
					<span class="payment-event__card-btn-text">8869</span>
				</button>
			</div>
			<div class="payment-page__pop-up-block">
				<button class="payment-page__pop-up-next">
					<span @click="router.push(`/profile/1`)" class="payment-page__pop-up-next-text">Продолжить</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import IconPayPopUpPlus from '@/components/icons/IconPayPopUpPlus.vue';
	import IconPayMirCard from '@/components/icons/IconPayMirCard.vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();
</script>

<style lang="scss">
	.payment-page__pop-up
	{
		font-family: "Roboto";
		position: fixed;
		height: 100%;
		width:100%;
		background-color:$darkText ;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
		left: 0;
		padding-top: 0;

		.payment-page__pop-up-block
		{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.payment-page__pop-up-cont
		{
			width: calc(100% - 64px);
			background: $white;
			display: flex;
			flex-wrap:wrap;
			width: 83%;
			justify-content: center;
			align-items: center;
			border-radius: 16px;
			padding-top: 48px;
		}

		.payment-page__pop-up-icon
		{
			min-height: 72.5px;
			margin-bottom: 34px;
		}

		.payment-page__h3
		{
			margin: 0;
			margin-bottom: 20px;
		}

		.payment-page__pop-up-next
		{
			border-radius: 8px;
			background: #E5E5ED;
			padding: 10px 24px;
			border: none;
			margin: 12px 0 32px 0;
		}

		.payment-page__pop-up-next
		{
			color: #1B1E22;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: 24px;
			letter-spacing: 0.5px;
		}

		.payment-event__card-btn{ background: #F2F2F7; }
	}
</style>