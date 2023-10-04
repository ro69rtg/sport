<template>
	<div class="payment__pop-up-error-wrapper">
		<div class="payment__pop-up-error">
			<div class="payment__pop-up-error-block">
				<IconPayErrorCard class="payment__pop-up-error-icon"/>
			</div>
			<div class="payment__pop-up-error-block">
				<h3 class="payment-pop-up-error-title">Что-то пошло не так!</h3>
			</div>
			<div class="payment__pop-up-error-block">
				<p class="payment__pop-up-error-text">Проверьте попытку позже.</p>
			</div>
			<div class="payment__pop-up-error-block">
				<button @click="close()" class="payment__pop-up-error-btn">
					<span>Отмена</span>
				</button>
				<button
					@click="close()"
					class="payment__pop-up-error-btn active">
					<span>Повторить</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import IconPayErrorCard from '@/components/icons/IconPayErrorCard.vue';

	const emit = defineEmits(['close']);

	function close ()
	{
		emit('close');
	}
</script>

<style lang="scss">
	.payment__pop-up-error-wrapper
	{
		position:fixed;
		display:flex;
		align-items:center;
		justify-content:center;
		top:0px;
		left:0px;
		width:100vw;
		height:100vh;
	}

	.payment__pop-up-error
	{
		background: #fff;
		display: flex;
		flex-wrap: wrap;
		// width: 83%;
		width: 311px;
		justify-content: center;
		align-items: center;
		border-radius: 16px;
		padding: 48px 0 32px 0;
		margin: 0 auto;
	}

	.payment__pop-up-error-icon
	{
		margin-bottom: 60px;
		position: relative;
		left: 6px;
		top: 14px;
	}

	.payment-pop-up-error-title
	{
		color: #1B1E22;
		font-size: 22px;
		font-weight: 500;
		margin: 0;
		margin-bottom: 20px;
	}

	.payment__pop-up-error-text
	{
		color: #8E8E9A;
		font-size: 14px;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;
		margin: 0;
		margin-bottom: 32px;
	}

	.payment__pop-up-error-block
	{
		width: 100%;
		display: flex;
		justify-content: center;
		&:last-child { gap: 10px; }
	}

	.payment__pop-up-error-btn
	{
		display: flex;
		padding: 10px 24px;
		width: 42%;
		justify-content: center;
		align-items: center;
		border-radius: 8px;
		background: #E5E5ED;
		border: none;

		span
		{
			color: #1B1E22;
			font-size: 16px;
			font-weight: 400;
			line-height: 24px;
			letter-spacing: 0.5px;
		}
		&.active
		{
			background: #239735;
			& span
			{
				color:#fff;
			}
		}
	}
</style>