<template>
	<div class="auth-email">
		<div @click="isOpen = false" class="auth-email__plate"></div>
		<StageHeader :description="'Осталось ввести email '" :title="`Отлично,`" :name="name" />
		<div class="auth-email__block" :class="{'open' : isOpen}">
			<div class="auth-email__block-box">
				<IconInputClear v-if="email.length" @click="clearInput" class="auth-email__icon"/>
				<input
					:class="{ 'error': !isValidEmail }"
					placeholder="Ваш email"
					v-model="email" type="text"
					class="auth-email__input"
					@focus="isOpen = true"
				>
			</div>
			<span v-if="!isValidEmail" class="auth-email__error">Такой email не подойдет</span>
		</div>

		<button
			class="auth-email__btn"
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

	const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
	const isOpen = ref();
	const props = defineProps(['name']);

	const emit = defineEmits(['update'])
	const email = ref('');
	const isActive = ref(false);
	const isValidEmail = ref(true);

	const clearInput = function ()
	{
		email.value = '';
		isValidEmail.value = true;
		isOpen.value = false;
	}

	watch(email, () =>
	{
		if (email.value.length > 0)
			isActive.value = true;

		else
			isActive.value = false;
	});

	const nextStage = function()
	{
		if (isActive.value === true)
		{
			if (emailRegex.test(email.value))
				emit('update', 5, email.value);

			else
				isValidEmail.value = false;
		}
	}
</script>

<style lang="scss">
	.auth-email
	{
		display: flex;
		flex-direction: column;
		height: 100%;
		padding-top: 40px;
	}

	.auth-email__plate
	{
		position: fixed;
		width: 100%;
		height:100%;
		z-index: 1;
		top: 0;
		left: 0;
	}

	.stage-header__title
	{
		&:nth-child(3) { margin-top: -8px; }
	}

	.auth-email__block
	{
		margin-top: 40px;
		position: relative;
		width: 96%;
		flex: 1 0 auto;

		&.open { flex: 0 0 auto; }
	}

	.auth-email__input
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
		z-index:2;
		position: relative;

		&:placeholder
		{
			color:#8E8E93;
			font-size: 22px;
			font-weight: 400;
		}

		&.error { border: 0.5px solid #FF3B30; }
	}

	.auth-email__btn
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

		&.open { bottom:85px; }

		&.active
		{
			background: rgba(35, 151, 53, 1);
			cursor: pointer;
			z-index: 2;
		}
	}

	.auth-email__error
	{
		color: #FF3B30;
		font-size: 16px;
		font-weight: 400;
		line-height: 24px;
		letter-spacing: 0.5px;
		display:block;
		position: absolute;
		top: 105px;
	}
	.auth-email__icon
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

	.auth-email__block-box { position: relative; }
</style>