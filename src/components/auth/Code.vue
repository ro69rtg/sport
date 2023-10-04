<template>
	<div class="auth-code">
		<StageHeader :description="'Код отправлен на номер'" :title="'Введите код'" />
		<div class="auth-code__block">
			<span class="auth-code__block-text">
			<input
				ref="authCodeInput"
				v-mask="mask"
				type="text"
				v-model="codeFormattedPhone"
				@input="updateWidth"
				:style="{ width: inputWidth + 'px' }"
			/>
			</span>
			<span @click="backStage" class="auth-code__block-btn">Изменить</span>
		</div>
		<div class="auth-code__block">
			<div class="auth-code__block-wrapper" >
				<OTP
					ref="otpComponent"
					class="auth-code__inputs"
					:digitCount = "4"
					:class="{ 'error': !isCodeValid }"
					@clear="clear"
					@isOpen="isOpenFunc"
					@update="getCodeValue"
					v-click-outside="openFunc"
				/>
			</div>
			<div v-if="!isCodeValid" class="auth-code__error" :class="{ 'open' : isOpen}">
				<span class="auth-code__error-text">
					Неверный код
				</span>
				<button @click="clearCode" class="auth-code__error-btn">
					Повторить
					<IconRepeatLoad class="auth-code__error-load" />
				</button>
			</div>
		</div>
		<div class="auth-code__block" :class="{ 'open' : isOpen}">
			<span class="auth-code__block-text">Выслать новый код</span>
			<button
				:disabled="isButtonDisabled"
				:class="{ 'auth-code__new-btn': true, 'active': count === 0 }"
				@click="getNewCode"
			>
				Выслать
				<IconNewCode />
			</button>
			<span v-if="count > 0" class="auth-code__new-text">{{ count }} секунд</span>
		</div>
	</div>
</template>

<script setup>
	import StageHeader from '@/components/auth/StageHeader.vue';
	import { ref, computed, onMounted, watch ,reactive } from 'vue';
	import { useUserStore } from '@/stores/user.js';
	import OTP from '@/components/auth/OTP.vue';
	import { useRouter } from 'vue-router';
	import IconRepeatLoad from '@/components/icons/IconRepeatLoad.vue';
	import IconNewCode from '@/components/icons/IconNewCode.vue';

	const isOpen = ref(false);
	const inputWidth = ref(0);

	const openFunc = () => isOpen.value = false;

	function updateWidth()
	{
		const textLength = codeFormattedPhone.value.replace(/\D/g, '').length;
		const coefficient = phoneCode === 'rus' ? 12.5 : 11;
		inputWidth.value = (textLength + 1) * coefficient;
	}


	const otpComponent = ref(null);

	const callChildFunction = () =>
	{
		const otpChildComponent = otpComponent.value;
		if (otpChildComponent)
			otpChildComponent.clearOtp();
	};

	const childOtpLastFocus = () =>
	{
		const otpChildComponent = otpComponent.value;
		if (otpChildComponent)
			otpChildComponent.lastOtpFocus();
	};

	const router = useRouter();
	const userStore = useUserStore();
	const props = defineProps(['update', 'phone', 'currentCountry']);

	const isCodeValid = ref(true);
	const phone = props.phone;
	const phoneCode = props.currentCountry;
	const codeValid = ref();
	const emit = defineEmits(['changeBack', 'updated']);
	const isButtonDisabled = computed(() => count.value > 0);
	const count = ref(90);

	const mask = computed(() =>
	{
		if (phoneCode === 'rus')
			return '+7 (###) ###-##-##';

		else if (phoneCode === 'usa')
			return '+1 ### ###-##-##';

		else if (phoneCode === 'britain')
			return '+1264 ### ###-##-##';

		else if (phoneCode === 'france')
			return '+33 ### ###-##-##';

		else
			return 'X (###) ###-##-##';
	});

	const codeFormattedPhone = computed(() => formatPhone(phone));

	function formatPhone(phone)
	{
		if(phoneCode === 'rus')
			return phone.slice(1);

		return phone.replace(/\D/g, '');
	}

	watch(phone, (newValue) =>
	{
		formattedPhone.value = formatPhone(newValue);
	});

	const handleFocusNextInput = (event, nextInputRef) =>
	{
		const inputValue = event.target.value;
		if (inputValue.length === 1 && nextInputRef)
			nextInputRef.focus();
	};

	const countMinus = () =>
	{
		if (count.value > 0)
			count.value--;
	};

	const backStage = function ()
	{
		emit('changeBack', 1, {phone: phone.value })
	};

	const input1Ref = ref(null);

	onMounted(() =>
	{
		setInterval(countMinus, 1000);
	});

	const getCodeValue = function(code)
	{
		codeValid.value = Number(code);
		makeRequest();
		childOtpLastFocus();
		isOpen.value = true;
	}

	async function makeRequest()
	{
		const formData =
		{
			phone: phone,
			code: codeValid.value,
		}
		try
		{
			if(await userStore.checkCode(formData))
				router.push('/profile/1');

			else
				emit('update', 3);
		}
		catch (error)
		{
			isCodeValid.value = false;
		}
	}

	async function makeRequestGetCode()
	{
		const formData = { phone: phone }

		try { await userStore.getCode(formData); }

		catch(error)
		{
			console.error("Ошибка от сервера:");
			isError.value = true;
		}
	}

	const getNewCode = function()
	{
		isCodeValid.value = true;
		callChildFunction();
		makeRequestGetCode();
		count.value = 90;
		isOpen.value = false;
	}

	const clearCode = function()
	{
		isCodeValid.value = true;
		callChildFunction();
	}

	function isOpenFunc(value)
	{
		if(value === false)
			isCodeValid.value = true;
		else
			isOpen.value = value;
	}
</script>

<style lang="scss">
	.auth-code { padding-top: 41px; }

	.auth-code__block
	{
		display: flex;

		&:nth-child(3)
		{

		}

		&:nth-child(4)
		{
			margin-bottom: 48px;
			margin-top: 10px;
			position: relative;
		}

		&:nth-child(5)
		{
			position: relative;
			align-items: center;
			margin-bottom: 145px;
			top: 100px;

			&.open { top: 45px; }
		}

		&:nth-child(6)
		{
			z-index: 2;
			align-items: center;
		}

	}

	.auth-code__block-text,.auth-code__block-btn,.auth-code__new-btn,.auth-code__new-text
	{
		color:#1B1E22;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.5px;
	}

	.auth-code__block-text
	{
		input
		{
			display: inline-flex;
			background: none;
			border: none;
			pointer-events:none;
			padding: 0;
		}
	}

	.auth-code__block-btn,.auth-code__new-btn
	{
		background: none;
		color:#239735;
		cursor:pointer;
	}

	.auth-code__block-btn{ z-index: 2; }

	.auth-code__inputs
	{
		&.error input { border: 1px solid red; }
	}

	.auth-code__new-btn
	{
		border:none;
		background: #fff;
		color:#239735;
		padding: 5px 10px;
		gap: 5px;
		display: none;
		border-radius: 7px;
		font-size: 14px;
		align-items: center;

		&.active
		{
			display: flex;
			z-index: 2;
		}

		& svg { margin: -1.5px 1px 0 0; }
	}

	.auth-code__block-text{ margin-right: 8px; }

	.auth-code__new-text { color:#239735; }

	.auth-code__block-wrapper
	{
		height: fit-content;
		position: relative;
	}

	.auth-code__block-icon
	{
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
	}

	.auth-code__block-input
	{
		display: flex;
		height: 56px;
		width: 56px;
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
		caret-color: #32d74b;
		text-align: center;

		&:last-child{ margin-right: 8px; }

		&.error { border: 0.5px solid #FF3B30; }
	}

	.auth-code__error
	{
		position: absolute;
		display: flex;
		top: 105px;
		gap: 8px;
		align-items: center;

		&.open { top:80px; }
	}

	.auth-code__error-btn
	{
		padding: 7px 10px;
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 6px;
		background: #fff;
		border-radius: 7px;
		color: #239735;
		font-size: 14px;
		font-weight: 500;
		line-height: 18px;
		letter-spacing: 0.25px;
		z-index: 2;

		& svg { animation: rotate 2s linear infinite; }
	}

	@keyframes rotate
	{
		0% { transform: rotate(0deg); }

		100% { transform: rotate(360deg); }
	}

	.auth-code__error-text
	{
		color: #FF3B30;
		font-size: 16px;
		font-weight: 400;
		line-height: 24px;
		letter-spacing: 0.5px;
	}
</style>
