<template>
	<div class="auth-end">
		<h1 class="auth-end__title">SportUp</h1>
		<h3 class="auth-end__text">
			Пользуясь этим приложением, вы соглашаетесь с использованием технологий cooke-файлов и со сбором
			и обработкой персональных данных.
		</h3>
		<h3 class="auth-end__text">
			Эти технологии применяются для анализа и улучшения вашего пользовательского опыта.
		</h3>
		<button
			class="auth-end__btn"
			:class="{ 'active': isActive }"
			@click="completeRegister"
		>
			Продолжить
		</button>
	</div>
</template>

<script setup>
	import { ref } from 'vue';

	const isActive = ref(true);
	const emit = defineEmits(['update']);

	const completeRegister = () => emit('update');
</script>

<style lang="scss">
	.auth-end
	{
		display: flex;
		flex-direction: column;
		padding-top: 10px;

		.auth-end__title
		{
			color: #1B1E22;
			font-size: 32px;
			font-weight: 500;
			line-height: 40px;
			margin-bottom: 15px;
		}

		.auth-end__text
		{
			color: #1B1E22;
			font-size: 16px;
			font-weight: 400;
			line-height: 24px;
			letter-spacing: 0.5px;

			&:nth-child(3){ margin-top: 10px; }
		}

		.auth-end__btn
		{
			display: flex;
			width: 83%;
			height: 44px;
			position: absolute;
			padding: 10px 24px;
			justify-content: center;
			align-items: center;
			border-radius: 8px;
			border:none;
			color:#fff;
			text-align: center;
			font-size: 16px;
			font-weight: 500;
			line-height: 24px;
			letter-spacing: 0.5px;
			background: rgba(35, 151, 53, .4);
			cursor: default;
			bottom: 20px;
			left: 0;
			right: 0;
			margin: 0 32px 0 32px;

			&.active
			{
				background: rgba(35, 151, 53, 1);
				cursor: pointer;
			}
		}
	}
</style>