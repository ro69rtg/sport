<template>
	<div class="auth-phone">
		<ShareBtn />
		<StageHeader :description="'Введите номер телефона'" :title="'Вход'" />
		<div class="auth-phone__block">
			<div @click="isOpen = !isOpen" ref="countryElement" v-click-outside="isOpenClose" class="auth-phone__country">
				<component :is="countryActive.flag" />
				<span class="auth-phone__code">{{ countryActive.code }}</span>
				<IconCountryArrow />
				<div :class="{ 'active' : isOpen }" class="auth-phone__list">
					<div class="auth-phone__box" >
						<IconCountryRectangle class="auth-phone__rectangle" />
						<IconCountryRectangleLine class="auth-phone__rectangle-line" />
						<div
							v-for="(country, code) in countries"
							:key="code"
							class="auth-phone__item"
							@click="setActiveCountry(country.code,country.flag, country.region)"
							:class="{ 'active' : countryActive === code }"
						>
							<component class="auth-phone__flag" :is="country.flag" />
							<span class="auth-phone__box-code">{{ country.code }}</span>
							<IconCountryCheck
								class="auth-phone__flag-icon"
								:class="{ 'active' : countryActive.code === country.code }"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="auth-phone__block-input">
				<input
					ref="phoneInputRef"
					type="tel"
					class="auth-phone__input"
					:placeholder="placeholderPhone"
					:value="phone"
					v-mask="phoneMask"
					@input="updatePhone"
					@focus="handleFocus"
					@blur="handleBlur"
				/>
				<IconInputLoad v-if="isError" class="auth-phone__input-load" />
				<IconInputClear v-if="isError" class="auth-phone__input-close" @click="clearInput"/>
			</div>
		</div>
		<div v-if="isError" class="auth-phone__error">
			<span class="auth-phone__error-text">Что-то пошло не так!</span>
			<button @click="clearInput" class="auth-phone__error-btn">
				Повторить
				<IconRepeatLoad class="auth-phone__error-load" />
			</button>
		</div>
		<div class="auth-phone__info">
			<div class="auth-phone__info-block">
				<IconExclamation class="auth-phone__info-icon" />
			</div>

			<div class="auth-phone__info-block">
				<span class="auth-phone__info-text">
					Предоставляя свой номер телефона вы соглашаетесь с
				<a href="#" class="auth-phone__info-link">
					публичной офертой
				</a>
				и
				<a href="#" class="auth-phone__info-link">
					правилами обработки персональных данных
				</a>
			</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	import StageHeader from '@/components/auth/StageHeader.vue';
	import { ref, watch, onMounted, computed} from 'vue';
	import { useUserStore } from '@/stores/user.js';
	import IconCountryCheck from '@/components/icons/IconCountryCheck.vue';
	import IconRusFlag from '@/components/icons/IconRusFlag.vue';
	import IconUsaFlag from '@/components/icons/IconUsaFlag.vue';
	import IconBritainFlag from '@/components/icons/IconBritainFlag.vue';
	import IconFranceFlag from '@/components/icons/IconFranceFlag.vue';
	import IconCountryArrow from '@/components/icons/IconCountryArrow.vue';
	import IconCountryRectangle from '@/components/icons/IconCountryRectangle.vue';
	import IconCountryRectangleLine from '@/components/icons/IconCountryRectangleLine.vue';
	import IconExclamation from '@/components/icons/IconExclamation.vue';
	import IconRepeatLoad from '@/components/icons/IconRepeatLoad.vue';
	import IconInputLoad from '@/components/icons/IconInputLoad.vue';
	import IconInputClear from '@/components/icons/IconInputClear.vue';

	const props = defineProps({
		phoneParent:String,
		changeBack: Boolean,
	})

	const isOpenClose = () => isOpen.value = false

	const phone = ref();

	if(props.phoneParent)
		phone.value = props.phoneParent.slice(1);

	const userStore = useUserStore();
	const emit = defineEmits(['update'])
	const currentCountry = ref('rus');
	const isError = ref(false);
	const phoneModel = ref('');

	const countryActive = ref({ code:'+7', flag:IconRusFlag });

	const phoneMask = computed(() => {
		return currentCountry.value == 'rus' ? '(###) ###-##-##' : '##########';
	});

	const placeholderPhone = computed (() => {
		return currentCountry.value == 'rus' ? '(000) 000-00-00' : '0000000000';
	})

	const countries =
	[
		{ code: '+7', flag: IconRusFlag, region: 'rus' },
		{ code: '+1', flag: IconUsaFlag, region: 'usa' },
		{ code: '+1264', flag: IconBritainFlag, region: 'britain' },
		{ code: '+33', flag: IconFranceFlag, region: 'france' },
	];

	const isOpen = ref(false);

	function setActiveCountry(code,flag, region)
	{
		isOpen.value === false;
		countryActive.value.code = code;
		countryActive.value.flag = flag;
		currentCountry.value = region;
	}

	watch(phone, (newValue) =>
	{
		const cleanedInput = newValue.replace(/\D/g, '');
		if (currentCountry.value === 'rus')
			phoneModel.value = '7' + cleanedInput;

		else if (currentCountry.value === 'usa')
			phoneModel.value = '1' + cleanedInput;

		else if (currentCountry.value === 'britain')
			phoneModel.value = '1264' + cleanedInput;

		else if (currentCountry.value === 'france')
			phoneModel.value = '33' + cleanedInput;

		if (cleanedInput.length === 10)
		{
			if(props.changeBack === null)
			{
				emit('update', 2, {phone: phoneModel.value, currentCountry: currentCountry.value})
				makeRequest();
				phone.value = props.phoneParent;
			}
			emit('updateBackStage', null);
		}
		else
			isError.value = false;
	});

	const updatePhone = (event) => (phone.value = event.target.value);

	function clearInput()
	{
		phone.value = '';
		isError.value = false;
	}

	const phoneInputRef = ref(null);

	onMounted(() => phoneInputRef.value.focus() )

	async function makeRequest()
	{
		const formData = { phone: phoneModel.value }

		try
		{
			await userStore.getCode(formData);
			emit('update', 2, {phone: phoneModel.value, currentCountry: currentCountry.value})
		}

		catch(error)
		{
			console.error("Ошибка от сервера:");
			isError.value = true;
			isCodeValid.value = false;
		}
	}

	const countryElement = ref(null);

	function toggleCountryList(event)
	{
		if (countryElement.value && (event.target === countryElement.value || countryElement.value.contains(event.target)))
			isOpen.value = !isOpen.value;
		else
			isOpen.value = false;
	}
</script>

<style lang="scss">
	.auth-phone { position: relative; }

	.auth-phone__box
	{
		position: relative;
		margin-top: 28px;
		border: 1px solid #E5E5ED;
		border-radius: 10px;
		background-color: white;
		position: relative;
	}

	.auth-phone__box-code
	{
		color: #1B1E22;
		font-size: 20px;
		font-weight: 400;
		line-height: 24px;
		letter-spacing: -0.5px;
	}

	.auth-phone__item
	{
		background: #fff;
		padding: 10px;
		list-style:none;
		width: 100%;
		height: 52px;
		box-sizing: border-box;
		border-bottom: 1px solid #F7FCFF;
		display: flex;
		align-items: center;

		&:nth-child(3){ border-radius: 8px 8px 0 0; }

		&:last-child
		{
			border-radius: 0 0 8px 8px;
			border:none;
		}
	}

	.auth-phone__rectangle,.auth-phone__rectangle-line
	{
		position: absolute;
		top: -9px;
		margin: 0 auto;
		left: -27px;
		right: 0;
	}

	.auth-phone__rectangle-line { top: 0; }

	.auth-phone__code
	{
		color:#1B1E22;
		font-family: Roboto;
		font-size: 20px;
		font-weight: 400;
		line-height: 24px;
		letter-spacing: -0.5px;
		margin: 0 7px 0 7px;
	}

	.auth-phone__list
	{
		position: absolute;
		top: 40px;
		left: 0;
		padding: 0;
		display: none;
		width: 117px;

		&.active{ display: block; }
	}

	.auth-phone__country
	{
		border-radius: 8px;
		padding: 15px 10px;
		background: #fff;
		height: 54px;
		box-sizing: border-box;
		position: relative;
		display:flex;
		align-items:center;
		cursor: pointer;
		margin-right: 8px;
		z-index: 3;
	}

	.auth-phone__block
	{
		width: 100%;
		display: flex;
		margin-top: 80px;
	}

	.auth-phone__block-input
	{
		width: 100%;
		position: relative;
		z-index: 2;
	}

	.auth-phone__input
	{
		max-height: 54px;
		width: 100%;
		height: 56px;
		border-radius: 10px;
		padding: 16px 12px 20px 11px;
		border: none;
		font-size: 20px;
		font-weight: 400;
		line-height: 28px;
		color: #1b1e22;
		outline: none;
		caret-color: #32d74b;
		box-sizing: border-box;
	}

	.auth-phone__input-load,.auth-phone__input-close
	{
		position: absolute;
		top: 16px;
	}

	.auth-phone__input-load
	{
		right: 40px;
		top:18px;
		animation: rotate 2s linear infinite;
	}

	@keyframes rotate
	{
		0% { transform: rotate(0deg); }

		100% { transform: rotate(360deg); }
	}

	.auth-phone__input-close
	{
		right: 8px;
		cursor: pointer;
	}

	.auth-phone__input::placeholder { color: #8e8e9a; }

	.auth-phone__error
	{
		display: flex;
		align-items: center;
	}

	.auth-phone__error-text
	{
		color: #1B1E22;
		font-size: 16px;
		font-weight: 400;
		line-height: 24px;
		letter-spacing: 0.5px;
		margin-right: 6px;
	}

	.auth-phone__error-btn
	{
		color: #239735;
		border:none;
		background: #fff;
		padding: 8px 11px;
		display: flex;
		align-items: center;
		border-radius: 7px;
		font-size: 14px;
		gap: 6px;
	}

	.auth-phone__flag { margin-right: 4px; }

	.auth-phone__flag-icon
	{
		display:none;
		margin-left: auto;

		&.active{ display: block; }
	}

	.auth-phone__info
	{
		background: #fff;
		padding: 12px 5px 12px 12px;
		border-radius: 8px;
		display: flex;
		gap: 0 8px;
		position: absolute;
		box-sizing: border-box;
		width: 100%;
		top: 325px;
	}

	.auth-phone__info-text
	{
		color:#8E8E9A;
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.1px;
		display: block;
	}

	.auth-phone__info-link
	{
		color: #239735;
		font-size: 12px;
		font-weight: 400;
		line-height: 120%;
		letter-spacing: 0.1px;
		text-decoration-line: underline;
		z-index:2;
		position: relative;
	}

	.auth-phone__info-icon
	{
		position: relative;
		width: 20px;
	}
</style>