<template>
	<PopUp v-if="showPopup" />
	<div class="pages-rating">
		<div >
			<div class="pages-rating__header">
				<IconBackPage @click="$router.back()" class="pages-rating__header-svg"/>
				<h2 class="pages-rating__header-title">Рейтинг Игроков</h2>
			</div>
			<div class="pages-rating__helper">
				Вы можете поставить оценку одному игроку или всем сразу
			</div>
			<div class="pages-rating__about-raiting">
				Подробнее о системе рейтингов <IconraitingArrow class = "pages-rating__arrow"/>
			</div>
			<div class="pages-rating__box" >
				<List
					:me= "me"
					:users = "users"
					:count = "count"
					@update = " (value) => console.log(value) "
				/>
			</div>
		</div>
		<button class="pages-rating__btn" @click="show">сохранить</button>
	</div>
</template>

<script setup>
	import IconBackPage from '@/components/icons/IconBackPage.vue';
	import IconraitingArrow from '@/components/icons/IconRaitingArrow.vue';
	import PopUp from '@/components/rating/PopUp.vue';
	import List from '@/components/rating/List.vue';

	import { ref } from 'vue';

	const me = ref(
		{
			id: 5,
			name: 'Тест',
			rating: 4.2
		}
	)
	const users = ref([
		{
			id: 1,
			name: 'Петров.К',
			rating: 5
		},
		{
			id: 2,
			name: 'Влад.М',
			rating: 2
		},
		{
			id: 3,
			name: 'Гена.В',
			rating: 3
		},
		{
			id: 4,
			name: 'Леха.В',
			rating: 4
		},
	])

	const showPopup = ref(false)
	function star()
	{
		Math.ceil()

	}
	function show ()
	{
		showPopup.value = true
	}
</script>

<style lang="scss">
	.pages-rating
	{
		font-family: "Roboto";
		color: $primary;
		display: flex;
		flex-direction: column;
		height: 98vh;
		justify-content: space-between;
		padding: 0 12px;
	}

	.pages-rating__header-svg{ margin-right: 24%; }

	.pages-rating__header-title
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

	.pages-rating__helper
	{
		color:$primary;
		font-size: 22px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		margin-bottom: 20px;
	}

	.pages-rating__about-raiting
	{
		color: $button;
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
		letter-spacing: 0.1px;
		margin-bottom: 24px;
	}

	.pages-rating__btn
	{
		background-color: $button;
		border-radius: 8px;
		display: flex;
		padding: 10px 24px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		align-self: stretch;
		color: $white;
		border: none;
	}

	.pages-rating__arrow
	{
		position: relative;
		left: 5px;
		top: 2px;
	}

	.pages-rating__box
	{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: auto;
	}
</style>