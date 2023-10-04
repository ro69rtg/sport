<template>
	<div class="payment-input__input-box">
		<IconPaymentDefiniteCard class="payment-input__card-icon-active" v-if="modelValue"/>
		<IconPaymentCard v-else class="payment-input__card-icon"/>
		<input
			ref = "input"
			class="payment-input__input"
			:class="{ 'active' : modelValue }"
			type="tel"
			v-mask="'#### #### #### ####'"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			:placeholder = "title"
		>
		<div
			class="payment-input__input-closer"
			v-if="modelValue"
			@click = "$emit('update:modelValue', $event.target.value = '')"
		>
			<IconInputCloser />
		</div>
	</div>
</template>
<script setup>
	import IconInputCloser from '@/components/icons/IconInputCloser.vue';
	import IconPayGrayCard from '@/components/icons/IconPayGrayCard.vue';
	import IconPayMirCard from '@/components/icons/IconPayMirCard.vue';

	import { ref } from 'vue';
	const input = ref(null)
	defineExpose({input})
	const props = defineProps(['modelValue','title']);
	const emit = defineEmits(['update:modelValue']);
	const inputCheck = ref(false);
</script>

<style lang="scss">
	.payment-input__input
	{
		caret-color: #32D74B;
		outline:none;
		border: none;
		width: calc(100% - 67px);
		height: 32px;
		padding: 8px 14px 8px 53px;
		font-size: 14px;
		border-radius: 8px;

		&::placeholder { letter-spacing: 1.5px; }
	}

	.payment-input__input-box
	{
		position: relative;
		margin-bottom: 12px;
		&:nth-child(2){ margin-bottom: 18px; }
	}

	.payment-input__input-closer
	{
		position: absolute;
		right: 4.4%;
		top: 17px;
		svg
		{
			font-size: 16px;
			width: 18px;
			height: 15px;
		}
		border-radius: 8px;
	}

	.payment-input__card-icon
	{
		position: absolute;
		left: 12px;
		top: 13px;
		min-width: 24px;
		min-height: 24px;
	}

	.payment-input__card-icon-active
	{
		position: absolute;
		left: 7px;
		top: 11px;
	}
</style>