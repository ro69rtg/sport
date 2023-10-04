<template>
	<div class="auth-otp" ref="otpCont">
		<input
			class="auth-otp__input"
			v-for="(el, ind) in digits"
			:key="el + ind"
			v-model="digits[ind]"
			maxlength="1"
			@keydown="handleKeyDown($event, ind)"
			:class="{ bounce: digits[ind] !== null }"
			ref="codeInputRef"
			type="password" pattern="[0-9]" inputmode="numeric"
			autocomplete="one-time-code"
			@focus="isOpenFunc"
			:style="{ height: otpHeight + 'px'}"
		>
	</div>
</template>

<script setup>
	import { ref, reactive, nextTick , computed ,onMounted ,onUnmounted } from 'vue';

	const codeInputRef = ref(null);
	const otpHeight = ref(20);

	onMounted(() =>
	{
		window.addEventListener("resize", handleWindowSizeChange);
		handleWindowSizeChange();
	});

	onUnmounted(() => window.removeEventListener("resize", handleWindowSizeChange) );

	const handleWindowSizeChange = () => otpHeight.value = codeInputRef.value[0].offsetWidth -2;

	const isOpenFunc = () => emit('isOpen',true);

	onMounted(() => codeInputRef.value[0].focus() );

	const props = defineProps({
		default: String,

		digitCount:
		{
			type: Number,
			required: true
		},
	});

	const digits = reactive([])

	if (props.default && props.default.length === props.digitCount)
	{
		for (let i =0; i < props.digitCount; i++)
		{
			digits[i] = props.default.charAt(i)
		}
	}

	else
	{
		for (let i =0; i < props.digitCount; i++)
		{
			digits[i] = null;
		}
	}

	const otpCont = ref(null)
	const emit = defineEmits();

	const isDigitsFull = function ()
	{
		for (const elem of digits)
		{
			if (elem == null || elem == undefined)
				return false;
		}

		return true;
	}

	const handleKeyDown = function (event, index)
	{
		if (event.key !== "Tab" &&
			event.key !== "ArrowRight" &&
			event.key !== "ArrowLeft"
		)
			event.preventDefault();

		if (event.key === "Backspace")
		{
			digits[index] = null;
			const inputElements = codeInputRef.value;

			if (index != 0)
			{
				(otpCont.value.children)[index-1].focus();
				if(index === 3)
					emit('clear',true);
			}

			else if(index === 0)
			{
				emit('isOpen',false);
				otpCont.value.children[0].focus();
				async function FocusFirstOtp()
				{
					for (let i = 0; i < digits.length; i++)
					{
						digits[i] = null;
					}
					await nextTick();
					codeInputRef.value[3].focus();
				}
				FocusFirstOtp()
			}

			return;
		}

		if ((new RegExp('^([0-9])$')).test(event.key))
		{
			digits[index] = event.key;

			if (index != props.digitCount - 1)
				(otpCont.value.children)[index+1].focus();

			if (isDigitsFull())
				emit('update', digits.join(''));
		}
	}

	async function clearOtp()
	{
		for (let i = 0; i < digits.length; i++)
		{
			digits[i] = null;
		}
		await nextTick();
		codeInputRef.value[3].focus();
	}

	async function lastOtpFocus()
	{
		await nextTick();
		codeInputRef.value[3].focus();
	}

	defineExpose({
		clearOtp,
		lastOtpFocus
	});
</script>

<style lang="scss">
	.auth-otp
	{
		display:flex;
		position: relative;
		margin-right: 55px;
	}

	.auth-otp__icon
	{
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
	}

	.auth-otp__input
	{
		display: flex;
		width: 100%;
		border:none;
		padding: 13.5px 14px 13.5px 16px;
		justify-content: center;
		align-items: center;
		border-radius: 8px;
		background: #fff;
		color:#1B1E22;
		font-size: 22px;
		font-weight: 400;
		line-height: 28px;
		margin-right: 8px;
		outline: none;
		caret-color: #239735;
		text-align: center;
		box-sizing: border-box;
		z-index: 2;
		min-width: 56px;
		height: 56px;
		min-width: 56px;
		min-height: 54px;
		max-width: 70px;
		max-height: 68px;

		&:last-child{ margin-right: 8px; }

		&.error { border: 0.5px solid #FF3B30; }
	}
</style>