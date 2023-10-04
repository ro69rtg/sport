<template>
	<div class="events-null">
		<div class="events-null__block">
			<h3 class="events-null__block-title">{{ moment(props.selectedDate,'D.MM.YYYY').format('dddd') }}</h3>
			<h3 class="events-null__block-text">{{ moment(props.selectedDate,'D.MM.YYYY').format('D MMM YYYY') }}</h3>
		</div>
		<IconField />
		<h3 class="events-null__title">Здесь пока ничего нет!</h3>
		<span class="events-null__text">Найти или создать игру</span>
		<button class="events-null__btn">
			<IconNullButton class="events-null__btn-icon"/>
			<span class="events-null__btn-text">Создать игру</span>
		</button>
	</div>
</template>

<script setup>
	import IconField from '@/components/icons/IconField.vue';
	import IconNullButton from '@/components/icons/IconNullButton.vue';
	import moment from 'moment';
	import "moment/dist/locale/ru"
	moment.locale("ru");

	const props = defineProps(['selectedDate']);
</script>

<style lang="scss">
	.events-null
	{
		width: 100%;
		align-items: center;
		text-align: center;
	}

	.events-null__block
	{
		display: flex;
		margin-bottom: 160px;
		padding-left: 3px;
		gap: 0 5px;
		align-items: center;
	}

	.events-null__block-title
	{
		color: #1B1E22;
		font-size: 22px;
		font-weight: 500;
		margin: 0;
		text-transform: capitalize;
	}

	.events-null__block-text
	{
		color: #8E8E9A;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
		margin: 0;
		position: relative;
		top: 2px;
		left: -1px;
		margin: 0;
	}

	.events-null__title
	{
		color: var(--primary-text, #1B1E22);
		text-align: center;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
		margin: 35px 0 3px 0;
	}

	.events-null__text
	{
		color: #8E8E9A;
		font-size: 14px;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;
		margin-bottom: 32px;
		display: block;
	}

	.events-null__btn
	{
		display: flex;
		padding: 10px 24px 10px 16px;
		justify-content: center;
		align-items: center;
		border-radius: 8px;
		background: #239735;
		border: none;
		margin: 0 auto;
	}

	.events-null__btn-icon { margin-right: 8px; }

	.events-null__btn-text
	{
		color: #fff;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
	}
</style>