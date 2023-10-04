<template>
	<div class="pages-payment-event">
		<div class="pages-payment-event__main">
			<div class="pages-payment-event__header-box">
				<IconPaymentEventCloser @click="close()" class="pages-payment-event__header-icon"/>
			</div>
			<div v-if="!isDone && !isError" class="pages-payment-event__box">
				<h2 class="pages-payment-event__title"> {{name}}</h2>
				<div class="pages-payment-event__timer-box">
					<button class="pages-payment-event__timer-btn">{{fullDate}}</button>
					<button class="pages-payment-event__timer-btn">{{date}}</button>
				</div>
				<div class="pages-payment-event__payment-box">
					<div class="pages-payment-event__block">
						<h3 class="pages-payment-event__price">{{ testPrice }}</h3>
						<h3 class="pages-payment-event__price">₽</h3>
					</div>
				<button class="pages-payment-event__card-btn">
					<IconPaymentDefiniteCard class="payment-page__card-btn-icon"/>
					<span class="pages-payment-event__card-btn-text">Мир *</span>
					<span class="pages-payment-event__card-btn-text">8869</span>
				</button>
				</div>
				<div class="pages-payment-event__info-box">
					<div class="pages-payment-event__info-block">
						<IconExclamation class="pages-payment-event__info-icon" />
					</div>

					<div class="pages-payment-event__info-box-text">
						<div class="pages-payment-event__info-text">
							Когда наберется нужное количество участников сумма спишется с вашей карты и будет отправлена организатору события.
						</div>
						<div class="pages-payment-event__info-link-box">Оплачивая участие вы соглашаетесь с
							<a href="#">правилами сервиса</a>
						</div>
					</div>
				</div>
				<button class="pages-payment-event__btn" @click="show">
					<span class="pages-payment-event__btn-text">
						Оплатить
					</span>
				</button>
			</div>
				<div v-if="isDone" class="pages-payment-event__box-other" >
					<IconRatingCool class="pages-payment-event__icon-other"/>
					<h3 class="pages-payment-event__h3-other">Оплачено!</h3>
					<p class="pages-payment-event__text-other">Футбол Лужники под мостом.</p>
					<div class="pages-payment-event__block">
						<h3 class="pages-payment-event__price">1 500</h3>
						<h3 class="pages-payment-event__price">₽</h3>
					</div>
					<button class="pages-payment-event__card-btn">
						<IconPaymentDefiniteCard class="payment-page__card-btn-icon"/>
						<span class="pages-payment-event__card-btn-text">Мир *</span>
						<span class="pages-payment-event__card-btn-text">8869</span>
					</button>
				</div>
			</div>
			<div class="pages-payment-event__footer">
				<div v-if="isDone" class="pages-payment-event__other-btn-box">
					<button class="pages-payment-event__other-btn" @click="show">
						<span class="pages-payment-event__other-btn-text">Закрыть</span>
					</button>
				</div>
			</div>

			<PaymentPopUpError @close="close" v-if="isError"/>
	</div>
</template>

<script setup>
	import IconPayEventCloser from '@/components/icons/IconPayEventCloser.vue';
	import IconPayMirCard from '@/components/icons/IconPayMirCard.vue';
	import IconRatingCool from '@/components/icons/IconRatingCool.vue';
	import IconExclamation from '@/components/icons/IconExclamation.vue';
	import {ref} from 'vue';
	import PopUpError from '@/components/payment/PopUpError.vue';

	const testPrice = ref("1 400");
	const isDone = ref(true);
	const isError = ref(false);
	const name = ref('Футбол Лужники под мостом');
	const fullDate = ref('21 июл 2023')
	const date = ref('09 : 00');

	function show ()
	{
		if(testPrice.value > 1500)
			isDone.value = true;
		else
		{
			isDone.value = false;
			isError.value = !isError.value;
		}
	}

	function close ()
	{
		isDone.value = false;
		isError.value = false;
	}
</script>

<style lang="scss" >
	.pages-payment-event
	{
		font-family: "Roboto";
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		height: 100vh;

		.pages-payment-event__content{ flex: 1 0 auto; }

		.pages-payment-event__footer
		{
			flex: 0 0 auto;
			position: relative;
			bottom: 13px;
		}

		.pages-payment-event__header-box
		{
			position: relative;
			display: flex;
			flex-direction: row-reverse;
			z-index: 2;
		}

		.header-line
		{
			position: absolute;
			width: 100%;
			height: 2px;
			background-color: black;
			top: 10px;
			color: $whiteText;
		}

		.pages-payment-event__title
		{
			text-align: center;
			font-size: 32px;
			font-weight: 500;
			line-height: 40px;
			margin-bottom: 12px;
			margin-top: 16px;
		}

		.pages-payment-event__box
		{
			height: calc(100vh - 67px);
			color: $primary;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			max-width: 1440px;
			width: calc(100% - 40px);
			margin: 0 auto;
		}

		.pages-payment-event__timer-box
		{
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 32px;
		}

		.pages-payment-event__timer-btn
		{
			display: flex;
			padding: 4px 8px;
			justify-content: center;
			align-items: center;
			gap: 8px;
			border: none;
			border-radius: 8px;
			background-color: $white;
			align-self: center;
			font-size: 14px;
			margin-left: 6px;
			font-size: 14px;
			font-weight: 400;
			line-height: 18px;
			letter-spacing: 0.25px;
			&:first-child{margin-left: 0;}
		}

		.pages-payment-event__payment-box
		{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}

		.pages-payment-event__block
		{
			display: flex;
			margin-bottom: 32px;
			gap: 16px;
			.pages-payment-event__price
			{
				&:nth-child(2)
				{
					font-weight: 300;
					position: relative;
					left: -4px;
				}
				margin: 0;
			}
		}

		.pages-payment-event__price
		{
			color:  #239735;
			text-align: center;
			font-size: 52px;
			font-weight: 700;
			line-height: 40px;
			margin-bottom: 30px;
			margin-top: 0;
		}

		.pages-payment-event__info-box
		{
			display: flex;
			background-color: $white;
			padding: 12px 10px;
			border-radius: 8px;
			margin-bottom: 31px;
		}

		.pages-payment-event__info-text
		{
			color: $secondary-text;
			font-size: 12px;
			line-height: 14px;
			letter-spacing: 0.1px;
			margin-bottom: 10px;
			max-width: 92%;
		}

		.pages-payment-event__info-link-box
		{
			color:$secondary-text;
			font-size: 12px;
			font-style: normal;
			font-weight: 400;
			line-height: 120%;
			letter-spacing: 0.1px;

			a
			{
				font-size: 12px;
				font-style: normal;
				font-weight: 400;
				line-height: 120%;
				letter-spacing: 0.1px;
				text-decoration-line: underline;
				color:  #239735;
				&:visited{color:  #239735;}
			}
		}

		.pages-payment-event__btn
		{
			background-color: $button;
			border-radius: 8px;
			padding: 10px 24px;
			justify-content: center;
			align-items: center;
			gap: 8px;
			align-self: stretch;
			color: $white;
			border: none;
		}

		.pages-payment-event__h3-other
		{
			font-size: 28px;
			font-weight: 500;
			line-height: 36px;
			margin: 0;
			margin-bottom: 3px;
		}

		.pages-payment-event__btn-text
		{
			font-size: 16px;
			font-weight: 500;
			line-height: 24px;
			letter-spacing: 0.5px;
		}

		.pages-payment-event__info-icon
		{
			margin-right: 8px;
			font-size: 26px;
			height: 29px;
			width: 32px;
			position: relative;
			top: 1px;
		}

		.pages-payment-event__box-other
		{
			height: calc(100vh - 100px);
			color: $primary;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			max-width: 1440px;
			width: calc(100% - 64px);
			margin: 0 auto;
			padding-top: 25px;

			& .pages-payment-event__block
			{
				left: 2px;
				position: relative;
				margin-bottom: 30px;
			}

			.pages-payment-event__card-btn-text
			{
				top: 1px;
				&:nth-child(2) { margin-left: 34px; }
			}
		}

		.pages-payment-event__h3-orher
		{
			color: $darkText;
			text-align: center;
			font-size: 28px;
			font-style: normal;
			font-weight: 500;
			line-height: 36px;
			margin: 0;
		}

		.pages-payment-event__text-other
		{
			margin: 0;
			color:$secondary-text;
			text-align: center;
			font-size: 14px;
			font-weight: 400;
			line-height: 18px;
			letter-spacing: 0.25px;
			margin-bottom: 33px;
		}

		.pages-payment-event__icon-other
		{
			margin-bottom: 38px;
			min-width: 61px;
			min-height: 63px;
		}

		.pages-payment-event__other-btn-box
		{
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.pages-payment-event__other-btn
		{
			border: none;
			border-radius: 8px;
			background-color: $minor;
			display: flex;
			padding: 10px 24px;
			justify-content: center;
			align-items: center;
		}

		.pages-payment-event__other-btn-text
		{
			color: #1B1E22;
			font-size: 16px;
			font-weight: 400;
			line-height: 24px;
			letter-spacing: 0.5px;
		}
	}

	.pages-payment-event__card-btn
	{
		display: flex;
		padding: 9px;
		align-items: center;
		border: none;
		border-radius: 8px;
		background-color: $white;
		font-size: 14px;
		margin-bottom: 20px;
		position: relative;
		left: -2px;
	}

	.pages-payment-event__card-btn-text
	{
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		letter-spacing: 0.25px;
		position: relative;
		top: 1px;
		&:nth-child(2)
		{
			margin-left: 31px;
		}
	}

	.payment-page__card-btn-icon
	{
		min-width: 24px;
		height: 28px;
		position: absolute;
		left: 3px;
		top: 4px;
	}
</style>