<template>
	<div class="payment-page">
	<PaymentPagePopup v-if="showPopupFalse">
		<IconPayErrorCard/>
		<h3 class="payment-page__h3">Что-то пошло не так!</h3>
		<p class="payment-page__pop-up-text">Проверьте попытку позже.</p>
		<div class="payment-page__pop-up-btn-box">
			<button >Отмена</button>
			<button @click = "show"
			class="payment-page__btn--activ">Повторить</button>
		</div>
	</PaymentPagePopup>
	<PaymentPagePopup v-if="showPopupColl">
		<IconPayPopUpPlus/>
		<h3 class="payment-page__h3">Карта привязана!</h3>
		<button class="payment-event__card-btn">
			<IconPayMirCard class="payment-page__card-btn-icon"/>
			<span class="payment-event__card-btn-text">Мир *</span>
			<span class="payment-event__card-btn-text">8869</span>
		</button>
		<button class="payment-page__pop-up-btn">Продолжить</button>
	</PaymentPagePopup>
		<div class="payment-page__header-box">
			<div class="payment-page__header">
				<IconBackPage class="payment-page__header-svg" @click="router.back"/>
				<h2 class="payment-page__title">Привязать карту</h2>
			</div>
			<div class="payment-page__helper">
				<h3 class="payment-page__helper-title">Чтобы оплатить участие,</h3>
				<h3 class="payment-page__helper-title">привяжите карту.</h3>
			</div>
			<p class="payment-page__info">Мы спишем с нее 1 рубль. После чего, вы сможете оплачивать участия в играх всего в несколько кликов.</p>
		</div>
		<div class="payment-page__input-box">
			<PaymentPageInput
				ref = "elementCard"
				@keydown="chekedValue(19 , $event.target.value.length, $event.target)"
				v-model.trim="numberCard"
				:title = "nuberCardPlace"
			/>
			<div class="payment-page__smal-input">
				<PaymentPageInputSmal
					ref = "elementDate"
					@keydown="chekedValue(7 , $event.target.value.length, $event.target)"
					v-model.trim="date"
					:title = "monthYaerPlace" :mask = "monthYearMask"
				/>
				<PaymentPageInputSmal
					ref = 'elementCVV'
					@keydown="chekedValue(3 , $event.target.value.length, $event.target)"
					v-model.trim="CVV"
					:title = "cvvPlace"
					:mask = "cvvMasck"
				/>
			</div>
		</div>
		<div class="payment-page__info-box">
			<div class="payment-page__info-block">
				<IconExclamation class="payment-page__info-icon" />
			</div>
			<div class="payment-page__block">
				<p class="payment-page__info-text">
					Мы не храним данные ваших карт.
				</p>
				<p class="payment-page__info-text">
					Платежи обрабатываются банком «Тинькофф»
				</p>
			</div>
		</div>
		<button ref ='elemBtn' class="payment-page__btn" @click = "show">Привязать</button>
	</div>

</template>

<script setup >
	import PaymentPageInput from '@/components/paymentPage/PaymentPageInput.vue';
	import PaymentPageInputSmal from '@/components/paymentPage/PaymentPageInputSmal.vue';
	import PaymentPagePopup from '@/components/paymentPage/PaymentPagePopup.vue';
	import IconPayMirCard from '@/components/icons/IconPayMirCard.vue';

	import IconPayPopUpPlus from '@/components/icons/IconPayPopUpPlus.vue';
	import IconExclamation from '@/components/icons/IconExclamation.vue';
	import IconBackPage from '@/components/icons/IconBackPage.vue';
	import IconPayErrorCard from '@/components/icons/IconPayErrorCard.vue';
	import { useRouter } from 'vue-router'
	import {ref} from 'vue';

	const router = useRouter();

	const numberCard =ref(null);
	const date = ref(null);
	const CVV = ref(null)
	const elementCard = ref()
	const nuberCardPlace = '0000 0000 0000 0000 ';
	const elementDate = ref(null)
	const monthYaerPlace = 'мм / гг';
	const elementCVV = ref(null)
	const monthYearMask = '## / ##'
	const cvvPlace = 'cvv';
	const cvvMasck = '###'
	const elemBtn = ref(null)
	const showPopupColl = ref(false)
	const showPopupFalse = ref(false)
	function chekedValue(arg , e , target)
	{

		if(elementCard.value.input === target)
		{
			if(arg === e && event.key !== "Backspace")
				elementDate.value.input.focus()
		}

		if(elementDate.value.input === target)
		{
			if(arg === e && event.key !== "Backspace")
				elementCVV.value.input.focus()
		}
		if(elementDate.value.input === target && event.key === "Backspace" && e === 0)
		{
			elementCard.value.input.focus()
		}

		if (elementCVV.value.input === target)
		{
			if(arg === e  && event.key !== "Backspace")
				elemBtn.value.focus()

		}
		if(elementCVV.value.input === target && event.key === "Backspace" && e === 0)
			elementDate.value.input.focus()
	}


	function show()
	{
		showPopupColl.value = !showPopupColl.value;
	}
</script>

<style lang="scss">
	.payment-page
	{
		color: $primary;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		max-width: 1440px;
		width: calc(100% - 24px);
		margin: 0 auto;
		.payment-page__header-box
		{
			margin-bottom: 25px;
		}
		.payment-page__header
		{
			.payment-page__header-svg{ margin-right: 29%; }
			.payment-page__title
			{
				color:$primary;
				text-align: center;
				display: inline-block;
				font-size: 16px;
				font-style: normal;
				font-weight: 500;
				line-height: 24px;
				letter-spacing: 0.5px;
			}
		}

		.payment-page__helper
		{
			margin-bottom: 10px;

			h3
			{
				color:$primary;
				font-size: 22px;
				font-weight: 500;
				line-height: normal;
				margin: 0;
				padding: 0;
				letter-spacing: 0.1px;

				&:nth-child(2){ letter-spacing: 0px; }
			}
		}

		.payment-page__info
		{
			overflow: hidden;
			color:$secondary-text;
			text-overflow: ellipsis;
			font-size: 14px;
			line-height: 18px;
			letter-spacing: 0.25px;
		}
		.payment-page__smal-input
		{
			display: flex;
			justify-content: space-between;
			position: relative;
		}
		.payment-page__btn-box
		{
			display: flex;
		}

		.payment-page__info-box
		{
			display: flex;
			align-items: center;
			width: calc(100% - 17px);
			background-color: $white;
			padding: 14px 5px 12px 12px;
			border-radius: 8px;
			margin-bottom: 20px;

			&:nth-child(3)
			{
				margin-bottom: 12px;
				padding: 14px 5px 11px 12px;
			}
		}

		.payment-page__block
		{
			display: flex;
			flex-wrap: wrap;
			position: relative;
			top: -1px;
		}

		.payment-page__info-text
		{
			color:$secondary-text;
			font-size: 12px;
			font-style: normal;
			font-weight: 400;
			word-break: break-word;
			letter-spacing: 0.1px;
			margin: 0;
			&:nth-child(2){ letter-spacing: 0; }
		}
		.payment-page__btn
		{
			background-color: $button;
			border-radius: 8px;
			padding: 10px 24px;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 8px;
			align-self: stretch;
			color: $white;
			border: none;
			font-size: 16px;
			font-weight: 500;
			line-height: 24px;
			letter-spacing: 0.5px;
		}
		.payment-page__info-icon
		{
			font-size: 32px;
			width: 27px;
			height: 27px;
			margin-right: 9px;
		}
		.payment-page__pop-up-text
		{
			color: $secondary-text;
			text-align: center;
			font-size: 14px;
			line-height: 18px;
			letter-spacing: 0.25px;
		}
		.payment-page__pop-up-btn-box
		{
			display: flex;
		}
		.payment-page__h3
		{
			color: $whiteText;
			text-align: center;
			font-size: 22px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
		}
		.payment-page__pop-up-btn
		{
			display: flex;
			height: 44px;
			padding: 9px 24px;
			justify-content: center;
			align-items: center;
			gap: 8px;
			border: none;
			border-radius: 8px;
			background-color: $minor;
			align-self: center;
		}
		.payment-page__card-btn
		{
			display: flex;
			padding: 8px 8px;
			justify-content: center;
			align-items: center;
			gap: 8px;
			border: none;
			border-radius: 8px;
			background-color: $darkText;
			align-self: center;
			font-size: 14px;
		}

		.payment-page__pop-up-btn-box
		{
			display: flex;
			justify-content: space-around;
			width: 100%;
			button
			{
				display: flex;
				height: 44px;
				padding: 10px 24px;
				justify-content: center;
				align-items: center;
				gap: 8px;
				border: none;
				border-radius: 8px;
				background-color: $minor;
				align-self: center;
				width: 145px;
				font-size: 16px;
				font-style: normal;
				font-weight: 500;
					&:hover,
					&:focus,
					&:active{border: none;}
			}
			.payment-page__btn--activ
			{
				color: $white;
				background-color:$button ;
			}
		}

	}
</style>