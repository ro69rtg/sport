<template>
	<div class="phone-input">
		<input disabled
			v-mask="'+# (###) ### ## ##'"
			class="phone-input__input"
			required="required"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
		<span class="phone-input__placeholder">{{placeholder}}</span>
		<span class="phone-input-close" v-if="modelValue">
			<IconInputLock />
		</span>
	</div>
</template>

<script setup>
	import IconInputLock from '@/components/icons/IconInputLock.vue';

	const props = defineProps(['modelValue', 'placeholder', 'icon', 'mask'])
	const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss">
	.phone-input-close
	{
		position: absolute;
		right: 10px;
		top: 50%;
		cursor: pointer;
		z-index: 3;
		transform: translate(0, -42%);
	}
	.phone-input {
		box-sizing: border-box;
		border: none;
		border-radius: 8px;
		width: 100%;
		background: #fff;
		position: relative;
		font-size: 16px;
	}

	.phone-input__input {
		box-sizing: border-box;
		border: none;
		border-radius: 6px;
		background: none;
		width: 100%;
		height: 48px;
		padding-left: 16px;

		position: relative;
		z-index: 2;
		font-size: 14px;
		font-family: 'Roboto';
		font-weight: 400;
		color: $primary-text;
		&:disabled
		{
			opacity: 0.4;
		}
	}
	.phone-input__input:focus {
		outline: none;
	}

	.phone-input__placeholder {
		box-sizing: border-box;
		border: none;
		background: none;
		width: 100%;
		position: absolute;
		z-index: 1;
		padding-left: 16px;
		left:0;
		top: 50%;
		line-height: 1em;
		margin-top: -0.5em;
		color: #777;
		transition: all 0.2s ease;
	}

	.phone-input__input:invalid + .phone-input__placeholder {
		top: 50%;
		font-size: 14px;
		margin-top: -0.5em;
	}

	.phone-input__input + .phone-input__placeholder,
	.phone-input__input:focus + .phone-input__placeholder {
		font-size: 12px;
		top: 0;
		margin-top: 6px;
	}
</style>