<template>
	<div class="payment-page__input-box-small">
		<input
			ref='input'
			class="payment-page__input-small"
			type="tel"
			v-mask ="mask"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			:placeholder = "title"
		>
		<div class="payment-page__input-closer-small"
			v-if="modelValue"
			@click = "$emit('update:modelValue', $event.target.value = '')"
		>
			<IconInputCloser />
		</div>
	</div>
</template>
<script setup>
	import IconInputCloser from '@/components/icons/IconInputCloser.vue';

	const input = ref(null)
	defineExpose({input})

	import {ref} from 'vue';

	const props = defineProps({
		modelValue: { type: String, },
		title: { type: String, },
		mask: { type: String },
	});
	const emit = defineEmits(['update:modelValue', 'input']);

</script>

<style lang="scss">
	.payment-page__input-small
	{
		caret-color: #32D74B;
		outline:none;
		border: none;
		width: calc(100% - 32px);
		height: 16px;
		padding: 16px;
		font-size: 14px;
		border-radius: 8px;
		justify-content: space-between;

		&:nth-child(1)
		{
			&::placeholder { font-size: 18px; }
		}
	}

	.payment-page__input-box-small
	{
		position: relative;
		width: 48.3%;
		margin-bottom: 21px;
		&:nth-child(2)
		{
			.payment-page__input-small
			{
				&::placeholder{ font-size: 16px; }
			}
		}
	}

	.payment-page__input-closer-small
	{
		position: absolute;
		right: 3%;
		top: 14px;
		border-radius: 8px;
		width: 18px;
		height: 17px;

		svg
		{
			font-size: 20px;
			width: 18px;
			height: 17px;
			position: relative;
			right: 10px;
		}
	}
</style>