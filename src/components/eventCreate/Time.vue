<template>
	<div
		class="event-create__time-box"
		v-for="(item, index) in count"
		:key="index"
		:class="{'event-create__timeрh' :props.types[index] === 'h'}"
	>
		<input
			:id="id"
			ref="code"
			@blur = "chekValue($event.target.value , index)"
			@keyup="isNewStep($event, index)"
			maxlength="2"
			type="tel"
			@input="checkMaxInput(index)"
			v-model="inputsValue[index]"
			placeholder="00"
			class="event-create__time"
		>
		<span class="event-create__timeрh-colon" v-if="count > 1 && index === 0"> :</span>
	</div>
</template>

<script setup>
	import {reactive, ref, computed, watch} from 'vue';

	const props = defineProps({ timer: String, count: Number, id: String, types: Array });
	const emit = defineEmits(['update'])
	const inputsValue = reactive([null, null])
	const code = ref();

	function chekValue(target, index)
	{
		if (target.length === 1)
			inputsValue[index] = '0' + target;

		else
			inputsValue[index] = target;
	}

	watch(() => props.timer, (value) => parseStr ())

	function  parseStr ()
	{
		if(props.timer)
		{
			let a = props.timer.slice(0,2)
			let b = props.timer.slice(3,5)
			inputsValue[0]= a;
			inputsValue[1]= b;
		}
	}

	parseStr();
	function checkMaxInput(index)
	{
		if(props.types[index] === 'h')
		{
			if(inputsValue[index] > 24 || inputsValue[index] < 0)
				inputsValue[index] = 23
		}

		else if(props.types[index] === 'm')
		{
			if(inputsValue[index] > 60 || inputsValue[index] < 0)
				inputsValue[index] = 59
		}
	}

	function isNewStep(event, index)
	{
		if (event.key === "Backspace")
		{
			if (index != 0 && !inputsValue[index])
				code.value[index-1].focus();

			return
		}

		if(event.target.value.length === 2 && index != props.count - 1)
			code.value[index + 1].focus();

		isFull()
	}

	function isFull()
	{
		const hours = String(inputsValue[0] || '00').padStart(2, '0');
		const minutes = String(inputsValue[1] || '00').padStart(2, '0');
		const time = `${hours}:${minutes}`;
		emit('update', time);
	}
</script>

<style lang="scss">
	.event-create__time-box
	{
		display: flex;
		align-items: center;
	}

	.event-create__time
	{
		caret-color: #32D74B;
		width: 24px;
		height: 22px;
		padding: 2px 16px 2px 16px;
		border-radius: 6px;
		margin: 1px;
		outline:none;
		background-color:#F2F2F7 ;
		border: none;

		&::placeholder { color: #8E8E9A; }
	}

	.event-create__time[type='number']{-moz-appearance: textfield;}

	.event-create__time::-webkit-outer-spin-button,

	.event-create__time::-webkit-inner-spin-button{-webkit-appearance: none;}

	.event-create__time-box::after
	{
		content: "м";
		position: absolute;
		top: 16px;
		right: 25px;
		z-index: 1;
		color: #8E8E9A;
	}

	.event-create__timeрh::after
	{
		content: "ч";
		position: relative;
		top: 0;
		top: 1px;
		right: 24px;
		color: #8E8E9A;
	}

	.event-create__timeрh-colon { margin-left: 2px; }
</style>