<template>
	<div class="event-create-payment">
		<div class="event-create-payment__box">
			<label class="event-create-payment__lable" for="isUsersId">
				<div class="event-create-payment__lable-block">
					<IconUsers class="event-create-payment__lable-icon"/>
					<h3 class="event-create-payment__lable-title">Число участников</h3>
				</div>
				<input type="number"
					id= "isUsersId"
					class="event-create-payment__lable-input"
					@input="$emit('chageParticipants', $event.target.value)"
					@click="calcPrice"
					v-model = "numberParticipants"
					placeholder="0"
					size="1"
					maxlength="2"
				>
			</label>
		</div>
	</div>
	<div class="event-create-payment">
		<div class="event-create-payment__price">
			<label class="event-create-payment__lable" for="priceId">
				<div class="event-create-payment__title-price">
					<IconCreateEventPrice class="event-create-payment__lable-icon"/>
					<h3 class="event-create-payment__lable-title">Общая стоимость</h3>
					<IconCreateEventImportant/>
				</div>
				<div class="event-create-payment__price-input-box">
					<input
						type="tel"
						ref="priceSum"
						id="priceId"
						@click="calcPrice"
						@input="chekedValue($event.target.value, $event.target)"
						v-model = "price"
						class="event-create-payment__price-input"
						placeholder="0"
					>
				</div>
			</label>
		</div>
		<div v-if="price && numberParticipants" class="event-create-payment__calc">
			<div class="event-create-payment__calc-price">
				<IconCreateEventImportant class="event-create-payment__calc-icon"/>
				<p> Стоимость для участника </p>
			</div>
			<p class="event-create-payment__calc-text">{{ peopleSumPer }} ₽</p>
		</div>
		<div class="event-create-payment__line"> </div>
		<div class="event-create-payment__price" for="event-create-payment__choice-payment">
			<div class="event-create-payment__title">
				<h3 class="event-create-payment__choice-text">Способ оплаты</h3>
				<IconCreateEventImportant/>
			</div>
			<div class="event-create-payment__choice-method">
				<input
					id ="event-create-payment__cash"
					name="pament"
					type="radio"
					:disabled="!price"
					class="event-create-payment__input"
					@click = "changeOnline(1)"
				>
				<label for="event-create-payment__cash"
					:class="{'active': paymentMethodProp === 'cash'}"
					class="event-create-payment__choice-item"
				>
					<IconCreateEventCash/>
					На месте
				</label>
				<input
					id ="event-create-payment__online"
					name="pament"
					type="radio"
					:disabled="!price"
					class="event-create-payment__input"
					@click = "changeOnline(0)"
				/>
				<label
				:class="{'active': paymentMethodProp === 'online'}"
				for= "event-create-payment__online"
				class="event-create-payment__choice-item">
					<IconPayMarkCard />
					Онлайн
				</label>
			</div>
		</div>
	</div>
</template>
<script setup>
	import IconCreateEventImportant from	'@/components/icons/IconCreateEventImportant.vue';
	import IconCreateEventPrice from	'@/components/icons/IconCreateEventPrice.vue';
	import IconPayMarkCard from '@/components/icons/IconPayMarkCard.vue';
	import IconCreateEventCash from '@/components/icons/IconCreateEventCash.vue';
	import IconUsers from '@/components/icons/IconUsers.vue';

	import { ref, computed, defineProps, defineEmits, watch } from 'vue';

	const props = defineProps(['title','modelValue', 'user', 'totalCost','paymentMethodProp']);
	const emit = defineEmits(['update' , 'chageParticipants', 'changePrice'])
	const numberParticipants = ref(props.user);
	const price = ref(props.totalCost);
	const paymentMethod = ref(null);
	const priceSum = ref();
	let formatMask = '###'

	const peopleSumPerValue = ref(0);

	const peopleSumPer = computed(() =>
	{
		let priceAsNumber = parseFloat(price.value.replace(/\s/g, ''));
		let participantPrice = priceAsNumber / numberParticipants.value;
		return Math.round(participantPrice).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	} )

	const peoplePrice = peopleSumPer;
	function chekedValue(value, inputElement) {
		const numericValue = parseFloat(value.replace(/\s/g, ''));

		price.value = isNaN(numericValue) ? value : numericValue.toLocaleString('ru');
		inputElement.style.width = `${(price.value.length + 1) * 9}px`;
		emit('changePrice', price.value);
	}

	watch(() => props.user, (value) =>
	{
		numberParticipants.value = props.user;
	})
	watch(() => props.totalCost, (value) =>
	{
		price.value = props.totalCost;
		priceSum.value.style = `width: ${((String(props.totalCost).length + 1) * 9) + 'px'}`
	})
	watch(() => props.paymentMethodProp, (value) =>
	{
		paymentMethod.value = props.paymentMethodProp;
	})


	function changeOnline(arg)
	{
		if (arg)
			paymentMethod.value = "cash";
		else
			paymentMethod.value = "online";

		peopleSumPerValue.value = peopleSumPer.value;
		peopleSumPerValue.value = peopleSumPerValue.value.replace(/[^0-9]/g, "");
		peopleSumPerValue.value = Number(peopleSumPerValue.value);

		emit('update',
		{
			memberCount: numberParticipants.value,
			priceSum: price.value,
			priceForPer: peopleSumPerValue.value,
			paymentMethod: paymentMethod.value
		})
	}
</script>

<style lang="scss">
	.event-create-payment
	{
		position: relative;
		margin-bottom: 13px;
		background: #fff;
		border-radius: 8px;
	}

	.event-create-payment__box
	{
		height: 36px;
		align-items: center;
		display: flex;
		justify-content: space-between;
		outline:none;
		border:none;
		padding: 6px 12px;
	}

	.event-create-payment__lable
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 99%;
	}

	.event-create-payment__lable-block
	{
		display: flex;
		align-items: center;
	}

	.event-create-payment__lable-icon
	{
		margin-right: 12px;
		margin-top: 0px;
		margin-bottom: 1px;
	}

	.event-create-payment__lable-title
	{
		color: #1B1E22;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
	}

	.event-create-payment__users-item
	{
		height: 48px;
		align-items: center;
		display: flex;
		outline:none;
		border:none;
	}

	.event-create-payment__lable-input
	{
		text-align: center;
		font-size: 14px;
		caret-color: #32D74B;
		outline:none;
		border: none;
		background-color: #F2F2F7;
		border-radius: 8px;
		width: 28px;
		height: 22px;
		padding: 2px 14px 2px 12px;

		&::placeholder{	text-align: center;}
	}

	.event-create-payment__lable-input::-webkit-outer-spin-button,
	.event-create-payment__lable-input::-webkit-inner-spin-button
	{ -webkit-appearance: none; }

	.event-create-payment__lable-input[type='number']{ -moz-appearance: textfield; }

	.event-create-payment__price-input
	{
		text-align: center;
		font-size: 14px;
		caret-color: #32D74B;
		outline:none;
		border: none;
		background-color: #F2F2F7;
		border-radius: 8px;
		min-width: 25px;
		width: 25px;
		height: 22px;
		padding: 2px 16px 2px 13px;
		max-width: 75px	;

		&::placeholder
		{
			text-align: center;
			color: #8E8E9A;
		}
	}

	.event-create-payment__price-input::-webkit-outer-spin-button,
	.event-create-payment__price-input::-webkit-inner-spin-button
	{-webkit-appearance: none; }

	.event-create-payment__price-input[type='number']{ -moz-appearance: textfield; }

	.event-create-payment__title
	{
		display: flex;
		align-items: center;
	}

	.event-create-payment__title-price
	{
		font-size: 16px;
		line-height: 24px;
		letter-spacing: 0.5px;
		display: flex;
		width: 64%;
		align-items: center;

		@media (min-width: 375px)
		{
			justify-content: flex-start;
			gap: 3px;
		}
	}

	.event-create-payment__price
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 34px;
		padding: 6px 12px 6px 12px;
	}

	.event-create-payment__calc
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #FF9F0A;
		font-size: 12px;
		font-weight: 400;
		line-height: 14px;
		letter-spacing: 0.1px;
		text-align: center;
		padding: 0 12px;
	}

	.event-create-payment__calc-icon
	{
		margin-right: 4px;

		svg{ margin: 8px; }

		path{ fill:#FF9F0A }
	}

	.event-create-payment__calc-text{ margin-right: 5px; }

	.event-create-payment__price-input-box
	{
		height: auto;
		display: flex;
		align-items: center;
		margin-right: -9px;
	}

	.event-create-payment__price-input-box::after
	{
		position: relative;
		content: '₽';
		right: 18px;
		font-size: 15px;
		color: #8E8E9A;
		font-family: 'Roboto';
	}

	.event-create-payment__calc-price
	{
		display: flex;
		align-items: center;
	}

	.event-create-payment__choice-method
	{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 50%;
	}

	.event-create-payment__choice-item
	{
		display: flex;
		align-items: center;
		background-color: #E5E5ED;
		font-size: 12px;
		font-weight: 400;
		line-height: 14px;
		letter-spacing: 0.1px;
		text-align: center;
		width: 70px;
		height: 17px;
		padding: 3px 5px 3px 4px;
		margin-right: 4px;
		border-radius: 6px;
		gap: 2px;

		&:last-chaild { margin-right: 0; }

		&.active
		{
			background-color: #239735;
			color: #fff;

			path{ fill:#fff }
		}
	}

	.event-create-payment__line
	{
		background-color: #F2F2F7;
		height: 1px;
		width: 95%;
		margin-left: 5%;
	}

	.event-create-payment__choice-item:first-chaild{ width: 63px; }

	.event-create-payment__choice-item:last-child
	{
		padding: 3px 1px 3px 4px;
		width: 67px;
	}

	.event-create-payment__choice-text
	{
		font-size: 14px;
		font-weight: 500;
		line-height: 18px;
		letter-spacing: 0.25px;
		margin-right: 5px;
	}

	.event-create-payment__input { display: none; }

	.event-create-payment__input:checked +.event-create-payment__choice-item
	{
		background-color: #239735;
		color: #fff;

		path{ fill:#fff }
	}

	.event-create-payment__line-item
	{
		position: absolute;
		background-color: #F2F2F7;
		width: calc(100% - 5%);
		height: 1px;
		left: 5%;
		top: 0;
	}
</style>