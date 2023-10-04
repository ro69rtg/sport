<template>
	<div class="user-credit-card">
		<div>
			<IconPayMirCard class="user-credit-card__img" />
		</div>
		<div class="user-credit-card__info">
			Мир *8869
		</div>
		<button class="user-credit-card__delete">
			Удалить
		</button>
	</div>
</template>

<script setup>
	import IconPayMirCard from '@/components/icons/IconPayMirCard.vue'
</script>

<style lang="scss">
	.user-credit-card
	{
		display: flex;
		align-items: center;
		margin-top: 20px;
	}

	.user-credit-card__img
	{
		width: 30px;
		height: 24px;
		object-fit: cover;
		margin-left: -5px;
	}

	.user-credit-card__info
	{
		margin: 0 15px;
		font-size: 14px;
		font-weight: 400;
		font-family: 'Roboto';
		color: $primary-text;
	}

	.user-credit-card__delete
	{
		padding: 3px 5px;
		color: $primary-text;
		font-size: 12px;
		font-weight: 400;
		border-radius: 6px;
		background: $minor;
		border: none;
	}
</style>