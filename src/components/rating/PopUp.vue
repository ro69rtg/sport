<template>
	<div class="rating__pop-up"  >
		<div class="rating__pop-up-cont">
			<IconRatingCool/>
			<h3 class="rating__h3">Оценки выставлены успешно!</h3>
			<button class="rating__pop-up-btn">Продолжить</button>
		</div>
	</div>
</template>

<script setup>
	import IconRatingCool from '@/components/icons/IconRatingCool.vue';
</script>

<style lang="scss">
	.rating__pop-up
	{
		position: fixed;
		height: 100%;
		width:100%;
		background:$darkText ;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}
	.rating__pop-up-cont
	{
		width: calc(100% - 64px);
		background: $white;
		display: flex;
		width: 311px;
		padding: 48px 20px 32px 20px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 32px;
		border-radius: 16px;
	}
	.rating__h3
	{
		color: $whiteText;
		text-align: center;
		font-size: 22px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
	}
	.rating__pop-up-btn
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
	}
</style>