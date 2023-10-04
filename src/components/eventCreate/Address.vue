<template>
	<div class="event-create-address">
		<input
			class="event-create-address__input"
			type="text"
			:value="modelValue"
			@focus="focusOn"
			@blur="focusOut"
			@input="updateValue($event.target.value), onInput($event.target.value)"
		>
		<p class="event-create-address__placeholder" ref="inputRef">{{title}}</p>
		<div
			v-if="modelValue"
			@click = "deletValue" >
			<IconInputCloser class="event-create-address__input-clear"/>
		</div>
		<div class="event-create-address__line"></div>
		<div class="event-create-address__box" v-on-click-outside="hidingBox" v-if="addressResult.length ">
			<p
				v-for="(item, index) in addressResult.slice(0,4)"
				:key="index"
				@click=
				"{
					addressResult =[];
					modelValue = item.value;
					updateValue(modelValue)
				}"
				class="event-create-address__box-text"
			>
				{{item.value}}
			</p>
		</div>
	</div>
</template>
<script setup>
	import IconInputCloser from '@/components/icons/IconInputCloser.vue';

	import {nextTick ,ref, defineProps, defineEmits} from 'vue';
	import debounce from "lodash.debounce";
	import api from '@/api/api.client.js';
	import { vOnClickOutside } from '@vueuse/components'

	const inputRef = ref()
	const props = defineProps(['modelValue','title'])
	const addressResult = ref([]);
	const emit = defineEmits(['update:modelValue'])
	const onInput = debounce((item) =>{fetchAddresses(item)}, 500)

	function focusOn()
	{
		inputRef.value.style.top = '15px'
	}
	function focusOut()
	{
		if(!props.modelValue)
			inputRef.value.style.top = '50%'
	}
	function deletValue()
	{
		emit('update:modelValue', null);
	    nextTick(() => focusOut())
	}
	async function fetchItems()
	{
		const response = await api.general.fetchAddresses(JSON.stringify(props.modelValue))
		addressResult.value = response.data.suggestions;
	}
	function fetchAddresses(value)
	{
		if(!value)
			addressResult.value = [];
		else
			fetchItems(value)
	}
	function updateValue(value){ emit('update:modelValue', value);}

	function hidingBox() {addressResult.value = [];}

	function choiceAdress(arg)
	{
		addressResult.value =[];
		modelValue = item.value;
		updateValue(modelValue)
	}

	function createDebounce()
	{
		let timeout = null;
		return function (fnc, delayMs)
		{
			clearTimeout(timeout);
			timeout = setTimeout(() => { fnc() }, delayMs || 500);
		};
	}
</script>

<style lang="scss">
	.event-create-address
	{
		width: 100%;
		height: auto;
	}

	.event-create-address:first-child .event-create-address__input
	{
		border-radius: 0;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

	.event-create-address:last-child .event-create-address__input
	{
		border-radius: 0;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
	}

	.event-create-address__box
	{
		width: calc(99% - 28px);
		padding: 10px 16px;
		background-color: #fff;
		position: relative;
		top: -10px;
		border-radius: 5px;
	}

	.event-create-address__input { height: 48px }

	.event-create-address__input
	{
		caret-color: #32D74B;
		outline:none;
		border: none;
		box-sizing: border-box;
		border: none;
		border-radius: 6px;
		background: none;
		line-height: 18px;
		letter-spacing: 0.25px;
		width: 100%;
		padding: 24px 16px 10px 16px;
		position: relative;
		z-index: 1;
		font-size: 14px;
		font-weight: 400;
		color: #1B1E22;
		background-color: #fff;
		&:focus .event-create-address__placeholder
		{
			top: 15px;
		}
	}

	.event-create__adress{ font-size: 14px; }

	.event-create__adress{ width: auto; }

	.event-create-address__placeholder
	{
		box-sizing: border-box;
		border: none;
		font-size: 12px;
		background: none;
		width: 100%;
		position: absolute;
		z-index: 1;
		padding-left: 16px;
		left: 0;
		top: 50%;
		line-height: 1em;
		margin-top: -0.5em;
		color: #777;
		transition: all 0.2s ease;
		pointer-events: none;
	}

	.event-create-address{ position: relative; }

	.event-create-address__input-clear
	{
		position: absolute;
		right: 10px;
		top: 14px;
		width: 14px;
		height: 14px;
		z-index: 1;

		path{ fill:#B9B9CE }
	}

	.event-create-address-line
	{
		background-color: #F2F2F7;
		height: 1px;
		width: 96%;
		position: absolute;
		top: 0;
		left: 5%;
	}

	.event-create-address__box-text
	{
		color: #1B1E22;
		font-size: 14px;
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.25px;
	}
</style>