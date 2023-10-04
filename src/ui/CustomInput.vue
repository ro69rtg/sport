<template>
	<div class="custom-input">
		<input class="custom-input__input"
			@blur="focusOut"
			@focus="focusOn"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
		<span class="custom-input__placeholder" ref="inputRef">{{placeholder}}</span>
		<span class="custom-input-close" v-if="modelValue" @click="updateValue">
		<IconInputClear class="custom-input-close__icon"/>
		</span>
	</div>
</template>
<script setup>
	import { nextTick, onMounted, ref } from 'vue';
	import IconInputClear from '@/components/icons/IconInputClear.vue';

	const props = defineProps(['modelValue', 'placeholder', 'icon'])
	const emit = defineEmits(['update:modelValue'])
	const inputRef = ref();

	onMounted(() =>
	{
		if(props.modelValue)
			inputRef.value.style.top = '15px'
	})

	function focusOn()
	{
		inputRef.value.style.top = '15px'
	}

	function focusOut()
	{
		if(!props.modelValue)
		{
			inputRef.value.style.top = '50%'
		}
	}

	function updateValue()
	{
		emit('update:modelValue', null);
		nextTick(() => focusOut())
	}
</script>

<style lang="scss">
	.custom-input-close
	{
		position: absolute;
		right: 10px;
		transform: translate(0, -50%);
		top: 50%;
		display: flex;
		cursor: pointer;
		z-index: 3;
	}

	.custom-input
	{
		box-sizing: border-box;
		border: none;
		border-radius: 8px;
		width: 100%;
		background: #fff;
		position: relative;
		font-size: 16px;
	}

	.custom-input__input
	{
		box-sizing: border-box;
		border: none;
		border-radius: 6px;
		background: none;
		line-height: 18px;
		letter-spacing: 0.25px;
		width: 100%;
		padding: 24px 16px 8px 16px;
		position: relative;
		z-index: 2;
		font-size: 14px;
		font-weight: 400;
		color: $primary-text;

		&::after
		{
			content: "";
			display: block;
			position: absolute;
			height: 1px;
			width: 96%;
			background: #f0f0f0;
			bottom: -30px;
			right: 0;
		}
	}

	.custom-input__input:focus { outline: none; }

	.custom-input__placeholder
	{
		box-sizing: border-box;
		border: none;
		font-size: 12px;
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

	.custom-input-close__icon
	{
		width: 16px;
		height: 16px;
	}
</style>