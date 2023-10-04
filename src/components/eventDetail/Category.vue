<template>
	<div class="event-detail-category">
		<div class="event-detail-category__box">
			<IconCategories />
			<span class="event-detail-category__title">Категория</span>
		</div>
		<div v-if="!category.icon" class="event-detail-category__block">
			<span class="event-detail-category__block-text">Не выбрана</span>
			<IconChoiceArrow class="event-detail-category__block-icon" />
		</div>
		<div v-if="category.icon" class="event-detail-category__value">
			<div class="event-detail-category__value-icon" v-html="category.icon"></div>
			<span class="event-detail-category__name">{{ category.name }}</span>
		</div>
	</div>
</template>

<script setup>
	import LabelItem from '@/components/eventDetail/Label.vue';
	import IconChoiceArrow from '@/components/icons/IconChoiceArrow.vue';
	import IconCategories from '@/components/icons/IconCategories.vue';

	const props = defineProps(['category']);
</script>

<style lang="scss">
	.event-detail-category
	{
		margin-top: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: 'Roboto';
	}

	.event-detail-category__value
	{
		display: flex;
		align-items: center;
		line-height: 0px;
	}

	.event-detail-category__value-icon
	{
		& svg
		{
			max-width: 16px;
			max-height: 16px;
			min-width: 16px;
			min-height: 16px;
		}

		path { fill: #239735; }
	}

	.event-detail-category__name
	{
		color: $button;
		margin-left: 5px;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 18px; /* 128.571% */
		letter-spacing: 0.25px;
	}

	.event-detail-category__block
	{
		display: flex;
		align-items: center;
		margin-left: auto;
	}

	.event-detail-category__block-text
	{
		color: #8E8E9A;
		font-size: 14px;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;
	}

	.event-detail-category__block-icon { margin-left: 4px; }

	.event-detail-category__box
	{
		display: flex;
		align-items: end;
	}

	.event-detail-category__title
	{
		color:  #1B1E22;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
		margin-left: 12px;
	}
</style>