<template>
	<div class="auth-name">
		<div @click="isOpen = false" class="auth-name__plate"></div>
		<StageHeader :description="'Как вас зовут?'" :title="'Давайте познаĸомимся!'" />
		<div class="auth-name__block" :class="{'open' : isOpen}">
			<div class="auth-name__block-box">
				<IconInputClear v-if="name.length" @click="clearInput" class="auth-name__icon"/>
				<input
					placeholder="Ваше имя"
					v-model="name"
					type="text"
					class="auth-name__input"
					@focus="isOpen = true"
				>
			</div>
		</div>
		<button
			class="auth-name__btn"
			:class="{ 'active': isActive ,'open' : isOpen}"
			@click="nextStage"
		>
			Продолжить
		</button>
	</div>
</template>

<script setup>
	import StageHeader from '@/components/auth/StageHeader.vue';
	import { ref, watch } from 'vue';
	import IconInputClear from '@/components/icons/IconInputClear.vue';

	const emit = defineEmits();

	const isOpen = ref();
	const name = ref('');
	const email = ref('');
	const isActive = ref(false);

	const clearInput = function ()
	{
		name.value = '';
		isOpen.value = false;
	}

	watch(name, () =>
	{
		if (name.value.length > 0)
			isActive.value = true;

		else
			isActive.value = false;
	});

	const nextStage = function()
	{
		if (isActive.value === true)
			emit('update', 4, name.value);
	}
</script>

<style lang="scss">
	.auth-name
	{
		display: flex;
		flex-direction: column;
		height: 100%;
		padding-top: 40px;
	}

	.auth-name__plate
	{
		position: fixed;
		width: 100%;
		height:100%;
		z-index: 1;
		top: 0;
		left: 0;
	}

	.auth-name__block
	{
		margin-top: 40px;
		position: relative;
		width: 96%;
		flex: 1 0 auto;

		&.open { flex: 0 0 auto; }

		@media(min-width: 375px){ width: 100%; }
	}

	.auth-name__input
	{
		display: flex;
		border-radius: 10px;
		padding: 6px 16px;
		align-items: center;
		width: 100%;
		height: 56px;
		border: none;
		outline: none;
		caret-color: #32d74b;
		color: #1C1C1E;
		font-size: 22px;
		font-weight: 400;
		margin-bottom: 120px;
		box-sizing: border-box;
		position: relative;
		z-index:2;

		&:placeholder
		{
			color:#8E8E93;
			font-size: 22px;
			font-weight: 400;
		}

		&.error { border: 0.5px solid #FF3B30; }
	}

	.auth-name__btn
	{
		display: flex;
		width: 96%;
		height: 44px;
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
		left: 0;
		right: 0;
		position: relative;
		bottom: 32px;
		flex: 0 0 auto;

		@media(min-width: 375px){ width: 100%; }

		&.open { bottom:85px; }

		&.active
		{
			background: rgba(35, 151, 53, 1);
			cursor: pointer;
			z-index: 2;
		}
	}

	.auth-name__error
	{
		color: #FF3B30;
		font-size: 16px;
		font-weight: 400;
		line-height: 24px;
		letter-spacing: 0.5px;
		display:block;
		margin-bottom: 48px;
	}

	.auth-name__icon
	{
		position: absolute;
		right: 16px;
		top: auto;
		bottom: auto;
		top: 50%;
		transform: translate(0, -50%);
		cursor: pointer;
		z-index: 3;
	}

	.auth-name__block-box { position: relative; }
</style>